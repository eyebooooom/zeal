console.log('脚本已加载');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM已加载完成');

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


document.addEventListener('DOMContentLoaded', function() {
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