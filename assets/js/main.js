/* ===========================================================
   全站公共动作
   -----------------------------------------------------------
   - 手机端菜单开关
   - 页内平滑滚动
   - 导航栏滚动效果
   - 板块进入视野时的动画
   - 交通指南弹窗
   通知公告画廊的动作在 gallery.js
   =========================================================== */

// ===== 手机/平板菜单（汉堡按钮）=====
function initNavigation() {
    const navMenu = document.getElementById('navMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const menuIcon = menuBtn ? menuBtn.querySelector('i') : null;

    function setMenuOpen(open) {
        if (!navMenu || !menuBtn) return;
        navMenu.classList.toggle('active', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        // 打开时图标变成 ×
        if (menuIcon) {
            menuIcon.classList.toggle('fa-bars', !open);
            menuIcon.classList.toggle('fa-times', open);
        }
    }

    if (menuBtn && navMenu) {
        menuBtn.setAttribute('aria-controls', 'navMenu');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            setMenuOpen(!navMenu.classList.contains('active'));
        });

        // 点击菜单以外的地方关闭
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target)) {
                setMenuOpen(false);
            }
        });

        // ESC 关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setMenuOpen(false);
        });

        // 窗口变宽回到电脑布局时，重置菜单状态
        window.matchMedia('(min-width: 1025px)').addEventListener('change', (e) => {
            if (e.matches) setMenuOpen(false);
        });
    }

    // ===== 页内平滑滚动 =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setMenuOpen(false);
            }
        });
    });

    // ===== 快捷菜单卡片 =====
    document.querySelectorAll('.quick-item[data-target]').forEach(item => {
        item.addEventListener('click', () => {
            const target = document.querySelector(item.dataset.target);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ===== 导航栏滚动效果 =====
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
}

// ===== 板块进入视野时的动画 =====
function initScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.section').forEach(section => observer.observe(section));
}

// ===== 交通指南弹窗 =====
function initTransportModal() {
    const modal = document.getElementById('transportModal');
    if (!modal) return;

    const openBtn = document.querySelector('.transport-trigger-btn');
    const closeBtn = modal.querySelector('.transport-close');

    function open() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);

    // 点击弹窗背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) close();
    });

    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) close();
    });
}

initNavigation();
initScrollAnimation();
initTransportModal();

// 画廊单独加载：即使 notices.js 写错（少逗号、引号等），
// 菜单和弹窗等其他功能也照常工作，只有通知公告区域不显示。
import('./gallery.js')
    .then(({ initGallery }) => initGallery())
    .catch((err) => {
        console.error('[通知公告] 加载失败，请检查 notices/notices.js 的格式：', err);
    });
