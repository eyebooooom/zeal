console.log('脚本已加载');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM已加载完成');

    const loadingContainer = document.querySelector('.loading-container');
    const navContainer = document.querySelector('.nav-container');
    const mainContent = document.querySelector('.main-content');
    const footer = document.querySelector('.footer');
    
    // 初始化页脚样式
    footer.style.visibility = 'hidden';
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(100%)';

    // 检查是否需要显示加载动画
    const shouldShowLoading = !sessionStorage.getItem('hasVisited') && 
                            !new URLSearchParams(window.location.search).has('skipLoading');
    
    if (!shouldShowLoading) {
        // 直接显示内容，跳过加载动画
        if (loadingContainer) {
            loadingContainer.style.display = 'none';
            mainContent.classList.add('show');
            navContainer.classList.add('visible');
            document.body.style.overflow = '';
        } else {
            console.error('未找到 loadingContainer 元素');
        }
    } else {
        // 禁用滚动
        document.body.style.overflow = 'hidden';

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
                    document.body.style.overflow = '';
                    loadingContainer.classList.add('transition');
                    loadingContainer.remove(); // 动画完成后移除
                }, { once: true });
            }
        }

        setTimeout(updateProgress, 500);
    }

    // 初始化筛选标签功能
    initFilterTags();
    
    // 初始化其他功能
    try {
        initWorkScroll();
    } catch (error) {
        console.log('初始化滚动功能时出错:', error);
    }

    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
    });

    // 点击菜单项后关闭菜单
    const menuItems = document.querySelectorAll('.mobile-menu-items a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });
});

// 筛选标签功能
function initFilterTags() {
    const tags = document.querySelectorAll('.filter-tags .tag');
    const workItems = document.querySelectorAll('.work-item');

    console.log('找到的标签数量:', tags.length);
    console.log('找到的作品数量:', workItems.length);

    if (tags.length === 0 || workItems.length === 0) {
        console.log('未找到标签或作品元素');
        return;
    }

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            console.log('标签被点击:', tag.textContent.trim());

            // 移除所有标签的active类
            tags.forEach(t => {
                t.classList.remove('active');
                t.classList.add('inactive');
            });

            // 给当前点击的标签添加active类
            tag.classList.add('active');
            tag.classList.remove('inactive');

            const selectedCategory = tag.textContent.trim();
            console.log('选中的类别:', selectedCategory);

            // 筛选作品
            workItems.forEach(item => {
                const itemTag = item.querySelector('.showcase-tag');
                if (!itemTag) {
                    console.log('作品标签元素未找到');
                    return;
                }

                const itemTagText = itemTag.textContent.trim();
                console.log('作品标签:', itemTagText);
                
                if (selectedCategory === 'All') {
                    item.style.display = 'flex';
                    console.log('显示所有作品');
                } else if (itemTagText === selectedCategory) {
                    item.style.display = 'flex';
                    console.log('显示匹配作品:', itemTagText);
                } else {
                    item.style.display = 'none';
                    console.log('隐藏不匹配作品:', itemTagText);
                }
            });
        });
    });
}

// 页脚和卡片功能
function initWorkScroll() {
    const works = document.querySelectorAll('.index-work-item');
    const wrappers = document.querySelectorAll('.work-wrapper');
    const footer = document.querySelector('.footer');
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
    


    // 确保页面初始位置时页脚不显示
    if (window.scrollY === 0) {
        footer.style.visibility = 'hidden';
        footer.style.opacity = '0';
        footer.style.transform = 'translateY(100%)';
    }

    function updateWorks() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
    // 卡片激活逻辑
    works.forEach((work, index) => {
        const trigger = index * window.innerHeight;
        
        if (scrollTop > trigger) {
            // 向下滚动时显示
            work.classList.add('active');
            work.classList.remove('up');
            wrappers[index].style.visibility = 'visible';
            currentActiveIndex = index;
        } else if (scrollTop <= trigger  && work.classList.contains('active')) {
            // 向上滚动时
            work.classList.remove('active');
            work.classList.add('up');
            // 移除延时，直接设置visibility
            wrappers[index].style.visibility = 'visible'; // 改为visible以保持动画可见
              // 设置一个延时来隐藏wrapper，让动画有时间执行
              setTimeout(() => {
                wrappers[index].style.visibility = 'hidden';
            }, 1500); // 与CSS过渡时间相匹配
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
            
            console.log('显示页脚');
        } else {
            footer.style.visibility = 'hidden';
            footer.style.opacity = '0';
            footer.style.transform = 'translateY(100%)';
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

