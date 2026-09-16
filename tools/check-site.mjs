/* ===========================================================
   배포 전 검사 스크립트
   -----------------------------------------------------------
   GitHub Actions가 배포 직전에 실행합니다. 오류가 있으면 배포를 멈추고,
   사이트는 마지막으로 정상 배포된 상태가 그대로 유지됩니다.

   로컬에서 직접 실행:  node tools/check-site.mjs
   =========================================================== */

import { readFileSync, existsSync, statSync, writeFileSync, mkdtempSync, realpathSync } from 'node:fs';
import { join, dirname, posix } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { pathToFileURL, fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warnings = [];

const rel = (...p) => join(ROOT, ...p);
const isExternal = (url) => /^(https?:|mailto:|tel:|data:|#|\/\/)/i.test(url) || url === '';

// ---------- 1. JS 문법 검사 ----------
const jsFiles = ['assets/js/main.js', 'assets/js/gallery.js', 'notices/notices.js'];
const tmp = realpathSync(mkdtempSync(join(tmpdir(), 'site-check-')));
for (const file of jsFiles) {
    if (!existsSync(rel(file))) {
        errors.push(`[파일 없음] ${file}`);
        continue;
    }
    // import/export 문법을 쓰므로 .mjs로 복사해서 검사
    const copy = join(tmp, file.replaceAll('/', '_') + '.mjs');
    writeFileSync(copy, readFileSync(rel(file)));
    try {
        execFileSync(process.execPath, ['--check', copy], { stdio: 'pipe' });
    } catch (e) {
        const msg = e.stderr.toString().split('\n').filter(Boolean).slice(0, 6).join('\n    ');
        errors.push(`[문법 오류] ${file}\n    ${msg.replaceAll(copy, file)}`);
    }
}

// ---------- 2. 공지 데이터 검사 ----------
let notices = [];
try {
    ({ notices } = await import(pathToFileURL(rel('notices/notices.js')).href));
} catch {
    // 문법 오류는 1번에서 이미 보고됨
}

const TAGS = { '校内新闻': 'tag-blue', '信息公告': 'tag-gold' };
notices.forEach((n, i) => {
    const where = `notices.js ${i + 1}번째 항목${n && n.title ? ` ("${n.title}")` : ''}`;
    for (const key of ['src', 'title', 'date', 'tag', 'tagClass']) {
        if (!n[key]) errors.push(`[값 없음] ${where}: ${key}`);
    }
    if (n.src && n.src.includes('/')) {
        errors.push(`[경로 형식] ${where}: src에는 폴더 없이 파일명만 적어주세요 (현재: "${n.src}")`);
    } else if (n.src && !existsSync(rel('notices/images', n.src))) {
        errors.push(`[이미지 없음] ${where}: notices/images/${n.src}`);
    }
    if (n.thumb) {
        if (n.thumb.includes('/')) {
            errors.push(`[경로 형식] ${where}: thumb에는 폴더 없이 파일명만 적어주세요 (현재: "${n.thumb}")`);
        } else if (!existsSync(rel('notices/thumbs', n.thumb))) {
            // 사이트에서는 기사 이미지로 대체되므로 배포는 막지 않음
            warnings.push(`[썸네일 없음] ${where}: notices/thumbs/${n.thumb} → 기사 이미지로 대체 표시됩니다`);
        } else if (statSync(rel('notices/thumbs', n.thumb)).size > 500 * 1024) {
            warnings.push(`[썸네일 용량 큼] ${where}: ${n.thumb} (500KB 이하 권장, 가로 600px 이내로 줄여주세요)`);
        }
    } else if (n.src) {
        warnings.push(`[썸네일 미지정] ${where}: 기사 이미지 상단이 대신 표시됩니다`);
    }
    if (n.date && !/^\d{4}-\d{2}-\d{2}$/.test(n.date)) {
        errors.push(`[날짜 형식] ${where}: YYYY-MM-DD 형식이어야 합니다 (현재: "${n.date}")`);
    }
    if (n.tag && TAGS[n.tag] && n.tagClass !== TAGS[n.tag]) {
        warnings.push(`[태그 색상] ${where}: "${n.tag}"의 tagClass는 보통 "${TAGS[n.tag]}"입니다 (현재: "${n.tagClass}")`);
    }
});

// ---------- 3. HTML·CSS 안의 파일 경로 검사 ----------
const html = readFileSync(rel('index.html'), 'utf8');
for (const [, url] of html.matchAll(/\s(?:src|href)="([^"]*)"/g)) {
    if (isExternal(url)) continue;
    const path = decodeURI(url.split(/[?#]/)[0]);
    if (!existsSync(rel(path))) errors.push(`[파일 없음] index.html → ${url}`);
}

for (const css of ['assets/css/styles.css', 'assets/css/gallery.css']) {
    const text = readFileSync(rel(css), 'utf8');
    for (const [, url] of text.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
        if (isExternal(url)) continue;
        const path = posix.normalize(posix.join(posix.dirname(css), url));
        if (!existsSync(rel(path))) errors.push(`[파일 없음] ${css} → ${url}`);
    }
}

// ---------- 결과 ----------
if (warnings.length) {
    console.log(`\n⚠️  경고 ${warnings.length}건 (배포는 계속됩니다)`);
    warnings.forEach((w) => console.log('  - ' + w));
}
if (errors.length) {
    console.log(`\n❌ 오류 ${errors.length}건 — 배포를 중단합니다. 현재 사이트는 이전 상태로 유지됩니다.`);
    errors.forEach((e) => console.log('  - ' + e));
    process.exit(1);
}
console.log(`\n✅ 검사 통과 (공지 ${notices.length}건)`);
