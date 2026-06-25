/* ═══════════════════════════════════════════
   Rongcan Portfolio — Script
   Grid Rendering · Lightbox · Scroll Effects
   ═══════════════════════════════════════════ */

// ── 作品数据 ──
// 将图片放入 images/ 文件夹，按顺序命名 work-01.jpg ~ work-14.jpg
const categories = [
    {
        id: 'gridUI',
        label: 'UI 设计',
        works: [
            { src: 'images/work-01.jpg', alt: 'UI 设计 01' },
            { src: 'images/work-02.jpg', alt: 'UI 设计 02' },
            { src: 'images/work-03.jpg', alt: 'UI 设计 03' },
            { src: 'images/work-04.jpg', alt: 'UI 设计 04' },
            { src: 'images/work-05.jpg', alt: 'UI 设计 05' },
        ]
    },
    {
        id: 'gridWeb',
        label: '网页设计',
        works: [
            { src: 'images/work-06.jpg', alt: '网页设计 01' },
            { src: 'images/work-07.jpg', alt: '网页设计 02' },
            { src: 'images/work-08.jpg', alt: '网页设计 03' },
            { src: 'images/work-09.jpg', alt: '网页设计 04' },
            { src: 'images/work-10.jpg', alt: '网页设计 05' },
        ]
    },
    {
        id: 'gridBrand',
        label: '品牌视觉',
        works: [
            { src: 'images/work-11.jpg', alt: '品牌视觉 01' },
            { src: 'images/work-12.jpg', alt: '品牌视觉 02' },
            { src: 'images/work-13.jpg', alt: '品牌视觉 03' },
            { src: 'images/work-14.jpg', alt: '品牌视觉 04' },
        ]
    }
];

// ── 扁平化作品列表（Lightbox 全局导航） ──
const allWorks = [];
categories.forEach(cat => {
    cat.works.forEach(work => {
        allWorks.push({ ...work, category: cat.label });
    });
});

// ── 渲染网格 + 骨架屏 + 图片加载检测 ──
function renderWorks() {
    categories.forEach(cat => {
        const grid = document.getElementById(cat.id);
        if (!grid) return;

        cat.works.forEach((work) => {
            const item = document.createElement('div');
            item.className = 'work-item fade-in';

            // 骨架屏
            const shimmer = document.createElement('div');
            shimmer.className = 'shimmer';
            item.appendChild(shimmer);

            // 图片
            const img = document.createElement('img');
            img.src = work.src;
            img.alt = work.alt;
            img.loading = 'lazy';
            img.style.opacity = '0';

            img.addEventListener('load', () => {
                item.classList.add('loaded');
                img.style.opacity = '1';
            });
            img.addEventListener('error', () => {
                // 图片加载失败时隐藏骨架屏
                item.classList.add('loaded');
                img.style.opacity = '1';
            });

            // 处理缓存命中
            if (img.complete && img.naturalWidth > 0) {
                item.classList.add('loaded');
                img.style.opacity = '1';
            }

            item.appendChild(img);

            const globalIndex = allWorks.findIndex(
                w => w.src === work.src && w.alt === work.alt
            );
            item.addEventListener('click', () => openLightbox(globalIndex));
            grid.appendChild(item);
        });
    });
}

// ── Lightbox ──
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxCategory = document.getElementById('lightboxCategory');
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightbox() {
    const work = allWorks[currentIndex];
    if (!work) return;

    // 淡出 → 换图 → 淡入
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.95)';

    setTimeout(() => {
        lightboxImg.src = work.src;
        lightboxImg.alt = work.alt;
        lightboxImg.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
    }, 150);

    lightboxCounter.textContent = `${currentIndex + 1} / ${allWorks.length}`;
    lightboxCategory.textContent = work.category;
}

function prevImage() {
    currentIndex = (currentIndex - 1 + allWorks.length) % allWorks.length;
    updateLightbox();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % allWorks.length;
    updateLightbox();
}

// ── 事件绑定 ──
document.addEventListener('DOMContentLoaded', () => {
    renderWorks();

    // Lightbox 控制
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', prevImage);
    document.getElementById('lightboxNext').addEventListener('click', nextImage);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // 键盘导航
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    // 触摸滑动手势（Lightbox）
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    lightbox.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 60) {
            diff > 0 ? nextImage() : prevImage();
        }
    });

    // ── 滚动：导航栏样式 + 活跃链接高亮 ──
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const backToTop = document.getElementById('backToTop');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === id);
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

    document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

    // 滚动事件（性能优化：rAF 节流）
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                const y = window.scrollY;
                navbar.classList.toggle('scrolled', y > 60);
                backToTop.classList.toggle('visible', y > 600);
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // ── 回到顶部 ──
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ── 滚动渐入动画 ──
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

    // ── 平滑滚动（补偿导航栏高度） ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
});
