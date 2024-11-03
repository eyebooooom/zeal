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
    const progressElement = document.querySelector('._75');
    let progress = 0;
    
    function updateProgress() {
        if (progress < 100) {
            progress++;
            progressElement.textContent = `${progress}%`;
            
            const delay = Math.random() * 50 + 20;
            setTimeout(updateProgress, delay);
        } else {
            // 立即显示 main-content
            const mainContent = document.querySelector('.main-content');
            mainContent.classList.add('show');
            
            // 在 main-content 动画结束后显示 nav-container
            mainContent.addEventListener('transitionend', () => {
                // 显示导航栏
                navContainer.classList.add('visible');
                
                // 移除加载容器
                loadingContainer.classList.add('transition');
                loadingContainer.addEventListener('animationend', () => {
                    loadingContainer.remove();
                });
            }, { once: true });
        }
    }

    setTimeout(updateProgress, 500);
});
