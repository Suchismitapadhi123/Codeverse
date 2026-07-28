// CodeVerse - 100 Questions Quiz Database Generator

const BASE_QUESTIONS = {
    python: [
        {
            question: "What is the output of this list slicing operation?",
            code: "my_list = [10, 20, 30, 40, 50]\nprint(my_list[VAL_A:VAL_B])",
            options: ["OPTION_1", "OPTION_2", "OPTION_3", "OPTION_4"],
            answer: 0,
            generator: (q, idx) => {
                const valA = (idx % 3);
                const valB = 3 + (idx % 3);
                const list = [10, 20, 30, 40, 50, 60, 70];
                const sliced = list.slice(valA, valB);
                q.code = `my_list = ${JSON.stringify(list)}\nprint(my_list[${valA}:${valB}])`;
                q.options = [
                    JSON.stringify(sliced),
                    JSON.stringify(list.slice(valA + 1, valB)),
                    JSON.stringify(list.slice(valA, valB - 1)),
                    JSON.stringify(list.slice(valA + 1, valB + 1))
                ];
                q.answer = 0;
                return q;
            }
        },
        {
            question: "What is the output of this list multiplication operation?",
            code: "lst = [[VAL_A]] * 3\nlst[0].append(VAL_B)\nprint(lst)",
            options: ["OPTION_1", "OPTION_2", "OPTION_3", "OPTION_4"],
            answer: 0,
            generator: (q, idx) => {
                const valA = idx % 5;
                const valB = (idx + 2) % 7;
                q.code = `lst = [[${valA}]] * 3\nlst[0].append(${valB})\nprint(lst)`;
                q.options = [
                    `[[${valA}, ${valB}], [${valA}, ${valB}], [${valA}, ${valB}]]`,
                    `[[${valA}, ${valB}], [${valA}], [${valA}]]`,
                    `[[${valA}], [${valA}], [${valA}]]`,
                    `[[${valA}], [${valA}], [${valA}, ${valB}]]`
                ];
                q.answer = 0;
                return q;
            }
        },
        {
            question: "What is the value of next() iteration in this generator?",
            code: "def g():\n  yield VAL_A\n  yield VAL_B\ngen = g()\nprint(next(gen) + next(gen) + next(gen, 100))",
            options: ["OPTION_1", "OPTION_2", "OPTION_3", "OPTION_4"],
            generator: (q, idx) => {
                const valA = 5 + (idx % 10);
                const valB = 10 + (idx % 5);
                const def = 50 + (idx % 100);
                q.code = `def g():\n  yield ${valA}\n  yield ${valB}\ngen = g()\nprint(next(gen) + next(gen) + next(gen, ${def}))`;
                const ans = valA + valB + def;
                q.options = [
                    `${ans}`,
                    `${valA + valB}`,
                    `Throws StopIteration Error`,
                    `${valA + valB + 10}`
                ];
                q.answer = 0;
                return q;
            }
        },
        {
            question: "What is the value of this lambda expression lookup?",
            code: "x = lambda a, b : a * b + VAL_A\nprint(x(VAL_B, 2))",
            options: ["OPTION_1", "OPTION_2", "OPTION_3", "OPTION_4"],
            generator: (q, idx) => {
                const valA = idx % 6;
                const valB = idx % 8;
                q.code = `x = lambda a, b : a * b + ${valA}\nprint(x(${valB}, 2))`;
                const ans = valB * 2 + valA;
                q.options = [
                    `${ans}`,
                    `${valB * 2}`,
                    `${valB + valA}`,
                    `${ans + 2}`
                ];
                q.answer = 0;
                return q;
            }
        },
        {
            question: "What is the output of the dictionary merge update operation?",
            code: "d = {'x': VAL_A, 'y': VAL_B}\nprint({**d, 'y': 100, 'z': 200})",
            options: ["OPTION_1", "OPTION_2", "OPTION_3", "OPTION_4"],
            generator: (q, idx) => {
                const valA = idx % 10;
                const valB = (idx + 1) % 10;
                q.code = `d = {'x': ${valA}, 'y': ${valB}}\nprint({**d, 'y': 100, 'z': 200})`;
                q.options = [
                    `{'x': ${valA}, 'y': 100, 'z': 200}`,
                    `{'x': ${valA}, 'y': ${valB}, 'z': 200}`,
                    `{'x': ${valA}, 'y': ${valB}, 'y': 100, 'z': 200}`,
                    `TypeError: duplicate keys`
                ];
                q.answer = 0;
                return q;
            }
        }
    ],
    javascript: [
        {
            question: "What is printed by this JavaScript scope closure execution?",
            code: "function make() {\n  let x = VAL_A;\n  return () => {\n    x++;\n    return x;\n  };\n}\nconst f = make();\nconsole.log(f() + f());",
            options: ["OPTION_1", "OPTION_2", "OPTION_3", "OPTION_4"],
            generator: (q, idx) => {
                const valA = 5 + (idx % 10);
                q.code = `function make() {\n  let x = ${valA};\n  return () => {\n    x++;\n    return x;\n  };\n}\nconst f = make();\nconsole.log(f() + f());`;
                // f() returns valA + 1, next f() returns valA + 2. Sum is 2*valA + 3
                const ans = 2 * valA + 3;
                q.options = [
                    `${ans}`,
                    `${(valA + 1) * 2}`,
                    `${valA + 1}`,
                    `${2 * valA + 2}`
                ];
                q.answer = 0;
                return q;
            }
        },
        {
            question: "What is the return type of typeof NaN in JavaScript?",
            code: "console.log(typeof NaN);",
            options: ["'number'", "'nan'", "'undefined'", "'object'"],
            answer: 0
        },
        {
            question: "What is the output of this array map and filter chain?",
            code: "const arr = [1, 2, 3];\nconst res = arr.map(x => x * VAL_A).filter(x => x > VAL_B);\nconsole.log(res);",
            options: ["OPTION_1", "OPTION_2", "OPTION_3", "OPTION_4"],
            generator: (q, idx) => {
                const valA = 2 + (idx % 3); // 2 or 3 or 4
                const valB = 4 + (idx % 3);
                q.code = `const arr = [1, 2, 3];\nconst res = arr.map(x => x * ${valA}).filter(x => x > ${valB});\nconsole.log(res);`;
                const expected = [1, 2, 3].map(x => x * valA).filter(x => x > valB);
                q.options = [
                    JSON.stringify(expected),
                    JSON.stringify([1, 2, 3].map(x => x * valA)),
                    JSON.stringify([]),
                    `TypeError: map is not a function`
                ];
                q.answer = 0;
                return q;
            }
        },
        {
            question: "What does this equality print to the console?",
            code: "console.log([] == ![]);",
            options: ["true", "false", "undefined", "TypeError"],
            answer: 0
        },
        {
            question: "What is the value of this binding call?",
            code: "const obj = { val: VAL_A };\nfunction get() { return this.val; }\nconst bound = get.bind(obj);\nconsole.log(bound() + VAL_B);",
            options: ["OPTION_1", "OPTION_2", "OPTION_3", "OPTION_4"],
            generator: (q, idx) => {
                const valA = 10 + (idx % 15);
                const valB = 5 + (idx % 10);
                q.code = `const obj = { val: ${valA} };\nfunction get() { return this.val; }\nconst bound = get.bind(obj);\nconsole.log(bound() + ${valB});`;
                q.options = [
                    `${valA + valB}`,
                    `${valA}`,
                    `NaN`,
                    `TypeError: bind is not a function`
                ];
                q.answer = 0;
                return q;
            }
        }
    ],
    cpp: [
        {
            question: "What is printed by this dereferenced pointer re-assignment?",
            code: "int x = VAL_A;\nint* p = &x;\n*p = VAL_B;\nstd::cout << x;",
            options: ["OPTION_1", "OPTION_2", "OPTION_3", "OPTION_4"],
            generator: (q, idx) => {
                const valA = 5 + (idx % 10);
                const valB = 20 + (idx % 20);
                q.code = `int x = ${valA};\nint* p = &x;\n*p = ${valB};\nstd::cout << x;`;
                q.options = [
                    `${valB}`,
                    `${valA}`,
                    `Memory address of x`,
                    `Compile Error`
                ];
                q.answer = 0;
                return q;
            }
        },
        {
            question: "What is printed by this pointer arithmetic offset?",
            code: "int arr[] = {10, 20, 30, 40, 50};\nint* ptr = arr;\nptr += VAL_A;\nstd::cout << *ptr + VAL_B;",
            options: ["OPTION_1", "OPTION_2", "OPTION_3", "OPTION_4"],
            generator: (q, idx) => {
                const valA = idx % 4; // 0, 1, 2, 3
                const valB = 5 + (idx % 10);
                const arr = [10, 20, 30, 40, 50];
                q.code = `int arr[] = {10, 20, 30, 40, 50};\nint* ptr = arr;\nptr += ${valA};\nstd::cout << *ptr + ${valB};`;
                const ans = arr[valA] + valB;
                q.options = [
                    `${ans}`,
                    `${arr[valA]}`,
                    `${valB}`,
                    `Compile Error`
                ];
                q.answer = 0;
                return q;
            }
        },
        {
            question: "What is the typical memory size in bytes of a double in C++?",
            code: "std::cout << sizeof(double);",
            options: ["8", "4", "2", "16"],
            answer: 0
        },
        {
            question: "What is the output of this reference variable modification?",
            code: "int a = VAL_A;\nint &ref = a;\nref = VAL_B;\nstd::cout << a;",
            options: ["OPTION_1", "OPTION_2", "OPTION_3", "OPTION_4"],
            generator: (q, idx) => {
                const valA = 100 + (idx % 50);
                const valB = 200 + (idx % 50);
                q.code = `int a = ${valA};\nint &ref = a;\nref = ${valB};\nstd::cout << a;`;
                q.options = [
                    `${valB}`,
                    `${valA}`,
                    `Memory address of a`,
                    `${valA + valB}`
                ];
                q.answer = 0;
                return q;
            }
        },
        {
            question: "What does this virtual method call print to standard output?",
            code: "class Base {\npublic:\n  virtual void show() { std::cout << \"B\"; }\n};\nclass Der : public Base {\npublic:\n  void show() override { std::cout << \"D\"; }\n};\nBase* obj = new Der();\nobj->show();",
            options: ["D", "B", "BD", "Compile Error"],
            answer: 0
        }
    ],
    dsa: [
        {
            question: "What is the average time complexity of searching inside a balanced Binary Search Tree?",
            code: "Node* search(Node* root, int key);",
            options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"],
            answer: 0
        },
        {
            question: "What is the Big-O time complexity of this nested loop structure?",
            code: "void solve(int n) {\n  for (int i = 1; i <= n; i *= 2) {\n    for (int j = 0; j < n; j += VAL_A) {\n      // Constant O(1) ops\n    }\n  }\n}",
            options: ["OPTION_1", "OPTION_2", "OPTION_3", "OPTION_4"],
            generator: (q, idx) => {
                const valA = 1 + (idx % 3);
                q.code = `void solve(int n) {\n  for (int i = 1; i <= n; i *= 2) {\n    for (int j = 0; j < n; j += ${valA}) {\n      // Constant O(1) ops\n    }\n  }\n}`;
                q.options = [
                    "O(n log n)",
                    "O(n²)",
                    "O(log n)",
                    `O(n / ${valA})`
                ];
                q.answer = 0;
                return q;
            }
        },
        {
            question: "What is the worst-case time complexity of Quick Sort?",
            code: "void quickSort(int arr[], int low, int high);",
            options: ["O(n²)", "O(n log n)", "O(n)", "O(2^n)"],
            answer: 0
        },
        {
            question: "Which of the following data structures operates on a Last-In-First-Out (LIFO) stack order?",
            code: "/* Insert: A, B, C -> Remove: C */",
            options: ["Stack", "Queue", "Linked List", "Min Heap"],
            answer: 0
        },
        {
            question: "What is the time complexity of searching in a hash table in the absolute worst case?",
            code: "// Hash collision: all keys resolve to the same index slot bucket",
            options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
            answer: 0
        }
    ]
};

