let systemThemeListener = null;

// Check system theme and apply on load
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme(systemDark ? 'dark' : 'light');
        addSystemThemeListener();
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
    removeSystemThemeListener();
}

// Listen for system theme changes
function addSystemThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    systemThemeListener = function(e) {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    };
    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', systemThemeListener);
    } else if (mediaQuery.addListener) {
        mediaQuery.addListener(systemThemeListener);
    }
}

function removeSystemThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (!systemThemeListener) return;
    if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', systemThemeListener);
    } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(systemThemeListener);
    }
    systemThemeListener = null;
}


window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', initTheme);