document.addEventListener('DOMContentLoaded', function() {
    // 创建自定义鼠标元素
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    // 更新鼠标位置
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // 添加hover效果
    const clickableElements = document.querySelectorAll('a, button, .explore-button, .work-item');
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            // 检查是否是文字或按钮元素
            if (element.tagName === 'A' || element.tagName === 'BUTTON') {
                cursor.classList.add('hover-clickable');
            }
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursor.classList.remove('hover-clickable');
        });
    });

    const loadingContainer = document.querySelector('.loading-container');
    const navContainer = document.querySelector('.nav-container');
    const mainContent = document.querySelector('.main-content');
    
    // 检查是否需要显示加载动画
    const shouldShowLoading = !sessionStorage.getItem('hasVisited') && 
                            !new URLSearchParams(window.location.search).has('skipLoading');

    if (!shouldShowLoading) {
        // 直接显示内容，跳过加载动画
        loadingContainer.style.display = 'none';
        mainContent.classList.add('show');
        navContainer.classList.add('visible');
    } else {
        // 设置访问标记
        sessionStorage.setItem('hasVisited', 'true');
        
        // 执行原有的加载动画逻辑
        const progressElement = document.querySelector('._75');
        let progress = 0;
        
        function updateProgress() {
            if (progress < 100) {
                progress++;
                progressElement.textContent = `${progress}%`;
                
                const delay = Math.random() * 50 + 20;
                setTimeout(updateProgress, delay);
            } else {
                mainContent.classList.add('show');
                
                mainContent.addEventListener('transitionend', () => {
                    navContainer.classList.add('visible');
                    
                    loadingContainer.classList.add('transition');
                    loadingContainer.addEventListener('animationend', () => {
                        loadingContainer.remove();
                    });
                }, { once: true });
            }
        }

        setTimeout(updateProgress, 500);
    }
});

function initWorkScroll() {
    const works = document.querySelectorAll('.index-work-item');
    const wrappers = document.querySelectorAll('.work-wrapper');
    const footer = document.querySelector('.footer');
    const seeAllBtn = document.querySelector('.see-all-btn');
    const triggerStart = window.innerHeight;
    let ticking = false; // 用于requestAnimationFrame节流

    function updateWorks() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        works.forEach((work, index) => {
            const trigger = triggerStart + (index * window.innerHeight * 0.8);// 作品触发点
            
            // 最后一个work的特殊处理
            if (index === works.length - 1) {
                const lastWorkTrigger = trigger + window.innerHeight;
                
                // 当滚动超过最后一个work时
                if (scrollTop > lastWorkTrigger) {
                    work.style.position = 'absolute';
                    work.style.top = `${lastWorkTrigger}px`;
                } else {
                    work.style.position = 'fixed';
                    work.style.top = '0';
                }
            }
            
            if (scrollTop > trigger) {
                work.classList.add('active');
                wrappers[index].style.visibility = 'visible';
            } else {
                work.classList.remove('active');
                wrappers[index].style.visibility = 'hidden';
            }
        });
    }

    // 优化的滚动事件处理
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateWorks();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    updateWorks();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initWorkScroll);