/**
 * Generate exactly 100 unique questions per language track
 */
function generateTutorQuestionsDatabase() {
    const db = {};
    const categories = ['python', 'javascript', 'cpp', 'dsa'];

    categories.forEach(cat => {
        db[cat] = [];
        const base = BASE_QUESTIONS[cat];
        
        // Loop up to 100
        for (let i = 0; i < 100; i++) {
            const baseItem = base[i % base.length];
            // Clone item
            const cloned = {
                id: `q-${cat}-${i}`,
                question: baseItem.question,
                code: baseItem.code,
                options: [...baseItem.options],
                answer: baseItem.answer
            };

            // Mutate item if generator exists
            if (baseItem.generator) {
                baseItem.generator(cloned, i);
            } else {
                // If static, mutate variables in code string if any, or append index to ensure uniqueness
                if (cloned.code && cloned.code.includes('VAL_A')) {
                    cloned.code = cloned.code
                        .replace(/VAL_A/g, `${i}`)
                        .replace(/VAL_B/g, `${i + 1}`);
                }
                // Vary options index randomly
                const originalAns = cloned.options[cloned.answer];
                // Shuffle options
                for (let s = cloned.options.length - 1; s > 0; s--) {
                    const r = Math.floor(Math.random() * (s + 1));
                    const temp = cloned.options[s];
                    cloned.options[s] = cloned.options[r];
                    cloned.options[r] = temp;
                }
                cloned.answer = cloned.options.indexOf(originalAns);
            }

            db[cat].push(cloned);
        }
    });

    return db;
}

// Global window reference
const DOUBT_QUESTIONS_DB = generateTutorQuestionsDatabase();
