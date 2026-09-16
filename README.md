# 한국항공대학교 국제교류처 중문 홈페이지

중국인 유학생분들을 대상으로 하는 국제교류처 안내 사이트입니다. 프레임워크나 서버 없이 HTML·CSS·JavaScript만 사용하는 정적 사이트이며, GitHub Pages로 배포됩니다.

- 원본 저장소: <https://github.com/KAUOIA/kauoia-china>
- 배포 주소: <https://kauoia.github.io/kauoia-china/>

---

## 1. 폴더 구조

```
index.html              페이지의 모든 문구와 구조 (여기를 고치면 화면의 글이 바뀝니다)
README.md               이 문서

assets/
  css/
    styles.css          사이트 전체 스타일 + 반응형 규칙
    gallery.css         통지공고 갤러리·이미지 확대창(라이트박스) 스타일
  js/
    main.js             메뉴, 부드러운 스크롤, 교통 안내 팝업 등 공통 동작
    gallery.js          통지공고 갤러리·확대창 동작
  data/
    notices.js          통지공고 목록 데이터 (제목·날짜·이미지)

inform*.png / pic*.png / logo.jpg      이미지
*.pdf                                  모집요강 등 첨부 문서

.github/workflows/static.yml           main에 push하면 자동 배포
```

**어디를 고쳐야 하나요?**

| 하고 싶은 일 | 고칠 파일 |
| --- | --- |
| 페이지의 안내 문구 수정 | `index.html` |
| 통지공고 추가·삭제 | `assets/data/notices.js` |
| 색·간격·글자 크기 등 디자인 | `assets/css/styles.css` |
| 통지공고 갤러리 디자인 | `assets/css/gallery.css` |
| 버튼·팝업 등 동작 | `assets/js/main.js`, `assets/js/gallery.js` |

---

## 2. 로컬에서 확인하기

`index.html`을 **더블클릭으로 열면 안 됩니다.** JavaScript를 모듈(`type="module"`)로 불러오기 때문에, 브라우저 보안 정책상 `file://`로 열면 동작하지 않습니다. 반드시 아래처럼 로컬 서버를 띄워서 확인하세요.

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

그리고 브라우저에서 <http://127.0.0.1:8765/> 로 접속합니다. (본인 컴퓨터에서만 열리는 주소입니다.)

---

## 3. 통지공고 추가하기

1. 공고 이미지를 저장소 최상위 폴더에 올립니다. 예: `inform20.png`
2. `assets/data/notices.js`를 열고 **배열 맨 위에** 항목을 추가합니다. (위에 있을수록 최신)

```js
export const notices = [
    {
        src: "inform20.png",       // 클릭해서 크게 볼 이미지
        thumb: "inform20.png",     // 오른쪽 목록에 뜨는 작은 이미지
        title: "공고 제목(중국어)",
        date: "2026-09-20",        // YYYY-MM-DD
        tag: "校内新闻",            // 校内新闻(교내소식) 또는 信息公告(안내공고)
        tagClass: "tag-blue"       // 校内新闻이면 tag-blue, 信息公告이면 tag-gold
    },
    // ... 기존 항목들
];
```

3. 로컬에서 확인한 뒤 커밋·푸시하면 배포됩니다.

> 이미지 용량이 크면 로딩이 느려집니다. 목록용 썸네일은 가로 400px 내외로 줄여서 따로 만들고 `thumb`에 지정하는 것을 권장합니다.

---

## 4. 배포

`main` 브랜치에 push하면 `.github/workflows/static.yml`이 자동으로 GitHub Pages에 배포합니다.

처음 설정하는 저장소(예: fork한 저장소)라면 한 번만 아래를 해주세요.

1. 저장소 **Settings → Pages → Build and deployment → Source**를 `GitHub Actions`로 선택
2. **Actions** 탭에서 워크플로 활성화 안내가 보이면 활성화
3. `Deploy static content to Pages` 워크플로를 `Run workflow`로 한 번 실행
4. 초록색 체크가 뜨면 Settings → Pages의 주소로 접속해 확인

---

## 5. 작업할 때 주의할 점

- **인라인 스타일(`style="..."`)을 새로 늘리지 마세요.** HTML에 직접 쓴 스타일은 CSS 파일의 반응형 규칙을 덮어써서, 모바일에서 레이아웃이 깨지는 원인이 됩니다. 되도록 CSS 파일에 클래스를 만들어 사용하세요.
- **인라인 이벤트(`onclick="..."`)도 사용하지 마세요.** 동작은 `assets/js/`에서 `addEventListener`로 연결합니다.
- 통지공고 제목처럼 사람이 입력하는 값은 `textContent`로 넣습니다. HTML 문자열을 직접 조립하면 따옴표·특수문자 때문에 화면이 깨질 수 있습니다.
- 이미지·PDF 파일명을 바꾸거나 옮기면 기존에 공유된 링크가 끊깁니다. 변경 전에 `index.html`과 `notices.js`에서 해당 이름을 검색해 모두 함께 고쳐주세요.
- 이 저장소는 public이고 저장소 전체가 배포됩니다. **학생 개인정보나 내부 자료는 절대 올리지 마세요.**

---

## 6. 남은 개선 과제

- [ ] 모바일·태블릿 반응형 정리 (햄버거 메뉴 동작, 빠른 링크·푸터 열 수, 가로 넘침)
- [ ] 인라인 스타일을 CSS 클래스로 정리
- [ ] 이미지 최적화 (썸네일 분리, 압축, WebP) — 현재 저장소 이미지 총량 약 46MB
- [ ] 이미지·PDF를 `assets/images/`, `assets/documents/`로 정리
- [ ] 외부 리소스(Google Fonts·Font Awesome·Google Maps)가 중국 현지에서 잘 열리는지 확인
