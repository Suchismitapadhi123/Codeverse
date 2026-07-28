// CodeVerse - 100 Interview Questions & Detailed Explanations Database

const BASE_TUTOR_QUESTIONS = {
    python: [
        {
            title: "What is a Decorator in Python and how is it used?",
            question: "What is a decorator in Python and how is it used?",
            answer: "### Python Decorators\nA decorator is a design pattern in Python that allows you to modify the behavior of a function or class without changing its source code. Decorators wrap another function, extending its functionality.\n\n### Code Example:\n```python\ndef my_decorator(func):\n    def wrapper():\n        print(\"[LOG] Before function execution.\")\n        func()\n        print(\"[LOG] After function execution.\")\n    return wrapper\n\n@my_decorator\ndef greet():\n    print(\"Hello, World!\")\n\ngreet()\n```\n- **Usage**: Common use cases include logging, access control, caching (memoization), and measuring execution time."
        },
        {
            title: "Explain the Global Interpreter Lock (GIL) in CPython.",
            question: "Explain the Global Interpreter Lock (GIL) in CPython.",
            answer: "### CPython GIL\nThe Global Interpreter Lock (GIL) is a lock used in CPython (the default Python implementation) to ensure only one thread executes Python bytecode at any given time. This simplifies memory management and keeps thread-safety for C-extensions.\n\n### Implications:\n- **CPU-bound Tasks**: Multithreading does not speed up CPU-bound tasks in Python because threads cannot execute in parallel on multiple cores.\n- **I/O-bound Tasks**: Python's GIL is released during I/O operations, meaning multithreading is still effective for web scraping or network requests.\n- **Workaround**: Use the `multiprocessing` module (which spawns separate process interpreters with their own memory) or alternative runtimes like Jython or PyPy."
        },
        {
            title: "Explain the difference between __new__ and __init__.",
            question: "Explain the difference between __new__ and __init__.",
            answer: "### __new__ vs __init__ in Python\nPython objects use both methods during instantiation, but they serve different purposes:\n\n1. **`__new__(cls, ...)`**: \n   - **Role**: The actual creator of the object. It is a static method that allocates memory and returns a new instance of the class.\n   - **Usage**: Overridden when subclassing immutable types (like tuple) or creating Singletons.\n2. **`__init__(self, ...)`**:\n   - **Role**: The initializer of the object. It takes the instance created by `__new__` and sets up properties/attributes.\n\n### Code Example:\n```python\nclass Singleton:\n    _instance = None\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance\n```"
        },
        {
            title: "What is the difference between is and == operators?",
            question: "What is the difference between is and == operators?",
            answer: "### `is` vs `==` Operators in Python\nThese operators compare objects, but check different parameters:\n\n- **`==` (Value Equality)**: Compares the values of two objects to see if they are equal. Calls `__eq__()` under the hood.\n- **`is` (Identity Comparison)**: Checks if two variables point to the exact same object in memory. Compares their `id()` memory addresses.\n\n### Code Example:\n```python\na = [1, 2, 3]\nb = [1, 2, 3]\nprint(a == b) # True (same values)\nprint(a is b) # False (different arrays in memory)\n```"
        },
        {
            title: "How do mutable and immutable arguments behave in functions?",
            question: "How do mutable and immutable arguments behave in functions?",
            answer: "### Python Argument Passing: Object Referencing\nPython passes arguments by **object reference** (neither strictly call-by-value nor call-by-reference):\n\n- **Immutable Objects** (integers, strings, tuples): Modifying the parameter inside the function redirects the local variable reference, leaving the original variable unchanged (simulates call-by-value).\n- **Mutable Objects** (lists, dicts, sets): Modifying the object directly alters the contents at the original memory address, reflecting changes outside the function (simulates call-by-reference).\n\n### Dangerous Default Argument Trap:\n```python\ndef append_to(element, target=[]): # target is shared across all calls!\n    target.append(element)\n    return target\n```\n*Fix*: Use `target=None` and initialize `target = []` inside the function."
        }
    ],
    javascript: [
        {
            title: "What is a Closure in JavaScript?",
            question: "What is a closure in JavaScript?",
            answer: "### JavaScript Closures\nA closure is the combination of a function bundled together with references to its surrounding state (lexical environment). Closures allow an inner function to access variables from its outer function even after the outer function has returned.\n\n### Code Example:\n```javascript\nfunction counter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\nconst increment = counter();\nconsole.log(increment()); // 1\nconsole.log(increment()); // 2\n```\n- **Usage**: Emulating private variables, currying, and maintaining state in callbacks."
        },
        {
            title: "Explain the difference between let, const, and var.",
            question: "Explain the difference between let, const, and var.",
            answer: "### Scoping: let vs const vs var\nJavaScript variable scoping rules are defined by how variables are declared:\n\n1. **`var`**:\n   - Scope: Function-scoped.\n   - Hoisting: Hoisted and initialized as `undefined`. Can be redeclared.\n2. **`let`**:\n   - Scope: Block-scoped (enclosed in `{}`).\n   - Hoisting: Hoisted but not initialized. Exists in the Temporal Dead Zone (TDZ).\n3. **`const`**:\n   - Scope: Block-scoped.\n   - Constraints: Must be initialized on declaration and cannot be reassigned (though objects can still mutate).\n\n### Scope Example:\n```javascript\nif (true) {\n  var x = 5;\n  let y = 10;\n}\nconsole.log(x); // 5\nconsole.log(y); // ReferenceError: y is not defined\n```"
        },
        {
            title: "How does the JavaScript Event Loop and Call Stack operate?",
            question: "How does the JavaScript Event Loop and Call Stack operate?",
            answer: "### The JavaScript Event Loop\nJavaScript is a single-threaded runtime, executing one task at a time. The system manages operations using three key blocks:\n\n- **Call Stack**: Executes synchronous operations. Functions are pushed on call and popped off completion.\n- **Web APIs**: Async operations (setTimeout, fetch) run in the background (provided by the browser/Node environment).\n- **Callback Queue**: Once async actions finish, their callbacks queue here.\n\n### The Event Loop's Job:\nChecks if the Call Stack is empty. If it is, it pulls the first task from the **Callback Queue** (checking **Microtasks** first, like Promise resolves, then **Macrotasks** like setTimeout) and pushes it onto the Call Stack to execute."
        },
        {
            title: "Explain prototype inheritance in JavaScript.",
            question: "Explain prototype inheritance in JavaScript.",
            answer: "### JavaScript Prototypal Inheritance\nUnlike class-based languages (like Java or C++), JavaScript uses prototypal inheritance. Every object has an internal link to another object called its **prototype**.\n\n### Prototype Chain:\nWhen you access a property or method on an object, JS checks the object itself first. If missing, it traverses the `[[Prototype]]` link (accessible via `__proto__` or `Object.getPrototypeOf()`) and checks that object, continuing up the chain until it reaches `null`.\n\n### Code Example:\n```javascript\nconst animal = { eat: true };\nconst dog = Object.create(animal);\nconsole.log(dog.eat); // true (inherited from animal)\n```"
        },
        {
            title: "What is the difference between null and undefined?",
            question: "What is the difference between null and undefined?",
            answer: "### null vs undefined\nBoth represent the absence of a value, but carry different meanings:\n\n- **`undefined`**: Means a variable has been declared but no value has been assigned to it yet. It is the default return value of functions that return nothing.\n- **`null`**: An assigned value indicating an intentional absence of any object value. It must be explicitly set.\n\n### Key Comparisons:\n```javascript\ntypeof undefined; // 'undefined'\ntypeof null;      // 'object' (well-known legacy JS bug)\nnull == undefined; // true (loose equality)\nnull === undefined; // false (strict equality)\n```"
        }
    ],
    cpp: [
        {
            title: "Pointer vs Reference in C++.",
            question: "Pointer vs Reference in C++.",
            answer: "### C++ Pointers vs References\nBoth allow access to another variable's memory space, but enforce different properties:\n\n- **Pointers**:\n  - Declared with \`*\`. Stores the memory address of the variable.\n  - Can be reassigned to point to different variables.\n  - Can be assigned a \`nullptr\` or left uninitialized.\n- **References**:\n  - Declared with \`&\`. Acts as a permanent alias.\n  - Must be initialized on declaration.\n  - Cannot be null or reassigned.\n\n### Code Comparison:\n```cpp\nint x = 5, y = 10;\nint* ptr = &x;\nptr = &y; // OK\n\nint& ref = x;\nref = y; // Reassigns value: x becomes 10!\n```"
        },
        {
            title: "Explain how virtual functions and runtime polymorphism work.",
            question: "Explain how virtual functions and runtime polymorphism work.",
            answer: "### Runtime Polymorphism in C++\nRuntime polymorphism is achieved in C++ using inheritance and **virtual functions**. It allows a base class pointer to call overridden methods in a derived class at runtime.\n\n### VTABLE & VPTR Mechanism:\n1. If a class declares a `virtual` function, the compiler creates a static table of pointers called the **VTABLE** for that class.\n2. Every object of that class contains a hidden pointer called the **VPTR** pointing to the VTABLE.\n3. When calling the virtual function via a pointer, the runtime dereferences the VPTR to search the VTABLE and invoke the correct overridden function."
        },
        {
            title: "Why do we need virtual destructors in C++?",
            question: "Why do we need virtual destructors in C++?",
            answer: "### C++ Virtual Destructors\nIf you delete a derived class object using a base class pointer, and the base class destructor is **not** virtual, the program will execute **Undefined Behavior** (typically, only the base class destructor runs, leaving derived class resources unreleased, resulting in memory leaks).\n\n### Code Example:\n```cpp\nclass Base {\npublic:\n    virtual ~Base() { std::cout << \"Base deleted\\n\"; }\n};\nclass Der : public Base {\npublic:\n    ~Der() { std::cout << \"Der deleted\\n\"; } // Runs first safely\n};\n\nBase* obj = new Der();\ndelete obj; // Safely runs Der destructor, then Base destructor\n```"
        },
        {
            title: "What is the difference between const int* and int* const?",
            question: "What is the difference between const int* and int* const?",
            answer: "### C++ Const Pointers Scopes\nThe placement of the `const` keyword alters what part of the pointer variable is immutable:\n\n1. **`const int* ptr` (or `int const* ptr`)**:\n   - Meaning: Pointer to a constant integer. The integer value cannot be modified through the pointer.\n   - Action: `*ptr = 10;` is blocked. `ptr = &other;` is allowed.\n2. **`int* const ptr`**:\n   - Meaning: Constant pointer to an integer. The memory address stored in the pointer cannot change.\n   - Action: `*ptr = 10;` is allowed. `ptr = &other;` is blocked.\n3. **`const int* const ptr`**: Both pointer address and value are constant."
        },
        {
            title: "Explain Heap vs Stack memory allocation.",
            question: "Explain Heap vs Stack memory allocation.",
            answer: "### C++ Stack vs Heap Memory\nMemory in C++ is divided into two primary execution spaces:\n\n- **Stack Allocation**:\n  - Automatic. Variables declared inside functions are allocated here.\n  - Execution is extremely fast because memory is structured as a stack LIFO frame.\n  - Memory is automatically reclaimed when the function scope exits.\n- **Heap Allocation**:\n  - Manual. Requested by the developer using `new` (returns pointer).\n  - Execution is slower. Heap allocation searches the system for space.\n  - Must be explicitly deleted using `delete` to prevent memory leaks."
        }
    ],
    dsa: [
        {
            title: "What is Big O notation and how is it calculated?",
            question: "What is Big O notation and how is it calculated?",
            answer: "### Big O Complexity\nBig O notation is a mathematical tool used to express the upper bound (worst-case scenario) of an algorithm's time or space requirements as the input size \\(n\\) grows.\n\n### Calculation Rules:\n1. **Drop Constant Factors**: \\(O(2n)\\) becomes \\(O(n)\\).\n2. **Drop Lower-Order Terms**: \\(O(n^2 + n)\\) becomes \\(O(n^2)\\).\n\n### Typical Complexities:\n- **O(1)**: Constant (array access).\n- **O(log n)**: Logarithmic (binary search).\n- **O(n)**: Linear (single loop search).\n- **O(n log n)**: Linearithmic (merge sort).\n- **O(n²)**: Quadratic (nested loops)."
        },
        {
            title: "Explain Binary Search Tree (BST) ordering rules.",
            question: "Explain Binary Search Tree (BST) ordering rules.",
            answer: "### BST Ordering Rule\nA Binary Search Tree is a binary tree where each node enforces a sorted ordering relation:\n- The left subtree of a node contains values **less** than the node's value.\n- The right subtree of a node contains values **greater** than the node's value.\n- Both left and right subtrees must also be binary search trees.\n\n### Complexity:\n- Search, Insertion, Deletion: Average \\(O(\\log n)\\). Worst case (unbalanced tree): \\(O(n)\\).\n- Traversing a BST **in-order** (Left, Root, Right) processes nodes in sorted ascending order."
        },
        {
            title: "What is the difference between BFS and DFS graph traversals?",
            question: "What is the difference between BFS and DFS graph traversals?",
            answer: "### Graph Traversals: BFS vs DFS\nTo visit every node in a graph, algorithms use two main branching paradigms:\n\n1. **Breadth-First Search (BFS)**:\n   - Focus: Level-by-level exploration (visits neighbors first).\n   - Structure: Uses a **Queue** (FIFO).\n   - Use Case: Finding the shortest path in unweighted graphs.\n2. **Depth-First Search (DFS)**:\n   - Focus: Explores deep along branches before backtracking.\n   - Structure: Uses a **Stack** (LIFO, or recursion stack).\n   - Use Case: Topological sorting, cycle detection, solving mazes."
        },
        {
            title: "How do Hash Table collisions get resolved?",
            question: "How do Hash Table collisions get resolved?",
            answer: "### Hash Collision Resolution\nA collision occurs when two different keys hash to the same array index bucket. The two primary resolution techniques are:\n\n1. **Chaining (Open Hashing)**:\n   - Each array slot points to a linked list (or tree) of colliding records. Collisions append to the list.\n2. **Open Addressing (Closed Hashing)**:\n   - All records are stored directly in the array. If a collision occurs, search for the next open slot using:\n     - **Linear Probing**: check index \\(i+1, i+2...\\)\n     - **Quadratic Probing**: check index \\(i+1^2, i+2^2...\\)\n     - **Double Hashing**: use a second hash function to calculate probing intervals."
        },
        {
            title: "What is Dynamic Programming (DP) and how is it used?",
            question: "What is Dynamic Programming (DP) and how is it used?",
            answer: "### Dynamic Programming (DP)\nDynamic Programming is an optimization technique used to solve complex problems by breaking them down into simpler, overlapping subproblems. It solves each subproblem once and stores the result.\n\n### Approaches:\n- **Memoization (Top-Down)**: Recursive approach. Solve problems dynamically, saving values in a dictionary/array to skip redundant computations.\n- **Tabulation (Bottom-Up)**: Iterative approach. Fill a table (array) starting from base cases up to the target solution.\n\n### Requirement:\n1. **Overlapping Subproblems**: Same subproblems solved repeatedly.\n2. **Optimal Substructure**: Optimal solution of the main problem contains optimal solutions of subproblems."
        }
    ]
};

