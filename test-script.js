// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger);

// 初始化 Locomotive Scroll
const locoScroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 0.9, // 控制滚动速度，值越小滚动越慢
    lerp: 0.08,      // 控制平滑度，值越小越平滑
    direction: 'vertical',
    smartphone: { smooth: true },
    tablet: { smooth: true }
});

// ScrollTrigger 代理设置
ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    scrollTop(value) {
        // 处理滚动位置
        return arguments.length 
            ? locoScroll.scrollTo(value, {duration: 0}) 
            : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        // 返回滚动容器的尺寸
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
});

// 为每个section创建动画
gsap.utils.toArray('.section').forEach((section, i) => {
    const workItem = section.querySelector('.work-item');
    const img = section.querySelector('img');
    const info = section.querySelector('.work-info');
    
    // 跳过首屏文字部分
    if (section.classList.contains('intro-section')) {
        // 首屏文字动画
        const introText = section.querySelector('.intro-text h1');
        gsap.to(introText, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            delay: 0.5
        });
        return;
    }
    
    // 作品页面的动画
    if (workItem) {
        // 设置初始状态
        gsap.set(workItem, { 
            width: '80%', 
            opacity: 0.5 
        });
        gsap.set(info, { 
            opacity: 0 
        });

        // 创建滚动触发器
        ScrollTrigger.create({
            trigger: section,
            scroller: "[data-scroll-container]",
            start: "top center",
            end: "bottom center",
            scrub: 1,
            markers: true,
            
            onEnter: () => {
                gsap.to(workItem, {
                    width: '100%',
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out"
                });
                gsap.to(info, {
                    opacity: 1,
                    duration: 0.5,
                    delay: 0.2
                });
            },
            
            onLeave: () => {
                gsap.to(workItem, {
                    width: '80%',
                    opacity: 0.5,
                    duration: 1,
                    ease: "power2.inOut"
                });
                gsap.to(info, {
                    opacity: 0,
                    duration: 0.3
                });
            },
            
            onEnterBack: () => {
                gsap.to(workItem, {
                    width: '100%',
                    opacity: 1,
                    duration: 0.2,
                    ease: "power4.out"
                });
                gsap.to(info, {
                    opacity: 1,
                    duration: 0.5,
                    delay: 0.2
                });
            },
            
            onLeaveBack: () => {
                gsap.to(workItem, {
                    width: '80%',
                    opacity: 0.5,
                    duration: 0.2,
                    ease: "power4.inOut"
                });
                gsap.to(info, {
                    opacity: 0,
                    duration: 0.3
                });
            }
        });
    }
});

// 设置滚动吸附
ScrollTrigger.create({
    scroller: "[data-scroll-container]",
    snap: {
        snapTo: 1 / (document.querySelectorAll('.section').length - 1),
        duration: 0.1,    // 较快的吸附
        delay: 0.05,      // 很小的延迟
        ease: "power1.inOut", // 更强的缓动
        inertia: true,   // 禁用惯性
        momentum: 0.2     // 需要较大力度
    }
});

// 更新 ScrollTrigger
locoScroll.on("scroll", ScrollTrigger.update);

// 监听窗口大小变化
window.addEventListener('resize', () => {
    locoScroll.update();
    ScrollTrigger.refresh();
});

// 页面加载完成后刷新
window.addEventListener('load', () => {
    locoScroll.update();
    ScrollTrigger.refresh();
}); 