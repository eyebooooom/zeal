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
    const triggerStart = 0;
    let ticking = false;
    let currentActiveIndex = -1;

    // 初始化页脚样式
    footer.style.position = 'fixed';
    footer.style.bottom = '0';
    footer.style.left = '0';
    footer.style.width = '100%';
    footer.style.transition = 'transform 1s ease, visibility 1s ease, opacity 1s ease';
    footer.style.transform = 'translateY(100%)';
    footer.style.visibility = 'hidden';
    footer.style.opacity = '0';
    footer.style.zIndex = '6';
    
    // 初始化"查看全部"按钮样式
    seeAllBtn.style.position = 'fixed';
    seeAllBtn.style.bottom = '20px';
    seeAllBtn.style.left = '50%';
    seeAllBtn.style.transform = 'translateX(-50%) translateY(100%)';
    seeAllBtn.style.transition = 'transform 1s ease, visibility 1s ease';
    seeAllBtn.style.visibility = 'hidden';
    seeAllBtn.style.zIndex = '7';

    // 确保页面初始位置时页脚不显示
    if (window.scrollY === 0) {
        footer.style.visibility = 'hidden';
        footer.style.opacity = '0';
        footer.style.transform = 'translateY(100%)';
        seeAllBtn.style.visibility = 'hidden';
        seeAllBtn.style.transform = 'translateY(100%)';
    }

    function updateWorks() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // 先处理所有作品卡片
        works.forEach((work, index) => {
            const trigger = index * window.innerHeight;
            
            console.log(`作品 ${index} 触发点:`, trigger);
            
            if (scrollTop > trigger) {
                work.classList.add('active');
                wrappers[index].style.visibility = 'visible';
                currentActiveIndex = index;
                
                console.log(`激活作品 ${index}`);
            } else {
                work.classList.remove('active');
                wrappers[index].style.visibility = 'hidden';
            }
        });

        // 将页脚作为最后一张卡片处理
        const footerTrigger = works.length * window.innerHeight;
        console.log('页脚触发点:', footerTrigger);
        console.log('当前滚动位置:', scrollTop);
        
        if (scrollTop >= footerTrigger) {
            footer.style.visibility = 'visible';
            footer.style.opacity = '1';
            footer.style.transform = 'translateY(0)';
            seeAllBtn.style.visibility = 'visible';
            seeAllBtn.style.transform = 'translateY(0)';
            
            console.log('显示页脚');
        } else {
            footer.style.visibility = 'hidden';
            footer.style.opacity = '0';
            footer.style.transform = 'translateY(100%)';
            seeAllBtn.style.visibility = 'hidden';
            seeAllBtn.style.transform = 'translateY(100%)';
        }
    }

    // 计算总高度（作品数量 + 页脚）
    const totalHeight = (works.length + 1) * window.innerHeight;
    document.body.style.height = `${totalHeight}px`;
    console.log('设置的总高度:', totalHeight);
    console.log('作品数量:', works.length);

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
    
    // 初始调用一次更新
    updateWorks();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initWorkScroll);
