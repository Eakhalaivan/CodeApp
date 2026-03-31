import json

materials = [
  {
    "title": "Arrays Basics",
    "category": "DSA",
    "language": "Java",
    "imageUrl": "/card-art/universal.png",
    "tags": ["Java", "DSA"],
    "difficulty": "Beginner",
    "shortDescription": "Understand how arrays store data and how to access elements efficiently.",
    "readTime": "10 min",
    "introduction": "An array is a fixed-size data structure used to store elements of the same type in contiguous memory locations.",
    "coreConcepts": "Arrays allow constant time access using index. They are widely used in algorithms due to predictable memory layout.",
    "keyTopics": ["Indexing", "Traversal", "Insertion & Deletion", "Time Complexity"],
    "deepExplanation": "Each element in an array is accessed using an index starting from 0. Accessing any element takes O(1) time. However, inserting or deleting elements can take O(n) time because elements need to be shifted.",
    "codeExample": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {10, 20, 30, 40};\n        for(int i = 0; i < arr.length; i++) {\n            System.out.println(arr[i]);\n        }\n    }\n}",
    "realWorldUse": "Arrays are used in databases, caching systems, and for implementing other data structures like heaps and hash tables.",
    "keyTakeaways": ["Fast access using index", "Fixed size", "Insertion is costly", "Used in most algorithms"],
    "practiceQuestions": ["Find the largest element in an array", "Reverse an array without using extra space"]
  }
]

languages = [
  ("Binary Search", "DSA", "Java", "universal.png", "Learn how to find an element in O(log N) time using the divide and conquer strategy.", "Intermediate"),
  ("REST API Design", "Backend", "Java", "java.png", "Master building scalable microservices and networked APIs standard in industry.", "Intermediate"),
  ("Exception Handling", "Backend", "Java", "java.png", "Safely intercept runtime errors so your applications do not crash violently for users.", "Beginner"),
  ("Concurrency with Goroutines", "Backend", "Go", "go.png", "Leverage native lightweight threads in Go to execute thousands of simultaneous operations.", "Advanced"),
  ("Rust Ownership Model", "Backend", "Rust", "rust.png", "Eliminate critical memory bug flaws inherently without a physical garbage collector.", "Advanced"),
  ("DOM Manipulation", "Frontend", "JavaScript", "javascript.jpg", "Dynamically augment browser HTML layouts traversing document objects.", "Beginner"),
  ("React Hooks Architecture", "Frontend", "React", "react.png", "Manage persistent frontend logic robustly utilizing isolated modular functional component loops.", "Intermediate"),
  ("C# LINQ Querying", "Backend", "C#", "csharp.png", "Extract complex relational matrices powerfully utilizing inline Language Integrated Query logic.", "Intermediate"),
  ("C++ Memory Management", "Backend", "C++", "cpp.png", "Control rigid hardware RAM physically with raw pointers securely alongside zero-cost hardware abstractions.", "Advanced"),
  ("SQL INNER vs LEFT Joins", "Database", "SQL", "sql.png", "Retrieve distinctly fragmented relational table data successfully into unified tabular reporting arrays.", "Beginner"),
  ("B-Tree Database Indexing", "Database", "SQL", "sql.png", "Bypass catastrophic linear latency scanning seamlessly using deeply balanced tree retrieval architectures.", "Advanced"),
  ("TypeScript Advanced Typings", "Frontend", "TypeScript", "typescript.png", "Deploy aggressive compilation safety protocols thoroughly removing toxic dynamic runtime mutation errors globally.", "Advanced"),
  ("Node.js Event Architecture", "Backend", "Node.js", "nodejs.png", "Leverage explicit purely single-threaded non-blocking functional loops seamlessly rendering ultra-high throughput execution.", "Advanced"),
  ("Go Interface Implementations", "Backend", "Go", "go.png", "Decouple architecture seamlessly without requiring strictly rigid class inheritance syntax natively.", "Intermediate"),
  ("Python Django Models", "Backend", "Python", "python.png", "Deploy robust backend database architectures explicitly seamlessly deploying Python object classes logically natively.", "Beginner"),
  ("CSS Grid & Flexbox", "Frontend", "HTML/CSS", "css.png", "Control webpage layout intuitively entirely abolishing strictly broken float architectures.", "Beginner"),
  ("Vue 3 Reactivity", "Frontend", "Vue", "vue.png", "Master the Vue 3 Composition API to build blazing fast interactive web apps.", "Intermediate"),
  ("Svelte Stores", "Frontend", "Svelte", "svelte.png", "Manage global state gracefully without React-like boilerplate bloat.", "Intermediate"),
  ("Ruby on Rails Active Record", "Backend", "Ruby", "ruby.png", "Query robust databases using simple human-readable sentence structures.", "Beginner"),
  ("Redis Memory Caching", "Database", "Redis", "redis.png", "Eliminate database bottlenecks by returning data instantly using RAM storage.", "Intermediate")
]

for title, cat, lang, img, desc, diff in languages:
    materials.append({
        "title": title,
        "category": cat,
        "language": lang,
        "imageUrl": f"/card-art/{img}",
        "tags": [lang, cat],
        "difficulty": diff,
        "shortDescription": desc,
        "readTime": "15 min",
        "introduction": f"{title} is a core concept in {lang} used extensively in modern tech architectures.",
        "coreConcepts": "Mastering this requires understanding basic memory layout, logical operational constraints, and common enterprise paradigms.",
        "keyTopics": ["Core Syntax", "Design Patterns", "Performance Optimization", "Common Anti-patterns"],
        "deepExplanation": f"In real world applications, {title} dramatically improves physical runtime performance and developer logic parsing. Using {lang}'s native compilation tools allows seamless integration with scalable cloud deployment strategies natively.",
        "codeExample": f"// Example code for {title}\nfunction execute() {{\n    console.log('Optimized runtime deployed!');\n}}",
        "realWorldUse": f"Highly optimized applications at Netflix and Uber heavily rely on {title} to achieve 99.9% uptime Service Level Agreements.",
        "keyTakeaways": ["Always test edge cases.", "Profile memory consumption actively.", "Rely on standard compilation warnings.", "Keep functions small."],
        "practiceQuestions": [f"How does {title} scale effectively?", f"What are the latency tradeoffs in {lang}?"]
    })

with open("problem-service/src/main/resources/materials.json", "w") as f:
    json.dump(materials, f, indent=2)

print("Generated safely.")
