// Check system theme and apply on load
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (systemDark) {
        applyTheme('dark');
    }
}

// Apply theme
function applyTheme(theme) {
    const body = document.body;
    const btn = document.getElementById('themeBtn');

    if (theme === 'dark') {
        body.classList.add('dark');
        btn.innerHTML = '<i class="fas fa-cloud-moon"></i>';
    } else {
        body.classList.remove('dark');
        btn.innerHTML = '<i class="fas fa-cloud-sun"></i>';
    }
}

// Toggle theme
function toggleTheme() {
    const isDark = document.body.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';

    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', initTheme);