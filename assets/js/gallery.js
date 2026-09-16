/* ===========================================================
   通知公告画廊 + 灯箱(图片放大)
   -----------------------------------------------------------
   通知内容本身在 assets/data/notices.js，
   这里只负责显示、切换、放大等动作。
   =========================================================== */

import { notices } from '../data/notices.js';

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
    if (!mainImage || !thumbList) return;

    let currentNoticeIndex = 0;
    let noticeTransitionTimer;

    // ----- 渲染右侧缩略图列表 -----
    function renderThumbs() {
        thumbList.innerHTML = '';

        notices.forEach((notice, i) => {
            const card = document.createElement('div');
            card.className = 'thumb-card' + (i === 0 ? ' active' : '');
            card.dataset.index = String(i);

            const imgBox = document.createElement('div');
            imgBox.className = 'thumb-img';
            const img = document.createElement('img');
            img.src = notice.thumb;
            img.alt = notice.title;
            img.loading = 'lazy';
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
    function goToNotice(index, scrollThumbnail = true) {
        if (index < 0) index = notices.length - 1;
        if (index >= notices.length) index = 0;

        currentNoticeIndex = index;
        const notice = notices[index];

        mainImage.classList.add('fade-out');

        clearTimeout(noticeTransitionTimer);
        noticeTransitionTimer = setTimeout(() => {
            mainImage.src = notice.src;
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
    function syncLightbox() {
        lightboxImage.src = notices[currentNoticeIndex].src;
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
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const lightboxPrevBtn = document.getElementById('lightboxPrev');
    const lightboxNextBtn = document.getElementById('lightboxNext');
    const lightboxCloseBtn = document.getElementById('lightboxClose');

    // 上一张/下一张按钮：阻止冒泡，否则会同时打开灯箱
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
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'ArrowRight') lightboxNext();
            if (e.key === 'ArrowLeft') lightboxPrev();
            if (e.key === 'Escape') closeLightbox();
        } else if (mainWrapper && mainWrapper.contains(e.target)) {
            // 焦点在画廊内时才用方向键切换，避免影响整页滚动
            if (e.key === 'ArrowRight') { e.preventDefault(); nextNotice(); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); prevNotice(); }
        }
    });

    // ----- 手机端左右滑动 -----
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
    renderThumbs();
    // 第二个参数 false: 首次打开页面时不滚动，避免一进入就跳到通知区域
    goToNotice(0, false);
}
