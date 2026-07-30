// CodeVerse - AI Code Tutor Page Logic

let tutorApiMode = 'mock'; // Default to Simulated AI offline database for 100% out-of-the-box reliability
let tutorClaudeKey = '';
let tutorGeminiKey = '';

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        loadTutorSettings();
        setupTutorEvents();
    }, 50);
});

function loadTutorSettings() {
    tutorApiMode = safeStorage.getLocal('codeverse_api_mode') || 'mock';
    tutorClaudeKey = safeStorage.getLocal('codeverse_claude_key') || '';
    tutorGeminiKey = safeStorage.getLocal('codeverse_gemini_key') || '';
    updateTutorUI();
}

function updateTutorUI() {
    const badge = document.getElementById('solver-badge-container');
    const desc = document.getElementById('chat-engine-description');

    if (badge) {
        if (tutorApiMode === 'gemini') {
            badge.innerHTML = `<span class="status-badge live" style="border-color:var(--color-teal); color:var(--color-teal);"><i class="fas fa-bolt"></i> Gemini API</span>`;
        } else if (tutorApiMode === 'claude') {
            badge.innerHTML = `<span class="status-badge live" style="border-color:var(--color-violet); color:var(--color-violet);"><i class="fas fa-bolt"></i> Claude API</span>`;
        } else {
            badge.innerHTML = `<span class="status-badge mock"><i class="fas fa-magic"></i> Simulated AI</span>`;
        }
    }

    if (desc) {
        if (tutorApiMode === 'gemini') {
            desc.textContent = `Live Google Gemini API active. Fast responses flowing directly from Google AI Studio.`;
        } else if (tutorApiMode === 'claude') {
            desc.textContent = `Live Claude API active. Explanations flow directly from Anthropic's developer models.`;
        } else {
            desc.textContent = `Operating in Interactive Simulator mode. Click preset prompts or type to begin.`;
        }
    }
}

function setupTutorEvents() {
    const openBtn = document.getElementById('btn-open-api-modal');
    const closeBtn = document.getElementById('btn-close-api-modal');
    const modal = document.getElementById('api-modal-overlay');
    const saveBtn = document.getElementById('btn-save-api-settings');
    const selectMode = document.getElementById('modal-select-mode');
    
    const geminiGroup = document.getElementById('modal-gemini-group');
    const geminiInput = document.getElementById('modal-input-gemini-key');
    const claudeGroup = document.getElementById('modal-claude-group');
    const claudeInput = document.getElementById('modal-input-claude-key');

    const updateModalVisibility = (mode) => {
        if (mode === 'gemini') {
            if (geminiGroup) geminiGroup.style.display = 'block';
            if (claudeGroup) claudeGroup.style.display = 'none';
        } else if (mode === 'claude') {
            if (geminiGroup) geminiGroup.style.display = 'none';
            if (claudeGroup) claudeGroup.style.display = 'block';
        } else {
            if (geminiGroup) geminiGroup.style.display = 'none';
            if (claudeGroup) claudeGroup.style.display = 'none';
        }
    };

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            if (selectMode) selectMode.value = tutorApiMode;
            if (geminiInput) geminiInput.value = tutorGeminiKey;
            if (claudeInput) claudeInput.value = tutorClaudeKey;
            updateModalVisibility(tutorApiMode);
            modal.classList.add('active');
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (selectMode) {
        selectMode.addEventListener('change', () => {
            updateModalVisibility(selectMode.value);
        });
    }

    if (saveBtn && modal) {
        saveBtn.addEventListener('click', () => {
            if (selectMode) tutorApiMode = selectMode.value;
            if (geminiInput) tutorGeminiKey = geminiInput.value.trim();
            if (claudeInput) tutorClaudeKey = claudeInput.value.trim();

            safeStorage.setLocal('codeverse_api_mode', tutorApiMode);
            safeStorage.setLocal('codeverse_gemini_key', tutorGeminiKey);
            safeStorage.setLocal('codeverse_claude_key', tutorClaudeKey);

            updateTutorUI();
            modal.classList.remove('active');
            showDevToast('AI Tutor configurations compiled!', 'success');
        });
    }

    // Clear logs
    const clearBtn = document.getElementById('btn-clear-chat');
    const logs = document.getElementById('chat-logs-container');
    if (clearBtn && logs) {
        clearBtn.addEventListener('click', () => {
            logs.innerHTML = `
                <div class="chat-bubble ai">
                    <div class="avatar"><i class="fas fa-terminal"></i></div>
                    <div class="bubble-content">
                        <h4>Console Buffer Cleared 🧹</h4>
                        <p>AI Code Tutor active. Send a new query to start compilation.</p>
                    </div>
                </div>
            `;
        });
    }

    // Search Filter & Category bindings
    const searchInput = document.getElementById('tutor-search-filter');
    if (searchInput) {
        searchInput.addEventListener('input', renderTutorPresets);
    }

    const filterBtns = document.querySelectorAll('.btn-tutor-filter');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            activeTutorFilter = e.currentTarget.getAttribute('data-filter');
            renderTutorPresets();
        });
    });

    // Send click
    const sendBtn = document.getElementById('btn-send-message');
    if (sendBtn) {
        sendBtn.addEventListener('click', submitDevQuery);
    }

    const inputBox = document.getElementById('chat-input-box');
    if (inputBox) {
        inputBox.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitDevQuery();
            }
        });
    }

    // Initial render
    renderTutorPresets();
}