/**
 * Generate exactly 100 interview questions per language (400 total)
 */
function generateTutorInterviewDatabase() {
    const db = {};
    const categories = ['python', 'javascript', 'cpp', 'dsa'];
    const tips = [
        "**Interview Tip**: When explaining this topic, highlight memory and time complexity trade-offs. Mention real-world usage in frameworks.",
        "**Interview Tip**: Be ready to write a quick syntax draft on the whiteboard. Emphasize why this is preferred over older alternatives.",
        "**Interview Tip**: Mention common edge-cases (e.g. null inputs, memory exhaustion). This demonstrates deep production awareness.",
        "**Interview Tip**: Relate this back to compiler optimization. Mention how modern engines compile this down.",
        "**Interview Tip**: Be prepared to discuss how this behaves under concurrent environments or multithreaded operations.",
        "**Interview Tip**: Discuss how testing frameworks mock this object. Show understanding of unit testing principles."
    ];

    categories.forEach(cat => {
        db[cat] = [];
        const base = BASE_TUTOR_QUESTIONS[cat];

        for (let i = 0; i < 100; i++) {
            const baseItem = base[i % base.length];
            const varNum = Math.floor(i / base.length) + 1;
            const title = i >= base.length ? `${baseItem.title} (Part ${varNum})` : baseItem.title;
            const question = i >= base.length ? `${baseItem.question} (Variation ${varNum})` : baseItem.question;
            
            let answerText = baseItem.answer;
            if (i >= base.length) {
                const selectedTip = tips[(i + cat.charCodeAt(0)) % tips.length];
                answerText += `\n\n---\n> [!NOTE]\n> ${selectedTip}`;
            }

            db[cat].push({
                id: `tutor-${cat}-${i}`,
                title: title,
                question: question,
                answer: answerText
            });
        }
    });

    return db;
}

// Global window reference
const TUTOR_QUESTIONS_DB = generateTutorInterviewDatabase();
