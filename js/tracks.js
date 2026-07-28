// CodeVerse - Coding Tracks Page Logic

// Course Tracks syllabus database
const SYLLABUS = {
    python: {
        name: "Python Track",
        color: "var(--color-teal)",
        topics: [
            {
                id: "py-decorators",
                title: "Decorators",
                wikiQuery: "Python_syntax#Decorators",
                libraryQuery: "python programming",
                fallback: "A decorator in Python is a design pattern that allows a developer to add new functionality to an existing object (typically functions, methods, or classes) without modifying its structure. Decorators are usually called before the definition of a function you want to decorate. In syntax, they are represented using the '@' symbol followed by the decorator function name."
            },
            {
                id: "py-generators",
                title: "Generators",
                wikiQuery: "Generator_(computer_programming)",
                libraryQuery: "python cookbook",
                fallback: "Generators are functions in Python that return an iterable set of items, one at a time, using the 'yield' keyword instead of 'return'. Generators are highly memory-efficient because they execute 'lazy evaluation'—they generate the next item in the sequence only when requested, rather than allocating memory for an entire array in memory upfront."
            },
            {
                id: "py-oop",
                title: "OOP Inheritance",
                wikiQuery: "Inheritance_(object-oriented_programming)",
                libraryQuery: "python object oriented programming",
                fallback: "Inheritance is a key pillar of Object-Oriented Programming (OOP) that allows a new class (subclass or child class) to inherit attributes, methods, and behaviors from an existing class (superclass or parent class). Python supports both single inheritance and multiple inheritance, using Method Resolution Order (MRO) to resolve method calls."
            }
        ]
    },
    javascript: {
        name: "JavaScript Track",
        color: "var(--color-amber)",
        topics: [
            {
                id: "js-promises",
                title: "Promises & Async",
                wikiQuery: "Futures_and_promises",
                libraryQuery: "javascript asynchronous",
                fallback: "A Promise in JavaScript is a proxy object representing the eventual completion or failure of an asynchronous operation. It allows asynchronous methods to return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future. Promises exist in three states: Pending, Fulfilled, or Rejected."
            },
            {
                id: "js-closures",
                title: "Closures Scope",
                wikiQuery: "Closure_(computer_programming)",
                libraryQuery: "you dont know js",
                fallback: "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In other words, a closure gives an inner function access to the outer function's scope even after the outer function has finished executing. In JavaScript, closures are created every time a function is created, at function creation time."
            },
            {
                id: "js-fetch",
                title: "Fetch API & REST",
                wikiQuery: "Fetch_API",
                libraryQuery: "rest api design",
                fallback: "The Fetch API provides a modern interface for fetching resources (including across the network) in JavaScript. It is a powerful and flexible replacement for the older XMLHttpRequest. Fetch uses Promises to handle HTTP request results, returning a Response object that can be resolved into JSON, text, or blobs."
            }
        ]
    },
    cpp: {
        name: "C++ Track",
        color: "var(--color-violet)",
        topics: [
            {
                id: "cpp-basics",
                title: "C++ Basics & I/O",
                wikiQuery: "C%2B%2B",
                libraryQuery: "c++ programming basics",
                fallback: "<h3>C++ Boilerplate</h3>\nC++ programs require standard boilerplate headers to execute. The basic structure is:\n<pre><code>#include &lt;iostream&gt;\nusing namespace std;\n\nint main() {\n    cout &lt;&lt; \"Welcome To CodeWithHarry\";\n    return 0;\n}</code></pre>\n\n<h3>Input & Output Stream</h3>\nC++ uses stream operators to handle input and output:\n<ul>\n    <li><strong>Output (<code>cout &lt;&lt;</code>)</strong>: Prints values or text to the standard console output.</li>\n    <li><strong>Input (<code>cin &gt;&gt;</code>)</strong>: Receives input from the standard user input.</li>\n</ul>\nExample:\n<pre><code>string name;\ncout &lt;&lt; \"Enter name: \";\ncin &gt;&gt; name;\ncout &lt;&lt; \"Hello, \" &lt;&lt; name;</code></pre>"
            },
            {
                id: "cpp-datatypes",
                title: "Data Types & Strings",
                wikiQuery: "C%2B%2B_data_types",
                libraryQuery: "c++ data types",
                fallback: "<h3>Standard Data Types</h3>\nC++ supports several data types divided by size and purpose:\n<ul>\n    <li><code>char</code> (1 byte): Stores a single character. e.g. <code>char c='A';</code></li>\n    <li><code>int</code> (4 bytes): Stores integer numbers. e.g. <code>int x=10;</code></li>\n    <li><code>short</code> (2 bytes): Small integer. e.g. <code>short s=100;</code></li>\n    <li><code>long</code> (4-8 bytes): Large integer. e.g. <code>long l=100000;</code></li>\n    <li><code>float</code> (4 bytes): Single-precision decimal. e.g. <code>float f=10.5;</code></li>\n    <li><code>double</code> (8 bytes): Double-precision decimal. e.g. <code>double d=10.55;</code></li>\n    <li><code>bool</code> (1 byte): True/False values. e.g. <code>bool flag=true;</code></li>\n    <li><code>void</code>: Represents no value.</li>\n</ul>\n\n<h3>Escape Sequences</h3>\nEscape sequences represent special character controls:\n<ul>\n    <li><code>\\n</code>: Newline</li>\n    <li><code>\\t</code>: Horizontal tab</li>\n    <li><code>\\a</code>: Alert (beep)</li>\n    <li><code>\\\\</code>: Backslash</li>\n    <li><code>\\0</code>: Null terminator</li>\n</ul>\n\n<h3>Strings & Math</h3>\nDeclare strings using <code>#include &lt;string&gt;</code>:\n<ul>\n    <li><strong>Concatenation</strong>: <code>string s3 = s1 + \" \" + s2;</code></li>\n    <li><strong>Append</strong>: <code>s1.append(s2);</code></li>\n    <li><strong>Length</strong>: <code>s3.length();</code></li>\n    <li><strong>Modify</strong>: <code>s3[0] = 'h';</code></li>\n</ul>\nImport <code>&lt;cmath&gt;</code> for math functions: <code>max(a,b)</code>, <code>min(a,b)</code>, <code>sqrt(x)</code>, <code>ceil(x)</code>, <code>floor(x)</code>, <code>pow(x,y)</code>, <code>abs(x)</code>, <code>round(x)</code>."
            },
            {
                id: "cpp-flow",
                title: "Decision Making & Loops",
                wikiQuery: "Control_flow#C.2B.2B",
                libraryQuery: "c++ control flow loops",
                fallback: "<h3>Decision Making</h3>\nControl the execution path of C++ scripts:\n<ul>\n    <li><strong>If/Else</strong>:\n        <pre><code>if (x &gt; 0) { /* code */ }\nelse if (x == 0) { /* code */ }\nelse { /* code */ }</code></pre>\n    </li>\n    <li><strong>Ternary Operator</strong>: Short-hand conditional assignment. \n        <code>int result = (x &gt; 0) ? 1 : -1;</code>\n    </li>\n    <li><strong>Switch Statement</strong>: Selects one of many code blocks to execute based on a choice:\n        <pre><code>switch (choice) {\n    case 1: cout &lt;&lt; \"One\"; break;\n    case 2: cout &lt;&lt; \"Two\"; break;\n    default: cout &lt;&lt; \"Other\";\n}</code></pre>\n    </li>\n</ul>\n\n<h3>Loops</h3>\nExecute a block of code repeatedly:\n<ul>\n    <li><strong>While Loop</strong>: Checks condition, then executes. <code>while (i &lt; 5) { i++; }</code></li>\n    <li><strong>Do-While Loop</strong>: Executes once, then checks condition. <code>do { i++; } while (i &lt; 5);</code></li>\n    <li><strong>For Loop</strong>: Loop with initialization, condition, and increment. <code>for (int i=0; i&lt;5; i++) { /* code */ }</code></li>\n    <li><strong>Break / Continue</strong>: <code>break;</code> exits loop; <code>continue;</code> skips current iteration.</li>\n</ul>"
            },
            {
                id: "cpp-pointers",
                title: "Pointers & References",
                wikiQuery: "Pointer_(computer_programming)",
                libraryQuery: "c++ pointers memory",
                fallback: "<h3>C++ References</h3>\nA reference variable is an alias, that is, another name for an existing variable. Created using the <code>&amp;</code> symbol:\n<pre><code>int a = 10;\nint &amp;ref = a;\nref = 20; // 'a' becomes 20</code></pre>\n\n<h3>C++ Pointers</h3>\nA pointer is a variable that stores the memory address of another variable. Declared using the <code>*</code> symbol:\n<pre><code>int x = 10;\nint *ptr = &amp;x; // Pointer 'ptr' holds address of 'x'\ncout &lt;&lt; *ptr; // Dereferencing: prints value 10</code></pre>\n\n<h3>Key Pointer Rules</h3>\n<ul>\n    <li><code>nullptr</code>: Used to represent a null pointer in C++11+ (replaces old NULL macro).</li>\n    <li><code>-&gt;</code>: Member access operator used to access methods or fields of objects through a pointer.</li>\n</ul>"
            },
            {
                id: "cpp-oop",
                title: "OOP & Polymorphism",
                wikiQuery: "Object-oriented_programming#C.2B.2B",
                libraryQuery: "c++ object oriented class",
                fallback: "<h3>Classes & Objects</h3>\nA class is a blueprint for objects. Fields and methods are declared public or private:\n<pre><code>class Car {\npublic:\n    string brand;\n    int year;\n    void drive() { cout &lt;&lt; \"Driving\"; }\n};\n\nCar c1;\nc1.brand = \"BMW\";\nc1.drive();</code></pre>\n\n<h3>Class Constructors</h3>\nA constructor is a special member function that is automatically called when an object is created:\n<pre><code>class Car {\npublic:\n    Car(string b, int y) {\n        brand = b;\n        year = y;\n    }\n    string brand;\n    int year;\n};</code></pre>\n\n<h3>Inheritance</h3>\nA class can inherit methods and properties from another class:\n<pre><code>class Vehicle {\npublic:\n    void honk() { cout &lt;&lt; \"Beep!\"; }\n};\nclass Car : public Vehicle {};\nCar obj;\nobj.honk(); // Inherited method called</code></pre>\n\n<h3>Polymorphism (Virtual Functions)</h3>\nPolymorphism allows dynamic method dispatching during runtime using virtual functions:\n<pre><code>class Animal {\npublic:\n    virtual void sound() { cout &lt;&lt; \"Some sound\"; }\n};\nclass Dog : public Animal {\npublic:\n    void sound() override { cout &lt;&lt; \"Bark\"; }\n};\n\nAnimal* a = new Dog();\na-&gt;sound(); // Outputs \"Bark\" due to virtual method lookup</code></pre>"
            },
            {
                id: "cpp-advanced",
                title: "Advanced C++ & STL",
                wikiQuery: "C%2B%2B_Standard_Library",
                libraryQuery: "c++ stl templates files",
                fallback: "<h3>File Handling (&lt;fstream&gt;)</h3>\nUse streams to read and write files:\n<ul>\n    <li><strong>Write Files</strong>:\n        <pre><code>ofstream myFile(\"test.txt\");\nmyFile &lt;&lt; \"Hello\";\nmyFile.close();</code></pre>\n    </li>\n    <li><strong>Read Files</strong>:\n        <pre><code>ifstream readFile(\"test.txt\");\nstring line;\nwhile (getline(readFile, line)) { cout &lt;&lt; line; }\nreadFile.close();</code></pre>\n    </li>\n    <li><strong>File Modes</strong>: <code>ios::in</code>, <code>ios::out</code>, <code>ios::app</code>, <code>ios::binary</code>, <code>ios::ate</code>, <code>ios::trunc</code>.</li>\n</ul>\n\n<h3>Exception Handling</h3>\nHandle errors gracefully using try-catch blocks:\n<pre><code>try {\n    throw runtime_error(\"Error occurred\");\n} catch (exception &amp;e) {\n    cout &lt;&lt; \"Caught: \" &lt;&lt; e.what();\n}</code></pre>\n\n<h3>Namespaces & Templates</h3>\n<ul>\n    <li><strong>Namespaces</strong>: Prevents name conflicts. <code>namespace A { int x = 10; }</code> (Access: <code>A::x</code>).</li>\n    <li><strong>Templates</strong>: Enables generic programming:\n        <pre><code>template &lt;typename T&gt;\nT add(T a, T b) { return a + b; }</code></pre>\n    </li>\n</ul>\n\n<h3>Standard Template Library (STL)</h3>\nC++ provides powerful container collections: <code>vector</code> (dynamic array), <code>map</code> (key-value dictionary), <code>set</code> (unique values), <code>stack</code> (LIFO structure), <code>queue</code>, etc."
            }
        ]
    },
    dsa: {
        name: "Algorithms & DSA",
        color: "var(--color-green)",
        topics: [
            {
                id: "dsa-bst",
                title: "Binary Search Tree",
                wikiQuery: "Binary_search_tree",
                libraryQuery: "data structures algorithms",
                fallback: "A Binary Search Tree (BST) is a node-based binary tree data structure where each node has at most two children. It enforces a sorting ordering: for any given node, the value of all nodes in its left subtree must be less than the node's value, and the value of all nodes in its right subtree must be greater. This yields average search, insertion, and deletion times of O(log n)."
            },
            {
                id: "dsa-graphs",
                title: "Graph Traversals",
                wikiQuery: "Graph_traversal",
                libraryQuery: "algorithms handbook",
                fallback: "Graph traversal refers to the process of visiting (checking or updating) each vertex in a graph structure exactly once. The two fundamental algorithms are Depth-First Search (DFS), which uses a stack structure to explore vertices deep along branches before backtracking, and Breadth-First Search (BFS), which uses a queue structure to explore neighbor vertices level-by-level."
            },
            {
                id: "dsa-bigo",
                title: "Big-O Complexities",
                wikiQuery: "Big_O_notation",
                libraryQuery: "computational complexity",
                fallback: "Big O notation is a mathematical notation used in computer science to describe the limiting behavior of an algorithm's execution time or space requirements as the input size grows. It focuses on the worst-case scenario, ignoring constant factors and lower-order terms to classify algorithms (e.g., O(1) constant, O(log n) logarithmic, O(n) linear, O(n²) quadratic)."
            }
        ]
    }
};

