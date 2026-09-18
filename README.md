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
  vendor/fontawesome/   아이콘 (Font Awesome 6.4.0, 외부 CDN 대신 사이트에 포함)

tools/
  check-site.mjs        배포 전 자동 검사 스크립트
.github/workflows/
  static.yml            main에 push하면 검사 후 자동 배포
```

**어디를 고쳐야 하나요?**

| 하고 싶은 일 | 고칠 곳 |
| --- | --- |
| 통지공고 추가·삭제 | `notices/` (→ [2. 통지공고 추가하기](#2-통지공고-추가하기)) |
| 모집요강 등 PDF 교체 | `documents/` + `index.html`의 다운로드 링크 (→ [3. PDF 교체하기](#3-pdf-교체하기)) |
| 페이지의 안내 문구 수정 | `index.html` |
| 색·간격·글자 크기 등 디자인 | `assets/css/styles.css` |
| 소개·생활 안내 사진 교체 | `assets/images/` (같은 파일명으로 덮어쓰기) |
| 버튼·팝업 등 동작 | `assets/js/` |

---

## 2. 통지공고 추가하기

GitHub 웹사이트에서도 그대로 할 수 있습니다.

**① 이미지 2장 올리기**

| 파일 | 올릴 위치 | 설명 |
| --- | --- | --- |
| 기사 이미지 | `notices/images/` | 예: `inform20.webp` |
| 썸네일 | `notices/thumbs/` | 예: `inform20.webp` — **기사에 들어간 사진 중 한 장**. 비율은 상관없고(자동으로 잘려서 맞춰짐), 가로 600px 이내 권장 |

> 📦 **이미지는 WebP로 변환해서 올려주세요.** 글자 화질은 그대로면서 용량이 1/8 정도로 줄어듭니다.
> PNG·JPG로 올려도 화면에는 정상적으로 나오지만, 중국에서 접속할 때 로딩이 느려집니다.
> 변환은 <https://squoosh.app> 같은 웹 도구에서 `WebP / Quality 80` 정도로 저장하면 됩니다.
> (파일명 뒤 확장자를 바꿨다면 아래 `notices.js`에도 똑같이 적어야 합니다)

> 썸네일을 준비하기 어렵다면 생략해도 됩니다. 기사 이미지의 윗부분(제목)이 대신 보입니다.

**② `notices/notices.js` 맨 위에 항목 추가** (위에 있을수록 최신)

```js
export const notices = [
    {
        src: "inform20.webp",      // 기사 이미지 파일명 (폴더 없이 파일명만)
        thumb: "inform20.webp",    // 썸네일 파일명 (없으면 이 줄 삭제)
        title: "공고 제목(중국어)",
        date: "2026-09-20",        // YYYY-MM-DD
        tag: "校内新闻",            // 校内新闻(교내소식) 또는 信息公告(안내공고)
        tagClass: "tag-blue"       // 校内新闻이면 tag-blue, 信息公告이면 tag-gold
    },
    {
        src: "inform19.webp",      // ← 기존 항목들
        ...
```

⚠️ 가장 흔한 실수: **항목 사이의 쉼표(`},`) 누락**, 따옴표를 중국어·한국어 따옴표(`“ ”`)로 입력.
실수하더라도 배포 전 자동 검사에서 걸러져 **사이트가 깨진 채로 배포되지는 않습니다.**

**③ 커밋하면 자동 배포** — Actions 탭에서 초록색 체크가 뜨면 완료입니다.

---

## 3. PDF 교체하기

1. 새 PDF를 `documents/`에 올립니다.
2. `index.html`에서 기존 파일명을 검색해 `href="documents/새파일명.pdf"`로 바꿉니다.
3. 더 이상 쓰지 않는 PDF는 삭제합니다.

> ⚠️ PDF 파일명을 바꾸면 **주소가 바뀝니다.** 위챗·샤오홍슈 게시물 등에 PDF 주소를 직접 공유했다면 그 링크는 끊기니 주의하세요.

---

## 4. 남은 개선 과제

- [ ] 반응형 세부 조정 (실제 기기에서 확인하며 글자 크기·여백 다듬기)
- [ ] 중국 현지에서 실제 접속 확인 (페이지 로딩 속도, 지도 버튼 동작)
