// CodeVerse - Developer Flashcards Page Logic

let activeTrack = 'python';
let activeDeck = [];
let currentCardIdx = 0;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial configuration load
    setTimeout(() => {
        setupFlashcardState();
        setupFlashcardEvents();
        switchDeck(activeTrack);
    }, 100);
});

/**
 * Configure local states (mastered trackers)
 */
function setupFlashcardState() {
    // Ensure mastered list exists in devState
    if (!devState.masteredFlashcards) {
        devState.masteredFlashcards = [];
        saveDevState();
    }
}

/**
 * Register click and keyboard key event hooks
 */
function setupFlashcardEvents() {
    const viewport = document.getElementById('flashcard-viewport');
    const prevBtn = document.getElementById('btn-prev-card');
    const nextBtn = document.getElementById('btn-next-card');
    const shuffleBtn = document.getElementById('btn-shuffle-deck');
    const masteredBtn = document.getElementById('btn-toggle-mastered');
    const categoryTabs = document.querySelectorAll('.btn-category-tab');

    // 1. Flip card click listener
    if (viewport) {
        viewport.addEventListener('click', flipCard);
    }

    // 2. Navigation Clickers
    if (prevBtn) prevBtn.addEventListener('click', prevCard);
    if (nextBtn) nextBtn.addEventListener('click', nextCard);
    if (shuffleBtn) shuffleBtn.addEventListener('click', shuffleDeck);
    if (masteredBtn) masteredBtn.addEventListener('click', toggleMastered);

    // 3. Category selectors
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const track = e.currentTarget.getAttribute('data-track');
            switchDeck(track);
        });
    });

    // 4. Keyboard Navigation bindings
    document.addEventListener('keydown', (e) => {
        // Prevent default actions for standard space/arrow triggers in flashcard context
        if (e.code === 'Space') {
            e.preventDefault();
            flipCard();
        } else if (e.code === 'ArrowLeft') {
            e.preventDefault();
            prevCard();
        } else if (e.code === 'ArrowRight') {
            e.preventDefault();
            nextCard();
        }
    });
}

/**
 * Swaps current active track deck
 */
function switchDeck(trackKey) {
    activeTrack = trackKey;
    
    // UI active tab updating
    const tabs = document.querySelectorAll('.btn-category-tab');
    tabs.forEach(tab => {
        if (tab.getAttribute('data-track') === trackKey) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Copy cards from database
    const pool = FLASHCARDS_DB[trackKey];
    if (!pool || pool.length === 0) return;

    activeDeck = [...pool];
    currentCardIdx = 0;

    renderCard();
}

/**
 * Update card view fields
 */
function renderCard() {
    const viewport = document.getElementById('flashcard-viewport');
    const frontText = document.getElementById('card-front-text');
    const backText = document.getElementById('card-back-text');
    const progressText = document.getElementById('deck-progress-text');
    const masteredBtn = document.getElementById('btn-toggle-mastered');

    if (activeDeck.length === 0) return;

    // Reset flipped state first
    if (viewport) viewport.classList.remove('flipped');

    const card = activeDeck[currentCardIdx];
    
    // Add brief timeout before switching text so front flips silently
    setTimeout(() => {
        frontText.innerHTML = card.front;
        backText.innerHTML = card.back;
    }, 150);

    // Update progress numbers
    if (progressText) {
        progressText.textContent = `Card ${currentCardIdx + 1} / ${activeDeck.length}`;
    }

    // Update Mastered state button UI
    if (masteredBtn) {
        const isMastered = devState.masteredFlashcards.includes(card.id);
        if (isMastered) {
            masteredBtn.className = 'btn-mastered active';
            masteredBtn.innerHTML = '<i class="fas fa-check-circle"></i> Mastered ✓';
        } else {
            masteredBtn.className = 'btn-mastered';
            masteredBtn.innerHTML = '<i class="far fa-circle"></i> Mark as Mastered';
        }
    }
}

/**
 * Flips card rotation class
 */
function flipCard() {
    const viewport = document.getElementById('flashcard-viewport');
    if (viewport) {
        viewport.classList.toggle('flipped');
    }
}

/**
 * Iterate forward
 */
function nextCard() {
    if (activeDeck.length === 0) return;
    currentCardIdx = (currentCardIdx + 1) % activeDeck.length;
    renderCard();
}

/**
 * Iterate backward
 */
function prevCard() {
    if (activeDeck.length === 0) return;
    currentCardIdx = (currentCardIdx - 1 + activeDeck.length) % activeDeck.length;
    renderCard();
}

/**
 * Shuffles active array deck order
 */
function shuffleDeck() {
    if (activeDeck.length <= 1) return;
    
    // Fisher-Yates Shuffling
    for (let i = activeDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = activeDeck[i];
        activeDeck[i] = activeDeck[j];
        activeDeck[j] = temp;
    }

    currentCardIdx = 0;
    renderCard();
    showDevToast('Deck shuffled! Compilation order randomized.', 'info');
}

/**
 * Toggle active card mastered status
 */
function toggleMastered() {
    if (activeDeck.length === 0) return;

    const card = activeDeck[currentCardIdx];
    const isMastered = devState.masteredFlashcards.includes(card.id);

    if (!isMastered) {
        devState.masteredFlashcards.push(card.id);
        recordActivity(); // Log commits streak
        showDevToast('🧠 Concept marked as Mastered!', 'success');
        
        // Minor confetti burst
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 15,
                spread: 30,
                origin: { y: 0.8 },
                colors: ['#00f2fe', '#00ff87']
            });
        }
        
        checkFlashcardAchievements();
    } else {
        devState.masteredFlashcards = devState.masteredFlashcards.filter(id => id !== card.id);
        showDevToast('Concept removed from Mastered logs.', 'info');
    }

    saveDevState();
    renderCard();
}

/**
 * Check flashcard counts for achievements
 */
function checkFlashcardAchievements() {
    const totalMastered = devState.masteredFlashcards.length;

    if (totalMastered >= 10) {
        unlockDevBadge('flashcard_novice', 'Card Scholar');
    }
    if (totalMastered >= 30) {
        unlockDevBadge('flashcard_expert', 'Card Master');
    }
    
    // Check if entire category mastered
    const catCards = FLASHCARDS_DB[activeTrack].map(c => c.id);
    const hasCatAll = catCards.every(id => devState.masteredFlashcards.includes(id));
    
    if (hasCatAll) {
        unlockDevBadge(`${activeTrack}_mastered`, `${activeTrack.toUpperCase()} Memory Master`);
    }
}