// PDF maps for tracks
const TRACK_PDFS = {
    python: "The Ultimate Python Handbook.pdf",
    javascript: "JS_Chapterwise_Notes.pdf",
    cpp: "C++ Cheatsheet.pdf",
    dsa: "DSA_CompleteNotes.pdf"
};

// Current track states
let activeTrack = 'python';
let activeTopic = null;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Read URL param
    const urlParams = new URLSearchParams(window.location.search);
    const paramTrack = urlParams.get('subject');
    if (paramTrack && SYLLABUS[paramTrack]) {
        activeTrack = paramTrack;
    }

    // 2. Setup track tabs click events
    const tabs = document.querySelectorAll('.btn-track-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const trackKey = e.currentTarget.getAttribute('data-track');
            switchTrack(trackKey);
        });
    });

    // 3. Mark complete button click event
    const completeBtn = document.getElementById('btn-complete-topic');
    if (completeBtn) {
        completeBtn.addEventListener('click', toggleTopicCompletion);
    }

    // 4. Notes tab selection click events
    setupNotesTabs();

    // Load initial track
    switchTrack(activeTrack);
});

/**
 * Configure notes docs vs PDF tabs behavior
 */
function setupNotesTabs() {
    const btnWiki = document.getElementById('btn-tab-wiki');
    const btnPdf = document.getElementById('btn-tab-pdf');
    const boxWiki = document.getElementById('notes-content-box');
    const boxPdf = document.getElementById('pdf-viewer-box');

    if (!btnWiki || !btnPdf) return;

    btnWiki.addEventListener('click', () => {
        btnWiki.classList.add('active');
        btnPdf.classList.remove('active');
        
        boxWiki.style.display = 'block';
        boxPdf.style.display = 'none';
        updateTabsColor();
    });

    btnPdf.addEventListener('click', () => {
        btnPdf.classList.add('active');
        btnWiki.classList.remove('active');

        boxWiki.style.display = 'none';
        boxPdf.style.display = 'flex';
        updateTabsColor();

        // Load PDF inside iframe
        loadActivePdf();
    });
}