let activeTutorFilter = 'all';

/**
 * Renders the matching interview questions into the sidebar presets list
 */
function renderTutorPresets() {
    const container = document.getElementById('tutor-presets-container');
    const searchInput = document.getElementById('tutor-search-filter');
    if (!container) return;

    const query = searchInput ? searchInput.value.toLowerCase() : '';
    container.innerHTML = '';

    const categories = activeTutorFilter === 'all' ? ['python', 'javascript', 'cpp', 'dsa'] : [activeTutorFilter];

    categories.forEach(cat => {
        const questions = TUTOR_QUESTIONS_DB[cat];
        if (!questions) return;

        questions.forEach(q => {
            // Filter match check
            if (query && !q.title.toLowerCase().includes(query) && !q.question.toLowerCase().includes(query)) {
                return;
            }

            const btn = document.createElement('button');
            btn.className = 'btn-preset';
            
            // Choose color icons based on category
            let iconColor = 'var(--color-teal)';
            let iconClass = 'fa-code-branch';
            if (cat === 'javascript') {
                iconColor = 'var(--color-amber)';
                iconClass = 'fab fa-js-square';
            } else if (cat === 'cpp') {
                iconColor = 'var(--color-violet)';
                iconClass = 'fas fa-code';
            } else if (cat === 'dsa') {
                iconColor = 'var(--color-green)';
                iconClass = 'fas fa-network-wired';
            } else if (cat === 'python') {
                iconColor = 'var(--color-teal)';
                iconClass = 'fab fa-python';
            }

            btn.innerHTML = `<i class="${iconClass}" style="color: ${iconColor};"></i> ${q.title}`;
            btn.addEventListener('click', () => {
                const inputBox = document.getElementById('chat-input-box');
                if (inputBox) {
                    inputBox.value = q.question;
                    inputBox.focus();
                    submitDevQuery();
                }
            });
            container.appendChild(btn);
        });
    });

    if (container.children.length === 0) {
        container.innerHTML = `<div style="font-size:0.75rem; color:var(--text-muted); text-align:center; padding:1rem; font-family:var(--font-mono);">No matching threads.</div>`;
    }
}

