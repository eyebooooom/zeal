document.addEventListener('DOMContentLoaded', function() {
    const progressElement = document.querySelector('._75');
    let progress = 0;
    
    // 模拟加载进度
    function updateProgress() {
        if (progress < 100) {
            progress++;
            progressElement.textContent = `${progress}%`;
            
            // 控制加载速度
            const delay = Math.random() * 50 + 20; // 20-70ms的随机延迟
            setTimeout(updateProgress, delay);
        } else {
            // 加载完成后的操作
            document.querySelector('.loading-dot').style.display = 'none';
            // 这里可以添加加载完成后的跳转或其他操作
        }
    }

    // 启动进度更新
    setTimeout(updateProgress, 500); // 延迟500ms开始加载
});
