// CodeVerse - Developer Analytics Page Logic

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        evaluateCodingAchievements();
        renderDevDashboard();
        setupCacheReset();
    }, 50);
});

/**
 * Render developer profile charts and achievements
 */
function renderDevDashboard() {
    // 1. Core counters
    const streak = devState.streak || 0;
    document.getElementById('streak-days-display').textContent = `${streak} Day${streak !== 1 ? 's' : ''}`;

    const totalRead = devState.completedTopics ? devState.completedTopics.length : 0;
    document.getElementById('topics-read-display').textContent = `${totalRead} Topic${totalRead !== 1 ? 's' : ''}`;

    const masteredCount = devState.masteredFlashcards ? devState.masteredFlashcards.length : 0;
    const cardsDisplay = document.getElementById('flashcards-mastered-display');
    if (cardsDisplay) {
        cardsDisplay.textContent = `${masteredCount} Card${masteredCount !== 1 ? 's' : ''}`;
    }

    // 2. SVG Circular gauges
    const tracksList = ['python', 'javascript', 'cpp', 'dsa'];
    const trackShorthands = { python: 'py', javascript: 'js', cpp: 'cpp', dsa: 'dsa' };
    const trackTotals = { python: 3, javascript: 3, cpp: 3, dsa: 3 };

    tracksList.forEach(t => {
        const completedCount = devState.completedTopics.filter(id => id.startsWith(trackShorthands[t])).length;
        const total = trackTotals[t];
        const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

        // Text
        document.getElementById(`gauge-val-${t}`).textContent = `${pct}%`;

        // SVG circle dashoffset (Radius = 40. Circumference = 2 * PI * 40 = ~251)
        const fillCircle = document.getElementById(`gauge-fill-${t}`);
        if (fillCircle) {
            const offset = 251 - (251 * pct) / 100;
            fillCircle.style.strokeDashoffset = offset;
        }
    });

    // 3. SVG Column Chart Quiz Averages
    tracksList.forEach(t => {
        const scores = devState.quizScores[t];
        const barFill = document.getElementById(`chart-bar-${t}`);
        const barVal = document.getElementById(`chart-val-${t}`);

        if (scores && scores.length > 0) {
            const sum = scores.reduce((a, b) => a + b, 0);
            const avg = Math.round(sum / scores.length);

            if (barFill) barFill.style.height = `${avg}%`;
            if (barVal) barVal.textContent = `${avg}%`;
        } else {
            if (barFill) barFill.style.height = '0%';
            if (barVal) barVal.textContent = '--';
        }
    });

    // 4. Render achievement badge icons
    const devBadges = ['first_compile', 'code_compiled', 'python_hacker', 'javascript_hacker', 'cpp_hacker', 'dsa_hacker', 'perfect_compile', 'quiz_dev', 'flashcard_novice', 'flashcard_expert'];
    
    devBadges.forEach(id => {
        const element = document.getElementById(`badge-${id}`);
        if (!element) return;

        const isUnlocked = devState.badges.includes(id);
        if (isUnlocked) {
            element.className = element.className.replace('locked', 'unlocked');
        } else {
            element.className = element.className.replace('unlocked', 'locked');
        }
    });
}

/**
 * Scan state parameters to unlock achievements
 */
function evaluateCodingAchievements() {
    let stateChanged = false;

    // First compile
    if (devState.completedTopics.length >= 1 && !devState.badges.includes('first_compile')) {
        devState.badges.push('first_compile');
        stateChanged = true;
    }

    // Code compiled
    if (devState.completedTopics.length >= 5 && !devState.badges.includes('code_compiled')) {
        devState.badges.push('code_compiled');
        stateChanged = true;
    }

    // Python track
    const pyComp = devState.completedTopics.filter(id => id.startsWith('py')).length;
    if (pyComp === 3 && !devState.badges.includes('python_hacker')) {
        devState.badges.push('python_hacker');
        stateChanged = true;
    }

    // JS track
    const jsComp = devState.completedTopics.filter(id => id.startsWith('js')).length;
    if (jsComp === 3 && !devState.badges.includes('javascript_hacker')) {
        devState.badges.push('javascript_hacker');
        stateChanged = true;
    }

    // C++ track
    const cppComp = devState.completedTopics.filter(id => id.startsWith('cpp')).length;
    if (cppComp === 3 && !devState.badges.includes('cpp_hacker')) {
        devState.badges.push('cpp_hacker');
        stateChanged = true;
    }

    // DSA track
    const dsaComp = devState.completedTopics.filter(id => id.startsWith('dsa')).length;
    if (dsaComp === 3 && !devState.badges.includes('dsa_hacker')) {
        devState.badges.push('dsa_hacker');
        stateChanged = true;
    }

    // Code debugger
    let totalQuizzes = 0;
    Object.values(devState.quizScores).forEach(l => {
        totalQuizzes += l.length;
    });
    if (totalQuizzes >= 3 && !devState.badges.includes('quiz_dev')) {
        devState.badges.push('quiz_dev');
        stateChanged = true;
    }

    // Flashcard Scholar & Master
    const masteredCount = devState.masteredFlashcards ? devState.masteredFlashcards.length : 0;
    if (masteredCount >= 10 && !devState.badges.includes('flashcard_novice')) {
        devState.badges.push('flashcard_novice');
        stateChanged = true;
    }
    if (masteredCount >= 30 && !devState.badges.includes('flashcard_expert')) {
        devState.badges.push('flashcard_expert');
        stateChanged = true;
    }

    if (stateChanged) {
        saveDevState();
    }
}

/**
 * Configure reset listener
 */
function setupCacheReset() {
    const btn = document.getElementById('btn-reset-data');
    if (btn) {
        btn.addEventListener('click', () => {
            const confirmReset = confirm('⚠️ DEV PROTOCOL: Are you sure you want to clear your local compiler state logs, streaks, and quiz averages? This action cannot be undone.');
            if (confirmReset) {
                resetDevProgress();
            }
        });
    }
}
