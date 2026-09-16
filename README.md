# 한국항공대학교 국제교류처 중문 홈페이지

중국인 유학생분들을 대상으로 하는 국제교류처 안내 사이트입니다. 프레임워크나 서버 없이 HTML·CSS·JavaScript만 사용하는 정적 사이트이며, GitHub Pages로 배포됩니다.

- 원본 저장소: <https://github.com/KAUOIA/kauoia-china>
- 배포 주소: <https://kauoia.github.io/kauoia-china/>

---

## 1. 폴더 구조

폴더는 **"누가, 얼마나 자주 바꾸는 파일인가"** 기준으로 나뉘어 있습니다.

```
index.html              페이지의 모든 문구와 구조
README.md               이 문서

notices/                ★ 통지공고 — 새 공고를 올릴 때는 이 폴더만 보면 됩니다
  notices.js            공고 목록 (제목·날짜·파일명)
  images/               기사 이미지 (클릭하면 크게 보이는 긴 이미지)
  thumbs/               목록용 썸네일 (기사 속 사진 한 장)

documents/              ★ 다운로드용 PDF — 학기마다 교체 (모집요강, 장학제도 등)

assets/                 사이트 자체 — 디자인·기능을 바꿀 때만 수정
  css/
    styles.css          사이트 전체 스타일
    gallery.css         통지공고 갤러리 스타일
  js/
    main.js             메뉴, 스크롤, 교통 안내 팝업
    gallery.js          통지공고 갤러리 동작
  images/               로고, 메인 배너, 소개·생활 안내 사진

tools/
  check-site.mjs        배포 전 자동 검사 스크립트
.github/workflows/
  static.yml            main에 push하면 검사 후 자동 배포
```

**어디를 고쳐야 하나요?**

