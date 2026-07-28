# 🌌 CodeVerse - Student Programming Portal

CodeVerse is a premium, cyberpunk-themed student developer portal designed for interactive learning, predicting code output, tracking study progress, and solving coding doubts using a free keyless AI engine. 

The interface features custom neon-glow accents, responsive matrix components, and a specialized offline compatibility layer (`safeStorage`) that allows the portal to run smoothly as a standalone file without requiring a web server.

---

## ⚡ Key Features

*   **🔒 Secure Authentication Gateway**: Mock Google and Apple ID OAuth chooser modals and credential login forms integrated with session verification to prevent unauthorized flashes of the dashboard.
*   **📚 Dynamic Study Tracks & Handbooks**: Core tracks for **Python, JavaScript, C++, and Data Structures & Algorithms (DSA)**. Includes an embedded PDF Handbook viewport for studying original class notes.
*   **🃏 Active-Recall 3D Flashcards**: A library of **100 cards per track (400 total)** with 3D flip card physics. Cards can be toggled to *Mastered* to dynamically unlock achievements.
*   **🎮 Interactive Code Quiz Console**: Compile prediction answers and algorithm complexity checks, displaying immediate feedback and calculating percentage scores.
*   **📊 Metrics & Achievements Dashboard**: Streak counts, overall scores, and unlockable badge achievements synced in real time.
*   **🤖 Live AI Developer Tutor**: Powered by a keyless cors-enabled Pollinations text generation engine with 10+ starter prompt presets. Includes fallback options to Claude API key configs.
*   **🛡️ Offline safeStorage Wrapper**: Custom local-origin storage engine that shields scripts from browser security blocks when opened off the `file://` protocol.

---

## 🛠️ Technology Stack

*   **Core Logic**: Vanilla JavaScript (ES6)
*   **Markup**: HTML5 Semantic Architecture
*   **Styling**: Cyberpunk Custom Vanilla CSS
*   **Typography**: Outfit & Fira Code (Google Fonts)
*   **Iconography**: FontAwesome v6.4.0
*   **Inference API**: Pollinations AI (Text Engine)

---

## 🚀 How to Run Locally

Since CodeVerse is built with standalone client-side architecture, you do not need to install `npm` dependencies or run a local dev server.

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Suchismitapadhi123/codeverse.git
    cd codeverse
    ```
2.  **Open the Auth Portal**:
    Double-click or open [login.html](login.html) directly in any modern browser (Chrome, Safari, Edge, Firefox).
3.  **Establish a Session**:
    Click **"Continue with Google"** and select **Suchismita Padhi** to access the main student dashboard.

---

## 📂 Project Structure

```text
codeverse/
├── css/
│   └── style.css            # Cyberpunk layout, neon colors, animations
├── js/
│   ├── app.js               # Global session, streaks, safeStorage client
│   ├── db_flashcards.js     # 400 dynamic active-recall cards
│   ├── db_tutor.js          # 400 mock interview questions
│   ├── tutor.js             # Pollinations/Claude AI Tutor connection
│   ├── progress.js          # Progress dashboard logic & badges check
│   └── quiz.js              # MCQ prediction engine & stats loader
├── index.html               # Student Home Console dashboard
├── tracks.html              # Dynamic study paths & PDF viewport
├── flashcards.html          # Interactive 3D deck
├── quiz.html                # MCQ quiz terminal
├── progress.html            # Achievements logs
├── tutor.html               # Live AI doubts chat room
├── login.html               # OAuth Mockup gateway
├── .gitignore               # Excluded caches & OS files
└── README.md                # Project documentation
```

---

## 👩‍💻 Creator Profile

Created and maintained by **Suchismita Padhi**. 

*   **LinkedIn**: [suchismitapadhi89](https://www.linkedin.com/in/suchismitapadhi89)
*   **GitHub**: [Suchismitapadhi123](https://github.com/Suchismitapadhi123)
*   **Instagram**: [@khushi143451](https://www.instagram.com/khushi143451)
*   **Email**: [suchismitapadhi89@gmail.com](mailto:suchismitapadhi89@gmail.com)