/**
 * Update notes tab styling dynamically based on the current track's primary color
 */
function updateTabsColor() {
    const btnWiki = document.getElementById('btn-tab-wiki');
    const btnPdf = document.getElementById('btn-tab-pdf');
    if (!btnWiki || !btnPdf) return;

    const color = SYLLABUS[activeTrack].color || 'var(--color-teal)';
    
    if (btnWiki.classList.contains('active')) {
        btnWiki.style.background = 'rgba(255,255,255,0.02)';
        btnWiki.style.borderColor = 'var(--border-neon)';
        btnWiki.style.color = color;
        btnWiki.style.textShadow = `0 0 10px ${color}40`;
        
        btnPdf.style.background = 'transparent';
        btnPdf.style.borderColor = 'transparent';
        btnPdf.style.color = 'var(--text-muted)';
        btnPdf.style.textShadow = 'none';
    } else {
        btnPdf.style.background = 'rgba(255,255,255,0.02)';
        btnPdf.style.borderColor = 'var(--border-neon)';
        btnPdf.style.color = color;
        btnPdf.style.textShadow = `0 0 10px ${color}40`;
        
        btnWiki.style.background = 'transparent';
        btnWiki.style.borderColor = 'transparent';
        btnWiki.style.color = 'var(--text-muted)';
        btnWiki.style.textShadow = 'none';
    }
}

