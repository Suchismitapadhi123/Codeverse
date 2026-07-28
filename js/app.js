// CodeVerse - Developer State Manager & Common Utilities

// Fallback local and session storage manager for file:// and browser security blocks
const safeStorage = {
    _localCache: {},
    getLocal(key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            return this._localCache[key] || null;
        }
    },
    setLocal(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            this._localCache[key] = value;
        }
    },
    removeLocal(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            delete this._localCache[key];
        }
    },
    getSession(key) {
        try {
            return sessionStorage.getItem(key) || window.name;
        } catch (e) {
            return window.name;
        }
    },
    setSession(key, value) {
        try {
            sessionStorage.setItem(key, value);
        } catch (e) {}
        window.name = value;
    },
    removeSession(key) {
        try {
            sessionStorage.removeItem(key);
        } catch (e) {}
        window.name = '';
    }
};
window.safeStorage = safeStorage;

document.addEventListener('DOMContentLoaded', () => {
    initDevPortal();
});

// Default Developer State Structure
const DEFAULT_DEV_STATE = {
    completedTopics: [], // e.g., ["py-decorators", "js-promises"]
    quizScores: {},       // e.g., { "python": [100], "javascript": [80] }
    codingTime: 0,
    badges: [],           // list of unlocked developer achievement IDs
    streak: 0,
    lastActiveDate: null
};

// Global Dev State Object
let devState = { ...DEFAULT_DEV_STATE };

/**
 * Initialize application state and global UI bindings
 */
function initDevPortal() {
    checkUserSession();
    loadDevState();
    checkDevStreak();
    setupMobileMenu();
    updateNavbarStreak();
    setupLogoutListener();
    updateUsernameDisplays();
}

/**
 * Load developer state from localStorage
 */
function loadDevState() {
    const saved = safeStorage.getLocal('codeverse_state');
    if (saved) {
        try {
            devState = JSON.parse(saved);
            devState = { ...DEFAULT_DEV_STATE, ...devState };
        } catch (e) {
            devState = { ...DEFAULT_DEV_STATE };
        }
    } else {
        devState = { ...DEFAULT_DEV_STATE };
        saveDevState();
    }
}

/**
 * Save current state back to localStorage
 */
function saveDevState() {
    safeStorage.setLocal('codeverse_state', JSON.stringify(devState));
}

/**
 * Reset all developer progress (restart stats)
 */
function resetDevProgress() {
    devState = { ...DEFAULT_DEV_STATE };
    saveDevState();
    window.location.reload();
}

/**
 * Check and calculate consecutive days of coding activity
 */
function checkDevStreak() {
    if (!devState.lastActiveDate) return;

    const today = new Date().toDateString();
    const lastActive = new Date(devState.lastActiveDate).toDateString();

    if (today === lastActive) {
        return; // Active today, maintain streak
    }

    const todayDate = new Date();
    const lastActiveDate = new Date(devState.lastActiveDate);
    const diffTime = Math.abs(todayDate - lastActiveDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
        // Streak expired
        devState.streak = 0;
        saveDevState();
    }
}

/**
 * Update activity date and increment streak if consecutive day
 */
function recordActivity() {
    const today = new Date().toDateString();
    const lastActive = devState.lastActiveDate ? new Date(devState.lastActiveDate).toDateString() : null;

    if (today !== lastActive) {
        devState.streak += 1;
        devState.lastActiveDate = new Date().toISOString();
        saveDevState();
        
        showDevToast(`⚡ Streak Logged: Day ${devState.streak}! Protocol active.`, 'info');
        updateNavbarStreak();
    }
}

/**
 * Update the navigation bar commits indicator
 */
function updateNavbarStreak() {
    const streakVal = document.querySelector('.nav-streak-value');
    if (streakVal) {
        streakVal.textContent = `${devState.streak} Day${devState.streak !== 1 ? 's' : ''}`;
    }
}

/**
 * Mobile responsive menu logic
 */
function setupMobileMenu() {
    const toggleBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }
}

/**
 * Show a floating cyberpunk code notification toast
 * @param {string} message 
 * @param {string} type - 'success', 'info', 'error'
 */
function showDevToast(message, type = 'info') {
    let container = document.getElementById('dev-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'dev-toast-container';
        container.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 12px;
            pointer-events: none;
            font-family: 'Fira Code', monospace;
        `;
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'terminal-panel';
    
    let accentColor = 'var(--color-teal)';
    let prefix = '[SYSTEM]';
    
    if (type === 'success') {
        accentColor = 'var(--color-green)';
        prefix = '[SUCCESS]';
    } else if (type === 'error') {
        accentColor = 'var(--color-crimson)';
        prefix = '[FATAL]';
    }

    toast.style.cssText = `
        padding: 0.9rem 1.4rem;
        border-radius: 6px;
        background: var(--bg-card);
        color: var(--text-primary);
        font-size: 0.85rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        border: 1px solid var(--border-neon);
        border-left: 4px solid ${accentColor};
        transform: translateY(50px);
        opacity: 0;
        transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.35s ease;
        pointer-events: auto;
    `;

    toast.innerHTML = `
        <span style="color: ${accentColor}; font-weight: 700;">${prefix}</span>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 50);

    // Dismiss
    setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 350);
    }, 4500);
}

/**
 * Check if a badge can be unlocked
 * @param {string} badgeId 
 * @param {string} badgeName 
 */
function unlockDevBadge(badgeId, badgeName) {
    if (!devState.badges.includes(badgeId)) {
        devState.badges.push(badgeId);
        saveDevState();
        showDevToast(`🏆 Achievement Unlocked: ${badgeName}! Codebase logs updated.`, 'success');
        
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 60,
                spread: 70,
                origin: { y: 0.8 },
                colors: ['#00f2fe', '#00ff87', '#9d4edd']
            });
        }
    }
}

/**
 * Verifies if user session is established. Redirects to login.html if unauthenticated.
 */
function checkUserSession() {
    const currentUser = safeStorage.getSession('codeverse_current_user');
    const isLoginPage = window.location.pathname.endsWith('login.html');

    if (!currentUser && !isLoginPage) {
        window.location.href = 'login.html';
    } else if (currentUser && isLoginPage) {
        window.location.href = 'index.html';
    }
}

/**
 * Binds click handler for the global logout navigation menu link
 */
function setupLogoutListener() {
    const logoutBtn = document.getElementById('btn-logout-session');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            safeStorage.removeSession('codeverse_current_user');
            showDevToast('🔒 Session closed. Terminating terminal login...', 'info');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        });
    }
}

/**
 * Updates dynamic user handle strings across layouts
 */
function updateUsernameDisplays() {
    const currentUser = safeStorage.getSession('codeverse_current_user') || 'guest';
    
    // Update home screen prompt text if it exists
    const usernamePrompt = document.getElementById('username-prompt');
    if (usernamePrompt) {
        usernamePrompt.textContent = currentUser;
    }
}
