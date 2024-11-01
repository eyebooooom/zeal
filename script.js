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
            setTimeout(() => {
                loadingContainer.classList.add('transition');
                
                loadingContainer.addEventListener('animationend', () => {
                    loadingContainer.remove();
                    // 加载动画结束后显示导航栏
                    navContainer.style.visibility = 'visible';
                    navContainer.style.opacity = '1';
                    navContainer.style.transform = 'translateY(0)';
                });
            }, 200);
        }
    }

    setTimeout(updateProgress, 500);
});
