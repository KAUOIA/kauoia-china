/* ===========================================================
   通知公告画廊 + 灯箱(图片放大)
   -----------------------------------------------------------
   通知内容本身在 notices/notices.js，
   这里只负责显示、切换、放大等动作。
   -----------------------------------------------------------
   [한국어] 통지공고 갤러리 + 이미지 확대창(라이트박스)
   공고 내용 자체는 notices/notices.js에 있고,
   이 파일은 화면 표시·전환·확대 동작만 담당합니다.
   =========================================================== */

import { notices } from '../../notices/notices.js';

// notices.js 里只写文件名，文件夹在这里统一补上
// [한국어] notices.js에는 파일명만 적고, 폴더 경로는 여기서 붙입니다.
const IMAGE_DIR = 'notices/images/';
const THUMB_DIR = 'notices/thumbs/';

const imageUrl = (notice) => IMAGE_DIR + notice.src;
// 没有指定缩略图时，直接用文章图片
// [한국어] 썸네일을 지정하지 않았으면 기사 이미지를 그대로 사용합니다.
const thumbUrl = (notice) => notice.thumb ? THUMB_DIR + notice.thumb : imageUrl(notice);

export function initGallery() {
    const mainImage = document.getElementById('mainImage');
    const mainWrapper = document.getElementById('mainWrapper');
    const counter = document.getElementById('counter');
    const noticeTag = document.getElementById('noticeTag');
    const noticeTitle = document.getElementById('noticeTitle');
    const noticeDate = document.getElementById('noticeDate');
    const thumbList = document.getElementById('thumbList');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCounter = document.getElementById('lightboxCounter');

    // 页面上没有画廊时（例如以后拆分页面）直接跳过
    // [한국어] 페이지에 갤러리가 없으면(예: 나중에 페이지를 나눈 경우) 아무 것도 하지 않습니다.
    if (!mainImage || !thumbList) return;

    let currentNoticeIndex = 0;
    let noticeTransitionTimer;

    // ----- 渲染右侧缩略图列表 -----
    // ----- [한국어] 오른쪽 공고 목록(썸네일 카드) 그리기 -----
    function renderThumbs() {
        thumbList.innerHTML = '';

        notices.forEach((notice, i) => {
            const card = document.createElement('div');
            card.className = 'thumb-card' + (i === 0 ? ' active' : '');
            card.dataset.index = String(i);

            const imgBox = document.createElement('div');
            imgBox.className = 'thumb-img';
            const img = document.createElement('img');
            img.alt = notice.title;
            img.loading = 'lazy';
            // 缩略图文件找不到（文件名写错、忘记上传）时，改用文章图片，只尝试一次
            // [한국어] 썸네일 파일을 못 찾으면(파일명 오타·업로드 누락) 기사 이미지로 대체합니다. 한 번만 시도합니다.
            img.addEventListener('error', () => {
                if (img.dataset.fallback) return;
                img.dataset.fallback = '1';
                img.classList.add('is-fallback');
                img.src = imageUrl(notice);
            });
            img.src = thumbUrl(notice);
            if (!notice.thumb) img.classList.add('is-fallback');
            imgBox.appendChild(img);

            const content = document.createElement('div');
            content.className = 'thumb-content';

            const title = document.createElement('div');
            title.className = 'thumb-title';
            title.textContent = notice.title;

            const date = document.createElement('div');
            date.className = 'thumb-date';
            date.textContent = notice.date;

            const tag = document.createElement('span');
            tag.className = 'notice-tag ' + notice.tagClass + ' thumb-tag';
            tag.textContent = notice.tag;

            content.append(title, date, tag);
            card.append(imgBox, content);

            card.addEventListener('click', () => goToNotice(i));
            thumbList.appendChild(card);
        });
    }

    // ----- 切换到第 index 条通知 -----
    // ----- [한국어] index번째 공고로 전환 -----
    function goToNotice(index, scrollThumbnail = true) {
        if (index < 0) index = notices.length - 1;
        if (index >= notices.length) index = 0;

        currentNoticeIndex = index;
        const notice = notices[index];

        mainImage.classList.add('fade-out');

        clearTimeout(noticeTransitionTimer);
        noticeTransitionTimer = setTimeout(() => {
            mainImage.src = imageUrl(notice);
            mainImage.alt = notice.title;
            noticeTag.textContent = notice.tag;
            noticeTag.className = 'notice-tag ' + notice.tagClass;
            noticeTitle.textContent = notice.title;
            noticeDate.querySelector('span').textContent = notice.date;
            mainImage.classList.remove('fade-out');
        }, 200);

        counter.textContent = (index + 1) + ' / ' + notices.length;

        thumbList.querySelectorAll('.thumb-card').forEach((card, i) => {
            card.classList.toggle('active', i === index);
            if (i === index && scrollThumbnail) {
                scrollThumbIntoView(card);
            }
        });
    }

    // 只滚动缩略图列表，避免带动整个页面。
    // [한국어] 목록 안에서만 스크롤합니다. 페이지 전체가 같이 움직이지 않게 하기 위함입니다.
    function scrollThumbIntoView(card) {
        const cardRect = card.getBoundingClientRect();
        const listRect = thumbList.getBoundingClientRect();
        const left = listRect.left + thumbList.clientLeft;
        const top = listRect.top + thumbList.clientTop;
        const right = left + thumbList.clientWidth;
        const bottom = top + thumbList.clientHeight;
        const dx = cardRect.left < left ? cardRect.left - left
            : cardRect.right > right ? cardRect.right - right : 0;
        const dy = cardRect.top < top ? cardRect.top - top
            : cardRect.bottom > bottom ? cardRect.bottom - bottom : 0;
        thumbList.scrollBy({ left: dx, top: dy, behavior: 'smooth' });
    }

    function nextNotice() { goToNotice(currentNoticeIndex + 1); }
    function prevNotice() { goToNotice(currentNoticeIndex - 1); }

    // ----- 灯箱(点击主图放大) -----
    // ----- [한국어] 확대창: 큰 이미지를 클릭하면 열립니다 -----
    function syncLightbox() {
        lightboxImage.src = imageUrl(notices[currentNoticeIndex]);
        lightboxImage.alt = notices[currentNoticeIndex].title;
        lightboxCounter.textContent = (currentNoticeIndex + 1) + ' / ' + notices.length;
    }

    function openLightbox() {
        syncLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function lightboxNext() { nextNotice(); syncLightbox(); }
    function lightboxPrev() { prevNotice(); syncLightbox(); }

    // ----- 事件绑定 -----
    // ----- [한국어] 버튼·클릭 동작 연결 -----
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const lightboxPrevBtn = document.getElementById('lightboxPrev');
    const lightboxNextBtn = document.getElementById('lightboxNext');
    const lightboxCloseBtn = document.getElementById('lightboxClose');

    // 上一张/下一张按钮：阻止冒泡，否则会同时打开灯箱
    // [한국어] 이전·다음 버튼은 클릭이 부모로 전달되지 않게 막습니다. 안 막으면 확대창까지 같이 열립니다.
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevNotice(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextNotice(); });
    if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); lightboxPrev(); });
    if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', (e) => { e.stopPropagation(); lightboxNext(); });
    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (mainWrapper) mainWrapper.addEventListener('click', openLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // ----- 键盘操作 -----
    // ----- [한국어] 키보드 조작 (←, →, ESC) -----
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'ArrowRight') lightboxNext();
            if (e.key === 'ArrowLeft') lightboxPrev();
            if (e.key === 'Escape') closeLightbox();
        } else if (mainWrapper && mainWrapper.contains(e.target)) {
            // 焦点在画廊内时才用方向键切换，避免影响整页滚动
            // [한국어] 갤러리 안에 포커스가 있을 때만 방향키로 전환합니다. 페이지 스크롤을 방해하지 않기 위함입니다.
            if (e.key === 'ArrowRight') { e.preventDefault(); nextNotice(); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); prevNotice(); }
        }
    });

    // ----- 手机端左右滑动 -----
    // ----- [한국어] 휴대폰에서 좌우로 밀어 전환 -----
    let touchStartX = 0;
    if (mainWrapper) {
        mainWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        mainWrapper.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? nextNotice() : prevNotice();
            }
        });
    }

    // ----- 初始化 -----
    // ----- [한국어] 첫 실행 -----
    renderThumbs();
    // 第二个参数 false: 首次打开页面时不滚动，避免一进入就跳到通知区域
    // [한국어] 두 번째 인자 false: 첫 화면에서는 스크롤하지 않습니다. 페이지를 열자마자 공고 영역으로 내려가는 것을 막습니다.
    goToNotice(0, false);
}