/**
 * Bind the active PDF source inside the iframe and configures download action
 */
function loadActivePdf() {
    const iframe = document.getElementById('pdf-iframe');
    const label = document.getElementById('pdf-file-label');
    const downloadBtn = document.getElementById('btn-download-pdf');
    if (!iframe || !label || !downloadBtn) return;

    const filename = TRACK_PDFS[activeTrack];
    const encodedName = encodeURIComponent(filename);
    
    if (iframe.getAttribute('data-active-track') !== activeTrack) {
        iframe.src = encodedName;
        iframe.setAttribute('data-active-track', activeTrack);
    }
    
    label.innerHTML = `<i class="fas fa-file-pdf"></i> notes: <strong>${filename}</strong>`;
    downloadBtn.href = encodedName;
}

/**
 * Switch active coding track
 * @param {string} trackKey 
 */
function switchTrack(trackKey) {
    activeTrack = trackKey;
    
    // Update active visual tabs
    const tabs = document.querySelectorAll('.btn-track-tab');
    tabs.forEach(tab => {
        if (tab.getAttribute('data-track') === trackKey) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Reset notes tabs styles to coordinate colors
    updateTabsColor();

    // Render topics sidebar items
    renderTopics();

    // Load first topic
    const firstTopic = SYLLABUS[trackKey].topics[0];
    loadTopic(firstTopic);

    // Refresh active PDF if the PDF panel is currently visible
    const boxPdf = document.getElementById('pdf-viewer-box');
    if (boxPdf && boxPdf.style.display !== 'none') {
        loadActivePdf();
    }
}

/**
 * Render subtopic items for the selected track
 */
function renderTopics() {
    const container = document.getElementById('topics-list-container');
    if (!container) return;

    container.innerHTML = '';
    const topics = SYLLABUS[activeTrack].topics;

    topics.forEach((topic, idx) => {
        const isCompleted = devState.completedTopics.includes(topic.id);
        const li = document.createElement('li');
        li.id = `sidebar-item-${topic.id}`;
        
        if (isCompleted) {
            li.classList.add('completed');
        }
        if (activeTopic && activeTopic.id === topic.id) {
            li.classList.add('active');
        }

        li.innerHTML = `
            <a href="#" data-index="${idx}">
                <span>${topic.title}</span>
                <i class="fas fa-check-circle completed-check"></i>
            </a>
        `;

        li.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            loadTopic(topics[idx]);
        });

        container.appendChild(li);
    });
}

