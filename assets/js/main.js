/* ===========================================================
   全站公共动作
   -----------------------------------------------------------
   - 手机端菜单开关
   - 页内平滑滚动
   - 导航栏滚动效果
   - 板块进入视野时的动画
   - 交通指南弹窗
   通知公告画廊的动作在 gallery.js
   -----------------------------------------------------------
   [한국어] 사이트 공통 동작
   - 휴대폰·태블릿 메뉴 열고 닫기
   - 페이지 안에서 부드럽게 이동
   - 스크롤할 때 상단 네비게이션 효과
   - 섹션이 화면에 들어올 때 동작
   - 교통 안내 팝업
   통지공고 갤러리 동작은 gallery.js에 있습니다.
   =========================================================== */

// ===== 手机/平板菜单（汉堡按钮）=====
// ===== [한국어] 휴대폰·태블릿 메뉴 (햄버거 버튼) =====
function initNavigation() {
    const navMenu = document.getElementById('navMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const menuIcon = menuBtn ? menuBtn.querySelector('i') : null;

    function setMenuOpen(open) {
        if (!navMenu || !menuBtn) return;
        navMenu.classList.toggle('active', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        // 打开时图标变成 ×
        // [한국어] 메뉴가 열리면 아이콘을 ×로 바꿉니다.
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
        // [한국어] 메뉴 바깥을 클릭하면 닫습니다.
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target)) {
                setMenuOpen(false);
            }
        });

        // ESC 关闭
        // [한국어] ESC 키로 닫습니다.
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setMenuOpen(false);
        });

        // 窗口变宽回到电脑布局时，重置菜单状态
        // [한국어] 창을 넓혀 데스크톱 화면으로 돌아가면 메뉴 상태를 초기화합니다.
        window.matchMedia('(min-width: 1025px)').addEventListener('change', (e) => {
            if (e.matches) setMenuOpen(false);
        });
    }

    // ===== 页内平滑滚动 =====
    // ===== [한국어] 페이지 안에서 부드럽게 이동 =====
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
    // ===== [한국어] 메인 상단의 퀵 메뉴 카드 클릭 =====
    document.querySelectorAll('.quick-item[data-target]').forEach(item => {
        item.addEventListener('click', () => {
            const target = document.querySelector(item.dataset.target);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ===== 导航栏滚动效果 =====
    // ===== [한국어] 스크롤을 내리면 네비게이션 색을 진하게 (.scrolled 클래스) =====
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
}

// ===== 板块进入视野时的动画 =====
// ===== [한국어] 섹션이 화면에 들어오면 animate-in 클래스를 붙입니다 =====
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
// ===== [한국어] 교통 안내 팝업 =====
function initTransportModal() {
    const modal = document.getElementById('transportModal');
    if (!modal) return;

    const openBtn = document.querySelector('.transport-trigger-btn');
    const closeBtn = modal.querySelector('.transport-close');

    // 地图在第一次打开弹窗时才加载
    // [한국어] 지도는 팝업을 처음 열 때만 불러옵니다. (첫 화면 로딩을 느리게 하지 않기 위함)
    const mapFrame = modal.querySelector('iframe[data-src]');

    function open() {
        if (mapFrame && !mapFrame.src) mapFrame.src = mapFrame.dataset.src;
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
    // [한국어] 팝업 바깥(어두운 배경)을 클릭하면 닫습니다.
    modal.addEventListener('click', (e) => {
        if (e.target === modal) close();
    });

    // ESC 键关闭
    // [한국어] ESC 키로 닫습니다.
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) close();
    });
}

initNavigation();
initScrollAnimation();
initTransportModal();

// 画廊单独加载：即使 notices.js 写错（少逗号、引号等），
// 菜单和弹窗等其他功能也照常工作，只有通知公告区域不显示。
// [한국어] 갤러리는 따로 불러옵니다. notices.js에 문법 오류(쉼표·따옴표 누락 등)가 있어도
// 메뉴·팝업 같은 다른 기능은 그대로 동작하고, 통지공고 영역만 표시되지 않습니다.
import('./gallery.js')
    .then(({ initGallery }) => initGallery())
    .catch((err) => {
        console.error('[通知公告] 加载失败，请检查 notices/notices.js 的格式：', err);
    });