| 하고 싶은 일 | 고칠 곳 |
| --- | --- |
| 통지공고 추가·삭제 | `notices/` (→ [3. 통지공고 추가하기](#3-통지공고-추가하기)) |
| 모집요강 등 PDF 교체 | `documents/` + `index.html`의 다운로드 링크 (→ [4. PDF 교체하기](#4-pdf-교체하기)) |
| 페이지의 안내 문구 수정 | `index.html` |
| 색·간격·글자 크기 등 디자인 | `assets/css/styles.css` |
| 소개·생활 안내 사진 교체 | `assets/images/` (같은 파일명으로 덮어쓰기) |
| 버튼·팝업 등 동작 | `assets/js/` |

---

## 2. 로컬에서 확인하기

`index.html`을 **더블클릭으로 열면 안 됩니다.** JavaScript를 모듈(`type="module"`)로 불러오기 때문에, 브라우저 보안 정책상 `file://`로 열면 동작하지 않습니다. 반드시 아래처럼 로컬 서버를 띄워서 확인하세요.

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

그리고 브라우저에서 <http://127.0.0.1:8765/> 로 접속합니다. (본인 컴퓨터에서만 열리는 주소입니다.)

배포 전 검사도 로컬에서 미리 돌려볼 수 있습니다. (Node.js 필요)

```bash
node tools/check-site.mjs
```

---

## 3. 통지공고 추가하기

GitHub 웹사이트에서도 그대로 할 수 있습니다.

**① 이미지 2장 올리기**

| 파일 | 올릴 위치 | 설명 |
| --- | --- | --- |
| 기사 이미지 | `notices/images/` | 예: `inform20.png` |
| 썸네일 | `notices/thumbs/` | 예: `inform20.jpg` — **기사에 들어간 사진 중 한 장**. 비율은 상관없고(자동으로 잘려서 맞춰짐), 가로 600px 이내·500KB 이하 권장 |

> 썸네일을 준비하기 어렵다면 생략해도 됩니다. 기사 이미지의 윗부분(제목)이 대신 보입니다.

**② `notices/notices.js` 맨 위에 항목 추가** (위에 있을수록 최신)

```js
export const notices = [
    {
        src: "inform20.png",       // 기사 이미지 파일명 (폴더 없이 파일명만)
        thumb: "inform20.jpg",     // 썸네일 파일명 (없으면 이 줄 삭제)
        title: "공고 제목(중국어)",
        date: "2026-09-20",        // YYYY-MM-DD
        tag: "校内新闻",            // 校内新闻(교내소식) 또는 信息公告(안내공고)
        tagClass: "tag-blue"       // 校内新闻이면 tag-blue, 信息公告이면 tag-gold
    },
    {
        src: "inform19.png",       // ← 기존 항목들
        ...
```

⚠️ 가장 흔한 실수: **항목 사이의 쉼표(`},`) 누락**, 따옴표를 중국어·한국어 따옴표(`“ ”`)로 입력.
실수하더라도 [배포 전 검사](#5-배포)에서 걸러져 **사이트가 깨진 채로 배포되지는 않습니다.**

**③ 커밋하면 자동 배포** — Actions 탭에서 초록색 체크가 뜨면 완료입니다.

---

## 4. PDF 교체하기

1. 새 PDF를 `documents/`에 올립니다.
2. `index.html`에서 기존 파일명을 검색해 `href="documents/새파일명.pdf"`로 바꿉니다.
3. 더 이상 쓰지 않는 PDF는 삭제합니다.

> ⚠️ PDF 파일명을 바꾸면 **주소가 바뀝니다.** 위챗·샤오홍슈 게시물 등에 PDF 주소를 직접 공유했다면 그 링크는 끊기니 주의하세요.

---

## 5. 배포

`main` 브랜치에 push하면 `.github/workflows/static.yml`이 아래 순서로 실행됩니다.

1. **검사** (`tools/check-site.mjs`)
   - `notices.js` 등 JS 문법 오류 (쉼표·따옴표 누락 등)
   - 공고에 적힌 이미지 파일이 실제로 있는지, 날짜 형식이 맞는지
   - `index.html`·CSS에 적힌 이미지·PDF 경로가 실제로 있는지
2. **오류가 있으면 배포 중단** → 사이트는 **마지막 정상 상태 그대로 유지**됩니다.
   Actions 탭에서 빨간 X를 누르면 `Check site files` 단계에 무엇이 잘못됐는지 한국어로 나옵니다.
3. 통과하면 GitHub Pages에 배포합니다.

썸네일 누락·용량 초과 같은 문제는 사이트가 깨지지 않으므로 **경고만 표시하고 배포는 진행**합니다.

처음 설정하는 저장소(예: fork한 저장소)라면 한 번만 아래를 해주세요.

1. 저장소 **Settings → Pages → Build and deployment → Source**를 `GitHub Actions`로 선택
2. **Actions** 탭에서 워크플로 활성화 안내가 보이면 활성화
3. `Deploy static content to Pages` 워크플로를 `Run workflow`로 한 번 실행
4. 초록색 체크가 뜨면 Settings → Pages의 주소로 접속해 확인

---

## 6. 작업할 때 주의할 점

- **인라인 스타일(`style="..."`)을 새로 늘리지 마세요.** HTML에 직접 쓴 스타일은 CSS 파일의 반응형 규칙을 덮어써서, 모바일에서 레이아웃이 깨지는 원인이 됩니다. 되도록 CSS 파일에 클래스를 만들어 사용하세요.
- **인라인 이벤트(`onclick="..."`)도 사용하지 마세요.** 동작은 `assets/js/`에서 `addEventListener`로 연결합니다.
- 통지공고 제목처럼 사람이 입력하는 값은 `textContent`로 넣습니다. HTML 문자열을 직접 조립하면 따옴표·특수문자 때문에 화면이 깨질 수 있습니다.
- 이미지·PDF 파일명을 바꾸거나 옮기면 기존에 공유된 링크가 끊깁니다.
- 이 저장소는 public이고 저장소 전체가 배포됩니다. **학생 개인정보나 내부 자료는 절대 올리지 마세요.**

---

## 7. 남은 개선 과제

- [ ] 모바일·태블릿 반응형 정리 (햄버거 메뉴 동작, 빠른 링크·푸터 열 수, 가로 넘침)
- [ ] 인라인 스타일을 CSS 클래스로 정리 (현재 약 228개)
- [ ] 기사 이미지·사이트 사진 압축 (WebP 등) — 기사 이미지 19장이 약 32MB
- [ ] 외부 리소스(Google Fonts·Font Awesome·Google Maps)가 중국 현지에서 잘 열리는지 확인