/**
 * Load topic contents, start API lookups
 * @param {Object} topic 
 */
function loadTopic(topic) {
    activeTopic = topic;

    // Highlight sidebar
    const topicItems = document.querySelectorAll('.topics-list li');
    topicItems.forEach(item => {
        item.classList.remove('active');
        if (item.id === `sidebar-item-${topic.id}`) {
            item.classList.add('active');
        }
    });

    // Update headers
    document.getElementById('track-subject-label').textContent = SYLLABUS[activeTrack].name;
    document.getElementById('track-subject-label').style.color = SYLLABUS[activeTrack].color;
    document.getElementById('track-title-display').textContent = topic.title;

    // Update button
    updateCompletionBtn();

    // Call API fetchers
    fetchWiki(topic.wikiQuery, topic.fallback);
    fetchBooks(topic.libraryQuery);
}

/**
 * Update Mark Complete button visuals
 */
function updateCompletionBtn() {
    const btn = document.getElementById('btn-complete-topic');
    if (!btn || !activeTopic) return;

    const isDone = devState.completedTopics.includes(activeTopic.id);
    if (isDone) {
        btn.className = 'btn btn-secondary';
        btn.style.borderColor = 'var(--color-green)';
        btn.style.color = 'var(--color-green)';
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Compiled';
    } else {
        btn.className = 'btn btn-primary';
        btn.style.borderColor = '';
        btn.style.color = '';
        btn.innerHTML = '<i class="far fa-circle"></i> Mark as Compiled';
    }
}

