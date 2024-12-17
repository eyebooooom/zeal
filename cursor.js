// 创建自定义鼠标元素
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

// 隐藏默认鼠标
document.body.style.cursor = 'none';

// 更新鼠标位置
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// 添加hover效果
const clickableElements = document.querySelectorAll('a, button, .explore-button, .work-item, .filter-tags');
clickableElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursor.classList.add('hover-clickable');
    });

    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursor.classList.remove('hover-clickable');
    });
}); 