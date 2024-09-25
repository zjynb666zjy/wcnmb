document.addEventListener('DOMContentLoaded', () => {
    // 初始化粒子背景
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#00ffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#00ffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // 初始化音效
    const sounds = {
        click: new Howl({ src: ['https://assets.codepen.io/385126/click.mp3'] }),
        button: new Howl({ src: ['https://assets.codepen.io/385126/button.mp3'] }),
        hover: new Howl({ src: ['https://assets.codepen.io/385126/hover.mp3'] }),
        send: new Howl({ src: ['https://assets.codepen.io/385126/send.mp3'] }),
        receive: new Howl({ src: ['https://assets.codepen.io/385126/receive.mp3'] })
    };

    function playSound(soundType) {
        sounds[soundType].play();
    }

    // 滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // 技能条动画
    document.querySelectorAll('.skill .fill').forEach(fill => {
        const width = fill.getAttribute('data-width');
        setTimeout(() => {
            fill.style.width = width;
        }, 500);
    });

    // 全息聊天效果
    const chatMessages = document.querySelector('.messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    sendBtn.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            userInput.value = '';
            playSound('send');
            setTimeout(() => {
                addMessage('ai', '这是一个AI响应示例。');
                playSound('receive');
            }, 1000);
        }
    });

    function addMessage(sender, text) {
        const messageElem = document.createElement('div');
        messageElem.classList.add('message', sender);
        messageElem.textContent = text;
        chatMessages.appendChild(messageElem);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 添加导航平滑滚动
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
            playSound('click');
        });
    });

    // 添加"开始探索"按钮效果
    const exploreBtn = document.getElementById('explore-btn');
    exploreBtn.addEventListener('click', () => {
        document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        playSound('button');
    });

    // 项目轮播功能
    const projectItems = document.querySelectorAll('.project-item');
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');
    let currentProject = 0;

    function showProject(index) {
        projectItems.forEach((item, i) => {
            item.style.display = i === index ? 'block' : 'none';
        });
    }

    prevBtn.addEventListener('click', () => {
        currentProject = (currentProject - 1 + projectItems.length) % projectItems.length;
        showProject(currentProject);
        playSound('button');
    });

    nextBtn.addEventListener('click', () => {
        currentProject = (currentProject + 1) % projectItems.length;
        showProject(currentProject);
        playSound('button');
    });

    showProject(currentProject);

    // 社交媒体图标点击效果
    document.querySelectorAll('.social-icons .icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            alert(`你点击了 ${icon.id} 图标。这里可以添加链接到你的社交媒体页面。`);
            playSound('click');
        });
    });

    // 为按钮添加点击音效
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => playSound('button'));
    });

    // 为卡片添加悬停音效
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => playSound('hover'));
    });
});