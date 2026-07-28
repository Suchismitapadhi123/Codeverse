// CodeVerse - Code Quiz Portal Logic

// Quiz Database containing code prediction items
// State variables
let activeTrack = 'python';
let activeComplexity = 'easy';
let selectedQuestions = [];
let currentQIdx = 0;
let score = 0;
let quizTimeLeft = 15;
let quizTimerId = null;
const QUESTION_TIMER_LIMIT = 15;

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('btn-start-quiz');
    if (startBtn) {
        startBtn.addEventListener('click', startDevQuiz);
    }

    const retryBtn = document.getElementById('btn-retry-quiz');
    if (retryBtn) {
        retryBtn.addEventListener('click', resetQuizState);
    }
});

/**
 * Configure and start quiz drawing from external 100-question pool
 */
function startDevQuiz() {
    activeTrack = document.getElementById('select-track').value;
    activeComplexity = document.getElementById('select-complexity').value;

    const pool = DOUBT_QUESTIONS_DB[activeTrack];
    if (!pool || pool.length === 0) {
        showDevToast('Could not compile question threads.', 'error');
        return;
    }

    // Select 10 random questions from the 100-question pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    selectedQuestions = shuffled.slice(0, 10);
    
    // Reset trackers
    currentQIdx = 0;
    score = 0;

    // Swap panels
    document.getElementById('panel-setup').style.display = 'none';
    document.getElementById('panel-quiz').style.display = 'block';
    document.getElementById('panel-results').style.display = 'none';

    loadNextQuestion();
}

/**
 * Load index question parameters
 */
function loadNextQuestion() {
    if (currentQIdx >= selectedQuestions.length) {
        concludeQuiz();
        return;
    }

    const data = selectedQuestions[currentQIdx];

    // Headers
    document.getElementById('current-q-num').textContent = currentQIdx + 1;
    document.getElementById('total-q-num').textContent = selectedQuestions.length;

    // Question and Code Snippet
    document.getElementById('question-text-box').textContent = data.question;
    document.getElementById('code-snippet-display').textContent = data.code;

    // Options
    const optionsContainer = document.getElementById('options-list-box');
    optionsContainer.innerHTML = '';

    const labels = ['A', 'B', 'C', 'D'];
    data.options.forEach((opt, idx) => {
        const item = document.createElement('div');
        item.className = 'option-item';
        item.innerHTML = `
            <span>${escapeOption(opt)}</span>
            <div class="option-badge">${labels[idx]}</div>
        `;
        item.addEventListener('click', () => submitOption(idx));
        optionsContainer.appendChild(item);
    });

    startCountdown();
}

function escapeOption(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

/**
 * Starts countdown timer
 */
function startCountdown() {
    if (quizTimerId) clearInterval(quizTimerId);
    quizTimeLeft = QUESTION_TIMER_LIMIT;
    updateTimerUI();

    quizTimerId = setInterval(() => {
        quizTimeLeft--;
        updateTimerUI();

        if (quizTimeLeft <= 0) {
            clearInterval(quizTimerId);
            handleTimeOut();
        }
    }, 1000);
}

function updateTimerUI() {
    const timerText = document.getElementById('quiz-timer');
    const timerBar = document.getElementById('timer-bar');

    if (timerText) {
        timerText.textContent = `${quizTimeLeft}s`;
        timerText.style.color = quizTimeLeft <= 5 ? 'var(--color-crimson)' : 'var(--color-amber)';
    }

    if (timerBar) {
        const pct = (quizTimeLeft / QUESTION_TIMER_LIMIT) * 100;
        timerBar.style.width = `${pct}%`;
        timerBar.style.background = quizTimeLeft <= 5 ? 'var(--color-crimson)' : 'var(--color-amber)';
    }
}

/**
 * Auto trigger fail on timeout
 */
function handleTimeOut() {
    showDevToast('⏰ Stack timeout on active thread!', 'error');
    const data = selectedQuestions[currentQIdx];
    revealQuizAnswers(null, data.answer);

    setTimeout(() => {
        currentQIdx++;
        loadNextQuestion();
    }, 2500);
}

/**
 * Handle user option selection
 * @param {number} chosenIdx 
 */
function submitOption(chosenIdx) {
    if (quizTimerId) clearInterval(quizTimerId);
    const data = selectedQuestions[currentQIdx];
    const isCorrect = chosenIdx === data.answer;

    if (isCorrect) {
        score++;
        showDevToast('⚙️ Thread compiled successfully!', 'success');
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 15,
                spread: 30,
                origin: { y: 0.8 },
                colors: ['#00f2fe', '#00ff87']
            });
        }
    } else {
        showDevToast('💥 Runtime Exception: unexpected output!', 'error');
    }

    revealQuizAnswers(chosenIdx, data.answer);

    setTimeout(() => {
        currentQIdx++;
        loadNextQuestion();
    }, 2000);
}

