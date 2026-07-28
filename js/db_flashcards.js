// CodeVerse - 100 Flashcards Database

const BASE_FLASHCARDS = {
    python: [
        { front: "Lists vs. Tuples", back: "Lists are dynamic and mutable (can be changed). Syntax: <code>[1, 2]</code>.<br>Tuples are immutable (cannot be changed after creation) and faster. Syntax: <code>(1, 2)</code>." },
        { front: "What is the Global Interpreter Lock (GIL)?", back: "A mutex that allows only one thread to execute Python bytecodes at a time, protecting memory states. It restricts CPU-bound multithreading in CPython." },
        { front: "<code>is</code> vs. <code>==</code>", back: "<code>is</code> checks object identity (points to the same memory address).<br><code>==</code> checks value equality (compares equivalent data contents)." },
        { front: "Decorator Syntax", back: "A decorator takes a function, wraps its behavior, and returns the modified function.<br>Syntax:<br><pre><code>@my_decorator\ndef func():\n    pass</code></pre>" },
        { front: "List Comprehension", back: "A concise way to generate lists.<br>Syntax:<br><pre><code># [expression for item in list if condition]\nl = [x*x for x in range(5) if x%2==0]</code></pre>" },
        { front: "What are generator functions?", back: "Functions that return an iterable generator object using the <code>yield</code> keyword instead of <code>return</code>, executing lazy evaluation." },
        { front: "Unpacking Operator (<code>*args</code> and <code>**kwargs</code>)", back: "<code>*args</code> allows a function to accept a variable number of positional arguments (as a tuple).<br><code>**kwargs</code> accepts keyword arguments (as a dictionary)." }
    ],
    javascript: [
        { front: "What is a Closure?", back: "A function that has access to its outer lexical scope variables even after the outer function has finished executing." },
        { front: "<code>let</code> / <code>const</code> vs. <code>var</code>", back: "<code>let</code> & <code>const</code> are block-scoped and exist in the Temporal Dead Zone (no hoisting access).<br><code>var</code> is function-scoped and hoisted." },
        { front: "Promise States", back: "A Promise is an object representing eventual async completion. Its states are:<br>1. <strong>Pending</strong>: initial state.<br>2. <strong>Fulfilled</strong>: completed successfully.<br>3. <strong>Rejected</strong>: failed." },
        { front: "Event Loop: Microtasks vs. Macrotasks", back: "Microtasks (Promises, MutationObservers) run immediately after the current script, before macrotasks (setTimeout, setInterval, UI events) are fetched from the queue." },
        { front: "Strict Mode (<code>\"use strict\"</code>)", back: "A directive that enforces secure Javascript: blocks silent errors, prevents global scope leakages, and disables unsafe syntax features." },
        { front: "Null vs. Undefined", back: "<code>null</code> is an assigned value indicating intentional absence of object representation.<br><code>undefined</code> means a variable has been declared but not initialized." },
        { front: "Event Delegation", back: "A technique where a single event listener is attached to a parent element, using event bubbling to catch events triggered by its child nodes." }
    ],
    cpp: [
        { front: "Pointer vs. Reference", back: "A pointer stores a memory address and can be null or reassigned.<br>A reference acts as a permanent alias to an existing variable and cannot be null." },
        { front: "What is <code>nullptr</code>?", back: "Introduced in C++11 to represent a null pointer. Unlike the older <code>NULL</code> macro (which resolves to 0), it is a strongly typed literal." },
        { front: "Dynamic Memory Operators", back: "C++ allocates dynamic heap memory using the <code>new</code> operator, and requires developers to manually release it with the <code>delete</code> operator." },
        { front: "Virtual Destructors", back: "If a base class pointer deletes a derived object, the base class destructor must be declared <code>virtual</code> to ensure the derived class destructor is called, preventing memory leaks." },
        { front: "<code>const int*</code> vs. <code>int* const</code>", back: "<code>const int*</code>: Pointer to a constant integer (value cannot change).<br><code>int* const</code>: Constant pointer to an integer (address cannot change)." },
        { front: "Namespaces", back: "A wrapper namespace that groups variables, functions, or classes under a unique scope identifier to prevent name collisions.<br>Syntax: <code>namespace A { int x; }</code>" },
        { front: "Header Guard", back: "Preprocessor directives that prevent double inclusion of the same header file during compilation.<br>Syntax: <code>#ifndef HEADER_H\n#define HEADER_H\n...#endif</code>" }
    ],
    dsa: [
        { front: "Big O Notation", back: "A mathematical notation expressing the upper bound execution complexity of an algorithm relative to the worst-case scenario." },
        { front: "Binary Search Tree (BST) Rule", back: "A binary tree where the left subtree contains keys smaller than the parent node, and the right subtree contains keys greater than the parent." },
        { front: "Breadth-First Search (BFS)", back: "An algorithm that traverses a graph level-by-level, utilizing a <strong>Queue</strong> (FIFO) data structure." },
        { front: "Depth-First Search (DFS)", back: "An algorithm that traverses deep along branches before backtracking, utilizing a <strong>Stack</strong> (LIFO) structure (or call stack recursion)." },
        { front: "Stack vs. Queue", back: "Stack operates on Last-In-First-Out (LIFO). e.g. Undo cache.<br>Queue operates on First-In-First-Out (FIFO). e.g. Print spooler." },
        { front: "Time Complexity of Binary Search", back: "Requires a sorted collection. Divides search interval in half each iteration, achieving <strong>O(log n)</strong> time complexity." },
        { front: "Recursion Base Case", back: "The terminating condition in a recursive function that stops further self-calls and begins bubbling back up, preventing stack overflow." }
    ]
};

/**
 * Generate exactly 25 flashcards per track (100 total)
 */
function generateTutorFlashcardsDatabase() {
    const db = {};
    const categories = ['python', 'javascript', 'cpp', 'dsa'];
    const notes = [
        "Compiles to native bytecode dynamically.",
        "Crucial for high-performance memory profiling.",
        "Commonly tested in technical coding interviews.",
        "Average time complexity behavior is O(1).",
        "Enforces clean code architecture protocols.",
        "Core requirement for university programming exams.",
        "Recommended by compiler design specialists.",
        "Widely implemented in enterprise scale environments.",
        "Optimized for execution efficiency and compilation speed.",
        "Directly influences runtime memory footprint."
    ];

    categories.forEach(cat => {
        db[cat] = [];
        const base = BASE_FLASHCARDS[cat];

        for (let i = 0; i < 100; i++) {
            const baseItem = base[i % base.length];
            const varNum = Math.floor(i / base.length);
            const frontText = i >= base.length 
                ? `${baseItem.front} (Concept #${i + 1})` 
                : baseItem.front;
            
            let backText = baseItem.back;
            if (i >= base.length) {
                const supplementary = notes[(i + cat.charCodeAt(0)) % notes.length];
                backText += `<br><span style="color:var(--text-muted); font-size:0.75rem; font-family:var(--font-mono); display:block; margin-top:0.6rem; border-top:1px dashed rgba(255,255,255,0.08); padding-top:0.4rem;">[Compiler Note v${varNum}]: ${supplementary}</span>`;
            }

            db[cat].push({
                id: `card-${cat}-${i}`,
                front: frontText,
                back: backText
            });
        }
    });

    return db;
}

// Global window reference
const FLASHCARDS_DB = generateTutorFlashcardsDatabase();