/**
 * Toggle topic completion status
 */
function toggleTopicCompletion() {
    if (!activeTopic) return;

    const id = activeTopic.id;
    const isDone = devState.completedTopics.includes(id);

    if (!isDone) {
        devState.completedTopics.push(id);
        recordActivity(); // Logs streak day
        showDevToast(`💻 Module compiled: "${activeTopic.title}"!`, 'success');
        
        const sidebar = document.getElementById(`sidebar-item-${id}`);
        if (sidebar) sidebar.classList.add('completed');

        checkCodingBadges();
    } else {
        devState.completedTopics = devState.completedTopics.filter(item => item !== id);
        showDevToast(`Cleared module: "${activeTopic.title}".`, 'info');

        const sidebar = document.getElementById(`sidebar-item-${id}`);
        if (sidebar) sidebar.classList.remove('completed');
    }

    saveDevState();
    updateCompletionBtn();
}

/**
 * Fetch Wikipedia language summary details
 * @param {string} query 
 * @param {string} fallbackText 
 */
function fetchWiki(query, fallbackText) {
    const container = document.getElementById('notes-text-container');
    if (!container) return;

    container.innerHTML = `
        <div class="loader-box">
            <div class="spinner"></div>
            <span>Downloading documentation...</span>
        </div>
    `;

    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(data => {
            if (data.extract) {
                container.innerHTML = `
                    <p class="notes-para">${data.extract}</p>
                    <a href="${data.content_urls.desktop.page}" target="_blank" class="notes-source-link">
                        <i class="fab fa-wikipedia-w"></i> Source Documentation <i class="fas fa-external-link-alt" style="font-size:0.7rem;"></i>
                    </a>
                `;
            } else {
                useFallback();
            }
        })
        .catch(() => {
            useFallback();
        });

    function useFallback() {
        container.innerHTML = `
            <p class="notes-para">${fallbackText}</p>
            <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono); margin-top: 1.5rem; display: flex; align-items: center; gap: 0.4rem;">
                <i class="fas fa-wifi-slash"></i> Offline mode: rendering offline syllabus library documentation.
            </div>
        `;
    }
}

