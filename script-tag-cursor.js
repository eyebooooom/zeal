console.log('脚本已加载');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM已加载完成');
    
    // 创建自定义鼠标元素
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    // 更新鼠标位置
    document.addEventListener('mousemove', (e) => {
        const cursor = document.querySelector('.cursor');
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

    // 初始化筛选标签功能
    initFilterTags();
    
    // 初始化其他功能
    try {
        initWorkScroll();
    } catch (error) {
        console.log('初始化滚动功能时出错:', error);
    }
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
