// custom cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        cursorDot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
        cursorOutline.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
    });
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.style.transform += ' scale(1.5)');
        el.addEventListener('mouseleave', () => cursorOutline.style.transform = cursorOutline.style.transform.replace(' scale(1.5)', ''));
    });
}

// theme toggle
const themeSwitch = document.getElementById('theme-switch');
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    themeSwitch.innerHTML = document.body.classList.contains('dark') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// mobile menu
document.querySelector('.hamburger')?.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(l => l.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('active');
}));

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ---------- PROJECTS (with custom images, no alrounder) ----------
const projects = [
    { name: 'Calculator', type: 'app', folder: 'calculator', img: 'assets/images/portfolio-03.jpg' },
    { name: 'Clock', type: 'app', folder: 'clock', img: 'assets/images/portfolio-06.jpg' },
    { name: 'Dashboard', type: 'web', folder: 'dash board', img: 'assets/images/portfolio-05.png' },
    { name: 'KiKenya', type: 'web', folder: 'kikenya', img: 'assets/images/portfolio-02.jpg' },
    { name: 'Vintage Master', type: 'design', folder: 'Vintage-master', img: 'assets/images/portfolio-01.png' },
    { name: 'Bootstrap Template', type: 'web', folder: 'bootstrap templete', img: 'assets/images/portfolio-03.jpg' }
];

function getProjectUrl(folder) {
    return `works done/${encodeURIComponent(folder)}/index.html`;
}

const projectsContainer = document.getElementById('projects-container');
function renderProjects(filter = 'all') {
    const filtered = filter === 'all' ? projects : projects.filter(p => p.type === filter);
    if (filtered.length === 0) {
        projectsContainer.innerHTML = '<p style="text-align:center;">No projects in this category.</p>';
        return;
    }
    projectsContainer.innerHTML = filtered.map(p => `
        <div class="project-card">
            <div class="project-img">
                <img src="${p.img}" alt="${p.name}" onerror="this.onerror=null; this.parentElement.style.background='linear-gradient(135deg, #dc2626, #2e7d32)'; this.parentElement.innerHTML='<i class=\\'fas fa-cube\\' style=\\'font-size:3rem; color:white;\\'></i>'">
            </div>
            <div class="project-info">
                <h3>${p.name}</h3>
                <p>Interactive ${p.type} project.</p>
                <span class="project-tag">${p.type}</span>
                <div style="margin-top:1rem">
                    <a href="${getProjectUrl(p.folder)}" target="_blank" class="btn btn-outline" style="padding:0.25rem 1rem">Live →</a>
                </div>
            </div>
        </div>
    `).join('');
}

renderProjects();

// filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter);
    });
});

// recent work (external sites)
const recent = [
    { name: 'Judith Blessings Salon', url: 'https://judithblessingssalon.co.ke', img: 'assets/images/logo.jpg'},
    { name: 'Maureen Hair Salon', url: 'https://maureenhairsalon.co.ke', img: 'assets/images/Stitch-Braids.jpg'},
    { name: 'Andologi Deo Youth', url: 'https://andologideonyouth.org', img: 'assets/images/we.jpg'}
];
const recentContainer = document.getElementById('recent-projects-container');
if (recentContainer) {
    recentContainer.innerHTML = recent.map(r => `
        <div class="project-card">
            <div class="project-img"><img src="${r.img}" alt="${r.name}"></div>
            <div class="project-info">
                <h3>${r.name}</h3>
                <p>Live client website.</p>
                <span class="project-tag">production</span>
                <div style="margin-top:1rem"><a href="${r.url}" target="_blank" class="btn btn-outline">Visit →</a></div>
            </div>
        </div>
    `).join('');
}

// animated counters
let counted = false;
const aboutSection = document.querySelector('.about');
const counters = [
    { id: 'projects-count', target: 10 },
    { id: 'tech-count', target: 4 },
    { id: 'satisfaction-count', target: 100 }
];
function startCounters() {
    if (counted) return;
    counted = true;
    counters.forEach(c => {
        let current = 0;
        const el = document.getElementById(c.id);
        const step = Math.ceil(c.target / 50);
        const interval = setInterval(() => {
            current += step;
            if (current >= c.target) {
                el.innerText = c.target;
                clearInterval(interval);
            } else el.innerText = current;
        }, 20);
    });
}
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) startCounters();
}, { threshold: 0.5 });
if (aboutSection) observer.observe(aboutSection);

// contact form
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fb = document.getElementById('form-feedback');
    fb.style.display = 'block';
    fb.innerText = '✨ Thanks! I’ll reply within 24h.';
    fb.style.color = 'var(--accent)';
    e.target.reset();
    setTimeout(() => fb.style.display = 'none', 5000);
});

// external links security
document.querySelectorAll('a[target="_blank"]').forEach(l => l.setAttribute('rel', 'noopener noreferrer'));