/**
 * Fetch bibliography textbooks via Open Library search
 * @param {string} query 
 */
function fetchBooks(query) {
    const container = document.getElementById('books-carousel-container');
    if (!container) return;

    container.innerHTML = `
        <div class="loader-box" style="grid-column: 1 / -1;">
            <div class="spinner" style="border-top-color: var(--color-violet);"></div>
            <span>Fetching textbook suggestions...</span>
        </div>
    `;

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=4`;

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
        })
        .then(data => {
            if (data.docs && data.docs.length > 0) {
                container.innerHTML = '';
                data.docs.forEach(doc => {
                    const title = doc.title || 'Unknown Title';
                    const author = doc.author_name ? doc.author_name[0] : 'Unknown Author';
                    const cover = doc.cover_i;
                    
                    const coverUrl = cover 
                        ? `https://covers.openlibrary.org/b/id/${cover}-M.jpg`
                        : 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=120&auto=format&fit=crop&q=60';

                    const card = document.createElement('div');
                    card.className = 'book-card';
                    card.innerHTML = `
                        <img class="book-cover" src="${coverUrl}" alt="${title} cover" onerror="this.src='https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=120&auto=format&fit=crop&q=60'">
                        <div class="book-title" title="${title}">${title}</div>
                        <div class="book-author" title="${author}">${author}</div>
                    `;
                    container.appendChild(card);
                });
            } else {
                useFallback();
            }
        })
        .catch(() => {
            useFallback();
        });

    function useFallback() {
        container.innerHTML = `
            <div class="book-card">
                <div class="book-cover" style="display:flex; align-items:center; justify-content:center; font-size:2.5rem; color:var(--text-muted);"><i class="fas fa-file-code"></i></div>
                <div class="book-title">Syllabus Study Guide</div>
                <div class="book-author">CodeVerse Team</div>
            </div>
            <div class="book-card">
                <div class="book-cover" style="display:flex; align-items:center; justify-content:center; font-size:2.5rem; color:var(--text-muted);"><i class="fas fa-laptop-code"></i></div>
                <div class="book-title">Code Lab Handbook</div>
                <div class="book-author">CodeVerse Team</div>
            </div>
            <div class="book-card" style="grid-column: span 2; display: flex; align-items: center; justify-content: center; background: transparent; border: 1px dashed var(--border-neon);">
                <div style="font-size: 0.8rem; color: var(--text-muted); text-align: center; padding: 1rem; font-family: var(--font-mono);">
                    <i class="fas fa-wifi-slash"></i> Offline mode: library books lookup bypassed.
                </div>
            </div>
        `;
    }
}

/**
 * Check completed topics counts and award hacker achievements
 */
function checkCodingBadges() {
    // 1. Python check
    const pyIds = SYLLABUS.python.topics.map(t => t.id);
    if (pyIds.every(id => devState.completedTopics.includes(id))) {
        unlockDevBadge('python_hacker', 'Python Compiler');
    }

    // 2. JS check
    const jsIds = SYLLABUS.javascript.topics.map(t => t.id);
    if (jsIds.every(id => devState.completedTopics.includes(id))) {
        unlockDevBadge('javascript_hacker', 'Async Master');
    }

    // 3. C++ check
    const cppIds = SYLLABUS.cpp.topics.map(t => t.id);
    if (cppIds.every(id => devState.completedTopics.includes(id))) {
        unlockDevBadge('cpp_hacker', 'Systems Engineer');
    }

    // 4. DSA check
    const dsaIds = SYLLABUS.dsa.topics.map(t => t.id);
    if (dsaIds.every(id => devState.completedTopics.includes(id))) {
        unlockDevBadge('dsa_hacker', 'Algorithm Guru');
    }

    // 5. Total count check
    if (devState.completedTopics.length >= 5) {
        unlockDevBadge('code_compiled', 'Code Compiled');
    }
}