function submitDevQuery() {
    const inputBox = document.getElementById('chat-input-box');
    if (!inputBox) return;

    const query = inputBox.value.trim();
    if (!query) return;

    inputBox.value = '';

    appendTutorBubble(query, 'user');
    const loaderId = appendTypingIndicator();
    recordActivity(); // Log streak commit

    if (tutorApiMode === 'gemini') {
        askGeminiAPI(query, loaderId);
    } else if (tutorApiMode === 'claude') {
        askClaudeAPI(query, loaderId);
    } else {
        askSimulatedTutor(query, loaderId);
    }
}

function appendTutorBubble(text, sender) {
    const logs = document.getElementById('chat-logs-container');
    if (!logs) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;

    const icon = sender === 'user' ? 'fa-user' : 'fa-terminal';
    const content = sender === 'ai' ? parseMarkdown(text) : escapeHtml(text);

    bubble.innerHTML = `
        <div class="avatar"><i class="fas ${icon}"></i></div>
        <div class="terminal-panel bubble-content">${content}</div>
    `;

    logs.appendChild(bubble);
    logs.scrollTop = logs.scrollHeight;
}

function appendTypingIndicator() {
    const logs = document.getElementById('chat-logs-container');
    if (!logs) return null;

    const loaderId = `loader-${Date.now()}`;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble ai';
    bubble.id = loaderId;
    bubble.innerHTML = `
        <div class="avatar"><i class="fas fa-terminal"></i></div>
        <div class="terminal-panel bubble-content" style="padding: 0.75rem 1.25rem;">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

    logs.appendChild(bubble);
    logs.scrollTop = logs.scrollHeight;
    return loaderId;
}

function removeTypingIndicator(id) {
    const loader = document.getElementById(id);
    if (loader) loader.remove();
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function parseMarkdown(text) {
    let html = escapeHtml(text);

    // Code blocks
    html = html.replace(/```(.*?)\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre><code class="language-${lang.trim()}">${code}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Headings
    html = html.replace(/### (.*?)\n/g, '<h4>$1</h4>');
    html = html.replace(/### (.*?)$/g, '<h4>$1</h4>');

    // Lists
    html = html.replace(/^[-\*]\s+(.*?)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
    html = html.replace(/^\d+\.\s+(.*?)$/gm, '<li>$1</li>');

    html = html.replace(/\n/g, '<br>');
    html = html.replace(/<br><ul>/g, '<ul>');
    html = html.replace(/<\/ul><br>/g, '</ul>');

    return html;
}

/**
 * AI simulated tutor keyword matcher supporting 10 core presets
 */
function askSimulatedTutor(prompt, loaderId) {
    const query = prompt.toLowerCase().trim();
    let reply = "";

    // 1. Scan for direct matches in the 100 questions database
    const allQuestions = Object.values(TUTOR_QUESTIONS_DB).flat();
    const matched = allQuestions.find(q => q.question.toLowerCase().trim() === query || q.title.toLowerCase().trim() === query);

    if (matched) {
        reply = matched.answer;
    }
    // 2. Fallback to keyword matcher
    else if (query.includes('recursion') && query.includes('tree')) {
        reply = `### Recursion Tree Breakdown
A recursion tree is a visual representation of how recursive calls branch out. Let's analyze the Fibonacci sequence call \`fib(4)\` where the formula is \`fib(n) = fib(n-1) + fib(n-2)\`.

### ASCII Execution Call Tree
\`\`\`
            fib(4)
           /      \\
       fib(3)      fib(2)
      /      \\     /    \\
  fib(2)   fib(1) fib(1) fib(0)
  /    \\
fib(1) fib(0)
\`\`\`

### Execution Flow:
1. \`fib(4)\` calls \`fib(3)\` and \`fib(2)\`.
2. \`fib(3)\` resolves first by calling \`fib(2)\` and \`fib(1)\`.
3. Calls resolve down to base cases (\`fib(1) = 1\`, \`fib(0) = 0\`).
4. Resolved values bubble back up to compile the final return sum.
- **Total Calls**: 9 operations are triggered to compute \`fib(4)\`.
- **Time Complexity**: \\(O(2^n)\\) due to redundant computations (e.g. \`fib(2)\` is solved twice). Resolved using memoization.`;
    }
    
    // 2. Big-O Complexity
    else if (query.includes('complexity') && query.includes('nested loop')) {
        reply = `### Code Loop Time Complexity (Big-O)
Let's analyze the following code block:
\`\`\`cpp
for (int i = 0; i < n; i++) {
  for (int j = 1; j < n; j *= 2) {
    // constant operation: O(1)
  }
}
\`\`\`

### Step-by-Step Big-O Analysis:
1. **Outer Loop**: Runs from \`i = 0\` to \`i < n\`, incrementing by 1. This loop executes exactly **\\(n\\)** times.
2. **Inner Loop**: Runs from \`j = 1\` to \`j < n\`, but doubles (\`j *= 2\`) every iteration. The values of \`j\` are: \`1, 2, 4, 8, 16...\`. This logarithmic scale executes **\\(\\log_2(n)\\)** times.
3. **Combined Complexity**: Since the loops are nested and independent, we multiply their operations:
\`\`\`
Total Time = (Outer Loop runs) * (Inner Loop runs)
           = O(n) * O(log n)
           = O(n log n)
\`\`\`

- **Time Complexity**: **O(n log n)** (Linearithmic). Common in sorting algorithms like Merge Sort and Quick Sort.`;
    }

    // 3. Garbage Collection
    else if (query.includes('garbage collection') || query.includes('gc')) {
        reply = `### Garbage Collection: Java vs C++
A key structural difference between Java and C++ is how heap memory is managed:

### 1. Java Garbage Collector (GC)
- **Automatic**: Memory deallocation is handled automatically.
- **Mechanism**: The JVM regularly runs a background daemon thread that scans the heap for unreferenced objects using **Mark-and-Sweep** or **G1 Garbage Collection** algorithms.
- **Trade-off**: High developer speed, but pauses execution ("Stop-the-world" events) when GC sweeps memory.

### 2. C++ Memory Management
- **Manual**: C++ does not have a garbage collector. The developer explicitly manages heap memory.
- **Operators**: Heap memory is allocated with \`new\` and must be freed with \`delete\` to prevent memory leaks.
- **Modern C++ Alternative**: Use **Smart Pointers** (\`std::unique_ptr\`, \`std::shared_ptr\`) which automate deallocation using Resource Acquisition Is Initialization (RAII).

\`\`\`cpp
// Modern C++ automated memory
#include <memory>
void createObj() {
    // Automatically deleted when scope ends
    std::unique_ptr<MyClass> ptr = std::make_unique<MyClass>();
}
\`\`\``;
    }

    // 4. Race Conditions
    else if (query.includes('race condition') || query.includes('multithreading')) {
        reply = `### Understanding Race Conditions
A **race condition** is an concurrency bug in multithreading that occurs when two or more threads access shared data concurrently, and at least one thread attempts to modify the data. The final value depends on the execution timing (the "race") of the threads.

### Unsafe Shared Increment Example:
\`\`\`cpp
// Thread A and B executing concurrently:
counter++; // compiled as: Read -> Increment -> Write
\`\`\`
If two threads execute this simultaneously on a counter value of \`5\`:
1. Thread A reads \`5\`.
2. Thread B reads \`5\`.
3. Thread A increments to \`6\` and writes \`6\`.
4. Thread B increments to \`6\` and writes \`6\`.
*Result*: The counter is \`6\` instead of the expected \`7\`. One increment is lost!

### Thread-Safe Resolution using Mutex Locks:
\`\`\`cpp
#include <mutex>
std::mutex mtx;
int counter = 0;

void safeIncrement() {
    std::lock_guard<std::mutex> lock(mtx); // Locks counter
    counter++; 
    // Mutex automatically released when lock goes out of scope
}
\`\`\``;
    }

    // 5. SQL Joins
    else if (query.includes('sql query') || query.includes('inner vs left join') || query.includes('join')) {
        reply = `### Relational Joins: INNER vs LEFT JOIN
SQL Joins combine rows from two or more tables based on a related column.

### 1. INNER JOIN
Returns records that have matching values in **both** tables. Unmatched rows are omitted.
\`\`\`sql
SELECT Students.name, Courses.title
FROM Students
INNER JOIN Courses ON Students.course_id = Courses.id;
\`\`\`
*Result*: Only students registered in an existing course, and only courses with at least one student, are returned.

### 2. LEFT JOIN (or LEFT OUTER JOIN)
Returns **all** records from the left table, and the matched records from the right table. If there is no match, the result is NULL on the right side.
\`\`\`sql
SELECT Students.name, Courses.title
FROM Students
LEFT JOIN Courses ON Students.course_id = Courses.id;
\`\`\`
*Result*: Returns **all** students. If a student is not registered in any course, their \`title\` displays as \`NULL\`.`;
    }

    // 6. REST vs GraphQL
    else if (query.includes('rest') && query.includes('graphql')) {
        reply = `### REST vs GraphQL API Protocols
Both protocols transfer data over HTTP, but their structural approaches differ:

### REST API
- **Endpoint Design**: Endpoint-heavy. Multiple paths represent resources (e.g. \`/users\`, \`/users/1/posts\`).
- **Data Transfer**: Standard responses. Can lead to **Over-fetching** (retrieving fields you don't need) or **Under-fetching** (requiring multiple API calls).
- **HTTP Methods**: Explicit verbs (\`GET\`, \`POST\`, \`PUT\`, \`DELETE\`).

### GraphQL API
- **Endpoint Design**: Single endpoint (typically \`POST /graphql\`).
- **Data Transfer**: Query-based. The client writes a query specifying the exact fields needed, resolving over-fetching.
- **Structure**: Strongly typed schemas defined in GraphQL Schema Definition Language.

### Query Comparison
GraphQL request to fetch only usernames:
\`\`\`graphql
query {
  user(id: "1") {
    username
  }
}
\`\`\``;
    }

    // 7. Git Rebase vs Merge
    else if (query.includes('git rebase') || query.includes('git merge') || query.includes('merge')) {
        reply = `### Git Version Control: Merge vs Rebase
Both commands integrate commits from one branch into another, but they organize commit history differently:

### 1. Git Merge (\`git merge feature\`)
- **Action**: Combines branches and creates a new "Merge Commit" linking both branch histories.
- **Pros**: Non-destructive. Preserves complete history.
- **Cons**: Can clutter the commit log with multiple merge commits in highly active teams.
\`\`\`
A---B---C (main)
     \\   \\
      D---E---F (merge commit on main)
\`\`\`

### 2. Git Rebase (\`git rebase main\`)
- **Action**: Rewrites commit history by moving the base of the feature branch to the tip of the main branch.
- **Pros**: Creates a clean, linear project history.
- **Cons**: Rewrites commit SHA hashes. **Never rebase public shared branches** (violates history audit).
\`\`\`
A---B---C (main)
         \\
          D'---E' (linear commits appended)
\`\`\``;
    }

    // 8. BST Ordering
    else if (query.includes('binary search tree') || query.includes('bst ordering') || query.includes('bst')) {
        reply = `### BST Ordering Rules
A **Binary Search Tree (BST)** is a node-based binary tree data structure that enforces a strict sorting order key:

1. The left subtree of a node contains only nodes with keys **less** than the node's key.
2. The right subtree of a node contains only nodes with keys **greater** than the node's key.
3. The left and right subtrees must each also be a binary search tree.

### Visual Ordering Example:
\`\`\`
        8 (Parent)
       / \\
      3   10
     / \\    \\
    1   6    14
\`\`\`

### Sorting with In-Order Traversal
Visiting a BST in-order (\`Left -> Node -> Right\`) automatically traverses the nodes in sorted ascending order.
- **Traversal Path**: \`1 -> 3 -> 6 -> 8 -> 10 -> 14\`.
- **Search Cost**: Average: \\(O(\\log n)\\), Worst Case (unbalanced tree): \\(O(n)\\).`;
    }

    // 9. Singleton Pattern
    else if (query.includes('singleton') || query.includes('design pattern')) {
        reply = `### The Singleton Design Pattern
The **Singleton Pattern** is a creational design pattern that ensures a class has only **one instance** and provides a global point of access to it.

### When to use:
- Coordinating shared resources (e.g., Database Connection Pools, File Loggers, System Configuration managers).
- Global application states.

### Thread-Safe Java Singleton:
\`\`\`java
public class DatabaseConnector {
    private static volatile DatabaseConnector instance;

    // Private constructor stops instantiation from other classes
    private DatabaseConnector() {}

    public static DatabaseConnector getInstance() {
        if (instance == null) {
            synchronized (DatabaseConnector.class) {
                if (instance == null) {
                    instance = new DatabaseConnector(); // Lazy instantiation
                }
            }
        }
        return instance;
    }
}
\`\`\``;
    }

    // 10. Array Out of Bounds
    else if (query.includes('array out of bounds') || query.includes('bounds error')) {
        reply = `### Array Out of Bounds Error
An **Array Out of Bounds** error occurs when a program attempts to access a memory index outside the declared size bounds of the array.

### Dangerous C++ Access:
\`\`\`cpp
int data[5] = {1, 2, 3, 4, 5};
std::cout << data[5]; // Unsafe! Indexing is 0-4.
\`\`\`
*Result*: C++ does not run bounds checking on raw array syntax. Accessing index \`5\` reads arbitrary memory, causing a Segmentation Fault or security leaks.

### Safe Implementation:
1. **Use boundary checks**: Always check indices before access.
2. **Use STL containers**: In C++, use \`std::vector::at()\` which throws an out-of-range exception on bounds violations.
\`\`\`cpp
#include <vector>
std::vector<int> data = {1, 2, 3};
try {
    int val = data.at(3); // Throws std::out_of_range
} catch (const std::out_of_range& e) {
    std::cerr << "Index out of bounds blocked!" << std::endl;
}
\`\`\``;
    }

    // General Template Fallback
    else {
        reply = `### Debugging Report: ${escapeHtml(prompt)}
Here is the compilation response for your programming inquiry:

- **Concept**: The analyzed query details computer science variables governing this software logic.
- **Code Execution Analysis**:
  1. The compiler verifies syntactic structures.
  2. Variables allocate memory addresses in stack/heap fields.
  3. Complexity ratios are calculated relative to input bounds.

### Refactored Code Template
\`\`\`js
// Optimized model script
function resolveQuery(input) {
    if (!input) return null;
    // Linear execution O(n)
    let outputMap = new Map();
    outputMap.set("status", "compiled");
    return outputMap;
}
\`\`\`
- **Time Complexity**: **O(1)** Constant time.
- **Space Complexity**: **O(1)** memory utilization.`;
    }

    // Simulate thinking delay
    setTimeout(() => {
        removeTypingIndicator(loaderId);
        appendTutorBubble(reply, 'ai');
    }, 1500);
}

/**
 * Live Anthropic Claude API Call
 */
function askClaudeAPI(prompt, loaderId) {
    if (!tutorClaudeKey) {
        removeTypingIndicator(loaderId);
        appendTutorBubble("⚠️ **API Key Missing**: Please configure your Anthropic API key in the **Configure Engine** panel first.", 'ai');
        return;
    }

    const url = 'https://api.anthropic.com/v1/messages';

    fetch(url, {
        method: 'POST',
        headers: {
            'x-api-key': tutorClaudeKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            messages: [
                {
                    role: 'user',
                    content: `You are the CodeVerse AI Code Tutor. Provide clear, structured, step-by-step programming explanations. Include ASCII diagrams and time/space complexity analysis. Use markdown. Query: ${prompt}`
                }
            ]
        })
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(data => {
                throw new Error(data.error?.message || `HTTP ${res.status}`);
            });
        }
        return res.json();
    })
    .then(data => {
        removeTypingIndicator(loaderId);
        if (data.content && data.content[0] && data.content[0].text) {
            appendTutorBubble(data.content[0].text, 'ai');
        } else {
            appendTutorBubble("No response text returned from Claude API.", 'ai');
        }
    })
    .catch(err => {
        console.error('Claude API call failed:', err);
        removeTypingIndicator(loaderId);
        
        if (err.message.includes('Failed to fetch') || err.name === 'TypeError') {
            appendTutorBubble(`### 🔒 Browser CORS Block Detected
Your request failed due to standard web security (**CORS**). 

**What happened?**
Anthropic's servers block direct API requests sent directly from web browsers (frontend) to protect keys.

**How to resolve this?**
1. **Option A (Easiest)**: Toggle the **AI Engine** back to **Simulated AI (No key needed)** in the settings sidebar to test the beautiful design offline.
2. **Option B (For Developers)**: Install a browser extension like "Allow CORS" or run a local CORS proxy during development.
3. **Option C**: Set up a lightweight server proxy backend to forward calls.`, 'ai');
        } else {
            appendTutorBubble(`### ❌ API Request Failed
An error occurred during communication:
 
\`\`\`
${err.message}
\`\`\`
Check your API key validity, internet status, and quota availability.`, 'ai');
        }
    });
}

/**
 * Live Google Gemini API Chat API Call (CORS-friendly browser access)
 */
function askGeminiAPI(prompt, loaderId) {
    if (!tutorGeminiKey) {
        removeTypingIndicator(loaderId);
        appendTutorBubble(`### ⚠️ Google Gemini API Key Required\n\nYou have selected Google Gemini, but your API Key is empty.\n\n**How to configure:**\n1. Click **Configure Engine** in the sidebar.\n2. Paste your Gemini API Key.\n3. Click **Save Configuration**.\n\n*Tip: You can get a free, keyless sandbox experience by switching back to **Simulated AI**.*`, 'ai');
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${tutorGeminiKey}`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            systemInstruction: {
                parts: [{
                    text: "You are the CodeVerse AI Code Tutor, a premium programming helper for computer science and software engineering students. Provide clear, structured, step-by-step programming explanations. Include ASCII diagrams and complexity analysis. Use monospace blocks for all code. Keep responses highly technical, structured, and under 500 words. Always format in markdown."
                }]
            }
        })
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(data => {
                throw new Error(data.error?.message || `HTTP ${res.status}`);
            });
        }
        return res.json();
    })
    .then(data => {
        removeTypingIndicator(loaderId);
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
            const text = data.candidates[0].content.parts[0].text;
            appendTutorBubble(text, 'ai');
        } else {
            appendTutorBubble("No response text returned from Gemini API.", 'ai');
        }
    })
    .catch(err => {
        console.error('Gemini API call failed:', err);
        removeTypingIndicator(loaderId);
        
        let errorMsg = err.message;
        if (errorMsg.includes('API key not valid')) {
            errorMsg = "Your Gemini API Key is invalid. Please double-check it in Google AI Studio.";
        }
        
        appendTutorBubble(`### ❌ Gemini Request Failed\n\nUnable to connect to Google Gemini services.\n\n**Error details:**\n\`\`\`\n${errorMsg}\n\`\`\`\n\n*Tip: Switch back to **Simulated AI** in settings to use the offline tutor database.*`, 'ai');
    });
}
