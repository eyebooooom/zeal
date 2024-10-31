document.addEventListener('DOMContentLoaded', function() {
    const loadingContainer = document.querySelector('.loading-container');
    const progressElement = document.querySelector('._75');
    let progress = 0;
    
    function updateProgress() {
        if (progress < 100) {
            progress++;
            progressElement.textContent = `${progress}%`;
            
            const delay = Math.random() * 50 + 20;
            setTimeout(updateProgress, delay);
        } else {
            // 加载完成后直接开始圆形扩展
            setTimeout(() => {
                loadingContainer.classList.add('transition');
                
                // 监听动画结束事件，动画完成后立即移除加载容器
                loadingContainer.addEventListener('animationend', () => {
                    loadingContainer.remove();
                });
            }, 200);
        }
    }

    setTimeout(updateProgress, 500);
});