function revealQuizAnswers(selected, correct) {
    const items = document.querySelectorAll('.option-item');
    items.forEach((item, idx) => {
        item.classList.add('disabled');
        if (idx === correct) {
            item.classList.add('correct');
            const icon = document.createElement('i');
            icon.className = 'fas fa-check-circle';
            icon.style.marginLeft = '1rem';
            item.appendChild(icon);
        } else if (idx === selected) {
            item.classList.add('wrong');
            const icon = document.createElement('i');
            icon.className = 'fas fa-exclamation-triangle';
            icon.style.marginLeft = '1rem';
            item.appendChild(icon);
        }
    });
}

/**
 * Render final result gauges
 */
function concludeQuiz() {
    if (quizTimerId) clearInterval(quizTimerId);

    // Swap view panels
    document.getElementById('panel-setup').style.display = 'none';
    document.getElementById('panel-quiz').style.display = 'none';
    document.getElementById('panel-results').style.display = 'block';

    const total = selectedQuestions.length;
    const pct = Math.round((score / total) * 100);

    // Radial dash
    const fillCircle = document.getElementById('results-circle-bar');
    if (fillCircle) {
        const offset = 440 - (440 * score) / total;
        fillCircle.style.strokeDashoffset = offset;
    }

    document.getElementById('results-score-text').textContent = `${score}/${total}`;

    const headline = document.getElementById('results-headline');
    const msgBox = document.getElementById('results-message-box');

    let msgText = '';
    if (pct === 100) {
        headline.textContent = '🌟 Compilation Success!';
        msgText = `Process exited with code 0. You answered all ${score} questions correctly in ${activeTrack.toUpperCase()} (${activeComplexity}). Zero bugs detected!`;
        
        if (typeof confetti === 'function') {
            const end = Date.now() + 1500;
            (function frame() {
                confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#00f2fe', '#9d4edd'] });
                confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#00f2fe', '#00ff87'] });
                if (Date.now() < end) requestAnimationFrame(frame);
            }());
        }

        unlockDevBadge('perfect_compile', 'Compile Success');
    } else if (pct >= 50) {
        headline.textContent = '⚡ Process Completed';
        msgText = `Solved ${score} of ${total} correctly in ${activeTrack.toUpperCase()} (${activeComplexity}). Trace diagnostics to reach 100%.`;
    } else {
        headline.textContent = '💥 Segmentation Fault';
        msgText = `Solved ${score} of ${total} correctly. Core dumped. Review the language tracks documentation and compile again.`;
    }

    msgBox.textContent = msgText;

    // Log stats
    recordActivity();
    if (!devState.quizScores[activeTrack]) {
        devState.quizScores[activeTrack] = [];
    }
    devState.quizScores[activeTrack].push(pct);
    saveDevState();

    checkQuizAchievements();
}

/**
 * Check and award quiz milestones
 */
function checkQuizAchievements() {
    let total = 0;
    Object.values(devState.quizScores).forEach(l => {
        total += l.length;
    });

    if (total >= 3) {
        unlockDevBadge('quiz_dev', 'Code Debugger');
    }
    if (total >= 7) {
        unlockDevBadge('debugging_champion', 'Bug Hunter');
    }
}

/**
 * Reset state to setup panel
 */
function resetQuizState() {
    document.getElementById('panel-setup').style.display = 'block';
    document.getElementById('panel-quiz').style.display = 'none';
    document.getElementById('panel-results').style.display = 'none';
}
