package com.leetcode.clone.problem;

import com.leetcode.clone.problem.entity.Problem;
import com.leetcode.clone.problem.entity.Tag;
import com.leetcode.clone.problem.entity.TestCase;
import com.leetcode.clone.problem.repository.ProblemRepository;
import com.leetcode.clone.problem.repository.TagRepository;
import com.leetcode.clone.problem.repository.TestCaseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class ProblemDataInitializer implements CommandLineRunner {

    private final ProblemRepository problemRepository;
    private final TestCaseRepository testCaseRepository;
    private final TagRepository tagRepository;

    public ProblemDataInitializer(ProblemRepository problemRepository, TestCaseRepository testCaseRepository, TagRepository tagRepository) {
        this.problemRepository = problemRepository;
        this.testCaseRepository = testCaseRepository;
        this.tagRepository = tagRepository;
    }

    @Override
    public void run(String... args) {
        problemRepository.deleteAll();
        seedJava();
        seedJavaScript();
        seedTypeScript();
        seedReact();
        seedReactNative();
        seedHTML();
        seedCSS();
        seedAngular();
        seedC();
        seedCSharp();
        seedCPP();
        seedRuby();
        seedGo();
        seedKotlin();
        seedNodeJS();
        seedRust();
        seedRedis();
        seedVue();
        seedSvelte();
        seedOracle();
        seedSQL();
        seedMySQL();
        seedPostgreSQL();
        seedMongoDB();
        System.out.println("✅ All language tracks seeded!");
    }

    // ── JAVA ──────────────────────────────────────────────────────────────────
    private void seedJava() {
        String lang = "Java"; String cat = "Backend,Java";
        p("Java: Two Sum",               Problem.Difficulty.EASY,   cat, "Amazon,Google",    "<p>Given an integer array <code>nums</code> and a <code>target</code>, return indices of the two numbers that add up to target.</p>", "2≤nums.length≤10^4", lang, new String[][]{
            {"[2,7,11,15], target=9","[0,1]"},
            {"[3,2,4], target=6","[1,2]"},
            {"[3,3], target=6","[0,1]"}
        });
        p("Java: Reverse Linked List",   Problem.Difficulty.EASY,   cat, "Microsoft",        "<p>Reverse a singly linked list iteratively.</p>", "0≤n≤5000", lang, new String[][]{{"[1,2,3,4,5]","[5,4,3,2,1]"}});
        p("Java: LRU Cache",             Problem.Difficulty.MEDIUM,  cat, "Amazon,Facebook",  "<p>Design a data structure that follows LRU cache constraints with O(1) get and put.</p>", "1≤capacity≤3000", lang, new String[][]{{"capacity=2, put(1,1),put(2,2),get(1)","1"}});
        p("Java: Binary Search Tree",    Problem.Difficulty.MEDIUM,  cat, "Google",           "<p>Implement insert, search, and delete operations on a BST.</p>", "BST properties must be maintained.", lang, new String[][]{{"insert(5,3,7), search(3)","true"}});
        p("Java: Spring REST API",       Problem.Difficulty.HARD,    cat, "Netflix",          "<p>Build a RESTful CRUD API using Spring Boot with proper exception handling and DTOs.</p>", "Must follow REST conventions.", lang, new String[][]{{"GET /users/1","{id:1, name:'Alice'}"}});
        p("Java: Multithreading Deadlock",Problem.Difficulty.HARD,   cat, "Oracle",           "<p>Identify and fix a deadlock condition in a given multithreaded Java program.</p>", "Use synchronized blocks correctly.", lang, new String[][]{{"Thread A and B deadlock","Fixed: proper lock ordering"}});
    }

    // ── JAVASCRIPT ────────────────────────────────────────────────────────────
    private void seedJavaScript() {
        String lang = "JavaScript"; String cat = "Frontend,JavaScript";
        p("JS: Deep Flatten Array",         Problem.Difficulty.EASY,   cat, "Google",     "<p>Flatten a deeply nested array: <code>[1,[2,[3,[4]]]] → [1,2,3,4]</code>.</p>", "Handle arbitrary depth.", lang, new String[][]{{"[1,[2,[3]]]","[1,2,3]"}});
        p("JS: Debounce Function",          Problem.Difficulty.MEDIUM,  cat, "Airbnb",    "<p>Implement a <code>debounce</code> function that delays invoking fn until after wait ms.</p>", "Must clear previous timer.", lang, new String[][]{{"debounce(fn,300)","Only fires after 300ms pause"}});
        p("JS: Promise.all Polyfill",       Problem.Difficulty.MEDIUM,  cat, "Facebook",  "<p>Implement your own <code>Promise.all</code> that resolves when all promises resolve or rejects on first failure.</p>", "Must return array of results.", lang, new String[][]{{"Promise.all([p1,p2])","[res1,res2]"}});
        p("JS: Event Delegation",           Problem.Difficulty.EASY,   cat, "Shopify",   "<p>Use event delegation to handle clicks on dynamically added list items.</p>", "Use a single listener on the parent.", lang, new String[][]{{"click on li","handler fires"}});
        p("JS: Throttle Function",          Problem.Difficulty.MEDIUM,  cat, "Twitter",   "<p>Implement a <code>throttle</code> function that fires at most once per interval.</p>", "Must use timestamps.", lang, new String[][]{{"throttle(fn,1000)","Called once per second max"}});
        p("JS: Closure Counter",            Problem.Difficulty.EASY,   cat, "Amazon",    "<p>Create a counter using closures that has increment, decrement, and reset methods.</p>", "State must be private.", lang, new String[][]{{"counter.increment()","1"}});
    }

    // ── TYPESCRIPT ────────────────────────────────────────────────────────────
    private void seedTypeScript() {
        String lang = "TypeScript"; String cat = "Frontend,TypeScript";
        p("TS: Generic Filter Function",    Problem.Difficulty.EASY,   cat, "Microsoft",  "<p>Create a type-safe <code>filter&lt;T&gt;</code> using generics.</p>", "Preserve input type.", lang, new String[][]{{"filter<number>([1,2,3],n=>n>1)","[2,3]"}});
        p("TS: Mapped Types",               Problem.Difficulty.MEDIUM,  cat, "Microsoft",  "<p>Create a <code>Readonly&lt;T&gt;</code> utility type using mapped types.</p>", "All properties must be readonly.", lang, new String[][]{{"Readonly<{a:string}>","readonly a: string"}});
        p("TS: Discriminated Unions",       Problem.Difficulty.MEDIUM,  cat, "Stripe",    "<p>Model a payment result using discriminated unions with success and error states.</p>", "Must narrow correctly.", lang, new String[][]{{"type Result","success | failure"}});
        p("TS: Decorator Pattern",          Problem.Difficulty.HARD,    cat, "Google",    "<p>Implement a class decorator that logs method calls with their arguments.</p>", "Use experimentalDecorators.", lang, new String[][]{{"@log myMethod(1,2)","Logged: myMethod(1,2)"}});
        p("TS: Conditional Types",          Problem.Difficulty.HARD,    cat, "Vercel",    "<p>Write a conditional type <code>IsArray&lt;T&gt;</code> that returns true if T is an array.</p>", "Works at compile time.", lang, new String[][]{{"IsArray<number[]>","true"}});
    }

    // ── REACT ─────────────────────────────────────────────────────────────────
    private void seedReact() {
        String lang = "React"; String cat = "Frontend,React";
        p("React: useLocalStorage Hook",    Problem.Difficulty.MEDIUM,  cat, "Meta",      "<p>Implement a custom <code>useLocalStorage</code> hook that syncs state with localStorage.</p>", "Support string, number, object.", lang, new String[][]{{"useLocalStorage('key','default')","Persisted value"}});
        p("React: Infinite Scroll",         Problem.Difficulty.MEDIUM,  cat, "Instagram", "<p>Build an infinite scroll list using IntersectionObserver and React hooks.</p>", "Must not re-fetch on unmount.", lang, new String[][]{{"scroll to bottom","Next page loads"}});
        p("React: Context + Reducer",       Problem.Difficulty.MEDIUM,  cat, "Meta",      "<p>Build a global theme toggle using useContext and useReducer.</p>", "No external libraries.", lang, new String[][]{{"toggle()","dark ↔ light"}});
        p("React: Virtual List",            Problem.Difficulty.HARD,    cat, "Airbnb",    "<p>Implement a virtualized list that only renders visible rows for 10,000 items.</p>", "Smooth scroll required.", lang, new String[][]{{"10000 items","Only visible rows rendered"}});
        p("React: Compound Component",      Problem.Difficulty.HARD,    cat, "Storybook", "<p>Build a <code>&lt;Menu&gt;</code> compound component with <code>&lt;Menu.Item&gt;</code> children.</p>", "Share state via context.", lang, new String[][]{{"<Menu><Menu.Item/></Menu>","Works as unit"}});
    }

    // ── REACT NATIVE ──────────────────────────────────────────────────────────
    private void seedReactNative() {
        String lang = "React Native"; String cat = "Frontend,React Native";
        p("RN: FlatList Optimization",      Problem.Difficulty.MEDIUM,  cat, "Meta",      "<p>Optimize a React Native FlatList to handle 10,000 items without jank.</p>", "Use keyExtractor and getItemLayout.", lang, new String[][]{{"10000 items","60fps scroll"}});
        p("RN: Custom Animated Button",     Problem.Difficulty.MEDIUM,  cat, "Shopify",   "<p>Create an animated press-feedback button using the Animated API.</p>", "Scale on press.", lang, new String[][]{{"press button","scale 0.95 animation"}});
        p("RN: Bottom Sheet Modal",         Problem.Difficulty.HARD,    cat, "Uber",      "<p>Build a gesture-driven bottom sheet modal from scratch using PanResponder.</p>", "Must snap to open/closed positions.", lang, new String[][]{{"swipe up","sheet opens"}});
        p("RN: Push Notifications Setup",   Problem.Difficulty.EASY,    cat, "Twitter",   "<p>Configure Expo push notifications with permission request and token retrieval.</p>", "Handle both iOS and Android.", lang, new String[][]{{"requestPermission()","Token returned"}});
        p("RN: Navigation Stack",           Problem.Difficulty.EASY,    cat, "Meta",      "<p>Set up React Navigation with a stack navigator and pass params between screens.</p>", "Use TypeScript for route types.", lang, new String[][]{{"navigate('Detail',{id:1})","Detail screen shows id=1"}});
    }

    // ── HTML ──────────────────────────────────────────────────────────────────
    private void seedHTML() {
        String lang = "HTML/CSS"; String cat = "Frontend,HTML/CSS";
        p("HTML: Semantic Layout",          Problem.Difficulty.EASY,   cat, "Google",    "<p>Build a semantic HTML5 page layout using header, nav, main, article, aside, and footer.</p>", "No divitis.", lang, new String[][]{{"page structure","Valid semantic HTML"}});
        p("HTML: Accessible Form",          Problem.Difficulty.EASY,   cat, "Airbnb",    "<p>Create an accessible login form with proper labels, ARIA attributes, and keyboard navigation.</p>", "WCAG 2.1 AA compliant.", lang, new String[][]{{"form","aria-label, for/id pairs"}});
        p("HTML: Custom Data Attributes",   Problem.Difficulty.EASY,   cat, "Shopify",   "<p>Use <code>data-*</code> attributes to store metadata on DOM elements and read with JavaScript.</p>", "Use dataset API.", lang, new String[][]{{"data-id='42'","el.dataset.id === '42'"}});
        p("HTML: Canvas Drawing App",       Problem.Difficulty.MEDIUM,  cat, "Adobe",    "<p>Build a simple drawing app using the HTML5 Canvas API with pen size and color selection.</p>", "Mouse and touch events.", lang, new String[][]{{"draw on canvas","Line appears"}});
        p("HTML: Web Components",           Problem.Difficulty.HARD,    cat, "Google",   "<p>Create a custom <code>&lt;user-card&gt;</code> web component using the CustomElements API.</p>", "Use Shadow DOM.", lang, new String[][]{{"<user-card name='Alice'/>","Renders card"}});
    }

    // ── CSS ───────────────────────────────────────────────────────────────────
    private void seedCSS() {
        String lang = "CSS"; String cat = "Frontend,CSS";
        p("CSS: Flexbox Nav Bar",           Problem.Difficulty.EASY,   cat, "Airbnb",    "<p>Build a responsive navigation bar using Flexbox with a logo on the left and links on the right.</p>", "Must be mobile-friendly.", lang, new String[][]{{"flex layout","Responsive nav"}});
        p("CSS: CSS Grid Dashboard",        Problem.Difficulty.MEDIUM,  cat, "Google",   "<p>Create a dashboard layout using CSS Grid with a sidebar, header, and main content area.</p>", "Auto-fill columns.", lang, new String[][]{{"grid-template-areas","Full dashboard layout"}});
        p("CSS: Dark Mode Toggle",          Problem.Difficulty.MEDIUM,  cat, "GitHub",   "<p>Implement a dark/light mode toggle using CSS custom properties and a checkbox hack.</p>", "No JavaScript.", lang, new String[][]{{"checkbox:checked","Dark theme applied"}});
        p("CSS: Animated Loader",           Problem.Difficulty.EASY,   cat, "Dribbble",  "<p>Build a spinning loader using CSS animations and keyframes.</p>", "Smooth 360° rotation.", lang, new String[][]{{"@keyframes spin","Spinner animates"}});
        p("CSS: Glassmorphism Card",        Problem.Difficulty.MEDIUM,  cat, "Figma",    "<p>Create a glassmorphism card effect using backdrop-filter, transparency, and border.</p>", "Must work in Chrome/Firefox.", lang, new String[][]{{"backdrop-filter: blur(10px)","Frosted glass card"}});
    }

    // ── ANGULAR ───────────────────────────────────────────────────────────────
    private void seedAngular() {
        String lang = "Angular"; String cat = "Frontend,Angular";
        p("Angular: Reactive Form",         Problem.Difficulty.MEDIUM,  cat, "Google",   "<p>Build a reactive form with validation for name, email, and password fields.</p>", "Use FormBuilder and validators.", lang, new String[][]{{"invalid email","Error message shown"}});
        p("Angular: Custom Directive",      Problem.Difficulty.MEDIUM,  cat, "SAP",      "<p>Create a custom attribute directive that highlights an element on hover.</p>", "Use HostListener.", lang, new String[][]{{"<p appHighlight>","Background changes on hover"}});
        p("Angular: HTTP Interceptor",      Problem.Difficulty.HARD,    cat, "Microsoft","<p>Implement an HTTP interceptor that attaches a JWT token to every outgoing request.</p>", "Handle 401 and retry.", lang, new String[][]{{"GET /api/data","Authorization header attached"}});
        p("Angular: Lazy Loading",          Problem.Difficulty.MEDIUM,  cat, "Google",   "<p>Configure lazy loading for a feature module with its own routing.</p>", "Use loadChildren.", lang, new String[][]{{"navigate to /dashboard","Module loaded on demand"}});
        p("Angular: NgRx State Management", Problem.Difficulty.HARD,    cat, "Cisco",    "<p>Set up NgRx store with actions, reducers, and effects for a product list feature.</p>", "Must include effects for API calls.", lang, new String[][]{{"dispatch(loadProducts)","Products in store"}});
    }

    // ── C ─────────────────────────────────────────────────────────────────────
    private void seedC() {
        String lang = "C"; String cat = "Backend,C";
        p("C: Pointer Arithmetic",          Problem.Difficulty.EASY,   cat, "Embedded",  "<p>Write a function that traverses an array using pointer arithmetic instead of indexing.</p>", "No array subscript operator.", lang, new String[][]{{"int arr[5]","Sum via pointer"}});
        p("C: Dynamic Memory Allocator",    Problem.Difficulty.HARD,    cat, "OS Course", "<p>Implement a simple malloc/free using a free list with first-fit strategy.</p>", "Must handle fragmentation.", lang, new String[][]{{"malloc(100)","Pointer returned"}});
        p("C: String Reversal In-Place",    Problem.Difficulty.EASY,   cat, "Microsoft", "<p>Reverse a C string in-place using two pointers.</p>", "Null-terminated char array.", lang, new String[][]{{"\"hello\"","\"olleh\""}});
        p("C: Linked List Operations",      Problem.Difficulty.MEDIUM,  cat, "Interview", "<p>Implement insert, delete, and search on a singly linked list in C using structs.</p>", "Use malloc and free correctly.", lang, new String[][]{{"insert(3)","Node added"}});
        p("C: File I/O Read & Write",       Problem.Difficulty.MEDIUM,  cat, "Systems",  "<p>Write a program that copies content from one file to another using fopen, fread, fwrite.</p>", "Handle file-not-found error.", lang, new String[][]{{"input.txt","Output copied to output.txt"}});
    }

    // ── C# ────────────────────────────────────────────────────────────────────
    private void seedCSharp() {
        String lang = "C#"; String cat = "Backend,C#";
        p("C#: LINQ Grouping",              Problem.Difficulty.EASY,   cat, "Microsoft",  "<p>Use LINQ to group a list of employees by department and calculate average salary.</p>", "Use GroupBy and Select.", lang, new String[][]{{"employees list","Grouped by dept"}});
        p("C#: Async/Await Pattern",        Problem.Difficulty.MEDIUM,  cat, "Microsoft",  "<p>Implement an async method that fetches data from multiple APIs concurrently.</p>", "Use Task.WhenAll.", lang, new String[][]{{"await FetchAll()","All results returned"}});
        p("C#: Dependency Injection",       Problem.Difficulty.MEDIUM,  cat, "Microsoft",  "<p>Set up constructor injection in ASP.NET Core with a scoped service and interface.</p>", "Register in Program.cs.", lang, new String[][]{{"IMyService injected","Service resolves"}});
        p("C#: Observer Pattern",           Problem.Difficulty.HARD,    cat, "Unity",      "<p>Implement the Observer pattern using C# events and delegates.</p>", "Multiple subscribers supported.", lang, new String[][]{{"event.Subscribe(handler)","Handler called on notify"}});
        p("C#: Entity Framework Migrations",Problem.Difficulty.HARD,    cat, "Microsoft",  "<p>Create and apply an EF Core migration to add a new nullable column to an existing table.</p>", "Code-first approach.", lang, new String[][]{{"dotnet ef migrations add","Migration applied"}});
    }

    // ── C++ ───────────────────────────────────────────────────────────────────
    private void seedCPP() {
        String lang = "C++"; String cat = "Backend,C++";
        p("C++: Pointer Reverse String",   Problem.Difficulty.MEDIUM,  cat, "Nvidia",    "<p>Reverse a null-terminated C-string using pointer arithmetic.</p>", "In-place modification.", lang, new String[][]{{"\"cpp\"","\"ppc\""}});
        p("C++: STL Map Word Count",        Problem.Difficulty.EASY,   cat, "Google",    "<p>Count word frequencies in a string using <code>std::unordered_map</code>.</p>", "Case-insensitive.", lang, new String[][]{{"\"the cat sat\"","the:1, cat:1, sat:1"}});
        p("C++: Template Function",         Problem.Difficulty.MEDIUM,  cat, "Adobe",    "<p>Write a template function <code>maxOf&lt;T&gt;</code> that returns the max of two values.</p>", "Works for int, float, string.", lang, new String[][]{{"maxOf(3,7)","7"}});
        p("C++: Operator Overloading",      Problem.Difficulty.MEDIUM,  cat, "Nvidia",   "<p>Overload the <code>+</code> and <code><<</code> operators for a custom <code>Vector2D</code> class.</p>", "Must work with cout.", lang, new String[][]{{"v1+v2","Vector2D result"}});
        p("C++: Smart Pointers",            Problem.Difficulty.HARD,    cat, "Google",   "<p>Refactor raw pointer code to use shared_ptr and unique_ptr to eliminate memory leaks.</p>", "No delete calls allowed.", lang, new String[][]{{"unique_ptr<Obj>","Auto-managed memory"}});
    }

    // ── RUBY ──────────────────────────────────────────────────────────────────
    private void seedRuby() {
        String lang = "Ruby"; String cat = "Backend,Ruby";
        p("Ruby: Fibonacci Memoization",    Problem.Difficulty.EASY,   cat, "GitHub",    "<p>Implement Fibonacci using memoization with a Hash for caching.</p>", "Must not exceed O(n) time.", lang, new String[][]{{"fib(10)","55"}});
        p("Ruby: Enumerable Methods",       Problem.Difficulty.EASY,   cat, "Shopify",   "<p>Use Ruby Enumerable methods (map, select, reduce) to transform a dataset.</p>", "Pure functional style.", lang, new String[][]{{"[1,2,3].map{|n| n*2}","[2,4,6]"}});
        p("Ruby: Rails MVC Structure",      Problem.Difficulty.MEDIUM,  cat, "Shopify",  "<p>Create a Rails MVC scaffold for a Blog post with title, body, and published_at fields.</p>", "Include validations and routes.", lang, new String[][]{{"rails g model Post","Migration created"}});
        p("Ruby: Metaprogramming define_method",Problem.Difficulty.HARD,cat, "GitHub",  "<p>Use <code>define_method</code> to dynamically create getter methods for an array of attributes.</p>", "Must work at runtime.", lang, new String[][]{{"define_method(:name)","Method created"}});
        p("Ruby: Rack Middleware",          Problem.Difficulty.HARD,    cat, "Heroku",   "<p>Write a custom Rack middleware that logs request method and path for every request.</p>", "Must call app.call(env).", lang, new String[][]{{"GET /users","Logged: GET /users"}});
    }

    // ── GO ────────────────────────────────────────────────────────────────────
    private void seedGo() {
        String lang = "Go"; String cat = "Backend,Go";
        p("Go: Worker Pool",               Problem.Difficulty.HARD,    cat, "Uber",      "<p>Implement a worker pool using goroutines and channels to process tasks in parallel.</p>", "Graceful shutdown.", lang, new String[][]{{"tasks=10,workers=3","All processed"}});
        p("Go: HTTP Server",               Problem.Difficulty.EASY,    cat, "Google",    "<p>Build a simple HTTP server using <code>net/http</code> that handles GET /hello.</p>", "Return JSON response.", lang, new String[][]{{"GET /hello","{\"msg\":\"hello\"}"}});
        p("Go: Goroutine Mutex",           Problem.Difficulty.MEDIUM,  cat, "Uber",      "<p>Use a Mutex to protect a shared counter incremented by multiple goroutines.</p>", "No race conditions.", lang, new String[][]{{"100 goroutines","counter=100"}});
        p("Go: Interface Polymorphism",    Problem.Difficulty.MEDIUM,  cat, "Digital Ocean","<p>Define a Shape interface with Area() and implement it for Circle and Rectangle.</p>", "Use duck typing.", lang, new String[][]{{"circle.Area()","31.41"}});
        p("Go: JSON Parsing",             Problem.Difficulty.EASY,    cat, "Cloudflare","<p>Parse a JSON API response into a Go struct using encoding/json.</p>", "Handle nested objects.", lang, new String[][]{{"json.Unmarshal(data,&obj)","Struct populated"}});
    }

    // ── KOTLIN ────────────────────────────────────────────────────────────────
    private void seedKotlin() {
        String lang = "Kotlin"; String cat = "Backend,Kotlin";
        p("Kotlin: Data Classes & Copy",   Problem.Difficulty.EASY,   cat, "JetBrains", "<p>Use a data class to model a User and demonstrate copy() to create modified instances.</p>", "Immutable properties.", lang, new String[][]{{"user.copy(name='Bob')","New User(name=Bob)"}});
        p("Kotlin: Coroutines Basics",     Problem.Difficulty.MEDIUM,  cat, "Google",   "<p>Launch multiple coroutines with async/await to fetch data concurrently.</p>", "Use Dispatchers.IO.", lang, new String[][]{{"async { fetch() }","Data returned"}});
        p("Kotlin: Extension Functions",   Problem.Difficulty.EASY,   cat, "JetBrains", "<p>Write an extension function on String that checks if it is a palindrome.</p>", "Case-insensitive.", lang, new String[][]{{"\"racecar\".isPalindrome()","true"}});
        p("Kotlin: Sealed Classes",        Problem.Difficulty.MEDIUM,  cat, "JetBrains", "<p>Model a network Result as a sealed class with Success and Error subtypes.</p>", "Use when expression.", lang, new String[][]{{"Result.Success(data)","when handles it"}});
        p("Kotlin: Flow + StateFlow",      Problem.Difficulty.HARD,    cat, "Google",   "<p>Build a ViewModel that exposes a StateFlow of UI state using Kotlin Flow operators.</p>", "Use viewModelScope.", lang, new String[][]{{"_uiState.emit(state)","Collectors get update"}});
    }

    // ── NODE.JS ───────────────────────────────────────────────────────────────
    private void seedNodeJS() {
        String lang = "Node.js"; String cat = "Backend,Node.js";
        p("Node.js: EventEmitter",         Problem.Difficulty.MEDIUM,  cat, "Netflix",  "<p>Implement a simplified EventEmitter with on, emit, and off methods.</p>", "Multiple listeners per event.", lang, new String[][]{{"emitter.on('data',cb)","cb called on emit"}});
        p("Node.js: Express CRUD API",     Problem.Difficulty.MEDIUM,  cat, "Vercel",   "<p>Build a RESTful CRUD API for a Todo resource using Express.js.</p>", "Use in-memory array for storage.", lang, new String[][]{{"POST /todos","201 Created"}});
        p("Node.js: Stream Processing",    Problem.Difficulty.HARD,    cat, "Netflix",  "<p>Process a large CSV file using Node.js Readable streams without loading it into memory.</p>", "Pipe through Transform stream.", lang, new String[][]{{"large.csv","Processed line by line"}});
        p("Node.js: JWT Authentication",   Problem.Difficulty.MEDIUM,  cat, "Auth0",    "<p>Implement JWT-based authentication middleware in Express that validates Bearer tokens.</p>", "Return 401 on invalid token.", lang, new String[][]{{"Authorization: Bearer token","User authorized"}});
        p("Node.js: Worker Threads",       Problem.Difficulty.HARD,    cat, "Vercel",   "<p>Offload a CPU-intensive Fibonacci calculation to a Worker Thread.</p>", "Main thread must not block.", lang, new String[][]{{"fib(45) in worker","Result returned async"}});
    }

    // ── RUST ──────────────────────────────────────────────────────────────────
    private void seedRust() {
        String lang = "Rust"; String cat = "Backend,Rust";
        p("Rust: Ownership & Strings",     Problem.Difficulty.MEDIUM,  cat, "Mozilla",  "<p>Reverse a string in-place without violating Rust ownership rules.</p>", "No heap allocations inside fn.", lang, new String[][]{{"\"hello\"","\"olleh\""}});
        p("Rust: Enums & Pattern Matching", Problem.Difficulty.EASY,  cat, "Mozilla",  "<p>Model a coin enum and use match to return the value of each coin in cents.</p>", "Exhaustive match required.", lang, new String[][]{{"Coin::Quarter","25"}});
        p("Rust: Trait Implementation",    Problem.Difficulty.MEDIUM,  cat, "Cloudflare","<p>Implement the Display trait for a custom Point struct.</p>", "Use fmt::Display.", lang, new String[][]{{"println!(\"{}\",point)","(3, 5)"}});
        p("Rust: Error Handling with ?",   Problem.Difficulty.MEDIUM,  cat, "Mozilla",  "<p>Write a function that reads a file and parses it as JSON using the ? operator.</p>", "Return Result<T, E>.", lang, new String[][]{{"read_json(\"file.json\")","Ok(parsed) or Err"}});
        p("Rust: Concurrent Web Server",   Problem.Difficulty.HARD,    cat, "Cloudflare","<p>Build a simple multi-threaded web server using a thread pool in Rust.</p>", "Use Arc and Mutex.", lang, new String[][]{{"4 threads","Handles concurrent requests"}});
    }

    // ── REDIS ─────────────────────────────────────────────────────────────────
    private void seedRedis() {
        String lang = "Redis"; String cat = "Database,Redis";
        p("Redis: GET/SET Basics",         Problem.Difficulty.BASIC,   cat, "All",       "<p>Store and retrieve a key-value pair using GET and SET. Set an expiry with EXPIRE.</p>", "Key must be a string.", lang, new String[][]{{"SET name Alice EX 60","OK, GET name -> Alice"}});
        p("Redis: Lists & Queues",         Problem.Difficulty.EASY,   cat, "All",       "<p>Use LPUSH, RPUSH, RPOP, and LRANGE to implement a queue and stack.</p>", "FIFO and LIFO both.", lang, new String[][]{{"LPUSH queue a b","LRANGE queue 0 -1 -> [b,a]"}});
        p("Redis: Pub/Sub Pattern",        Problem.Difficulty.MEDIUM,  cat, "All",       "<p>Implement a pub/sub messaging system using Redis PUBLISH and SUBSCRIBE.</p>", "Multiple subscribers.", lang, new String[][]{{"PUBLISH news hello","Subscriber receives hello"}});
        p("Redis: Rate Limiter",           Problem.Difficulty.HARD,    cat, "Cloudflare","<p>Build a sliding window rate limiter using ZADD and ZREMRANGEBYSCORE.</p>", "100 req/min per user.", lang, new String[][]{{"101st request","Rejected: rate limit"}});
        p("Redis: Caching Strategy",       Problem.Difficulty.MEDIUM,  cat, "Netflix",   "<p>Implement cache-aside strategy: check Redis first, fall back to DB, then cache result.</p>", "Set TTL to avoid stale data.", lang, new String[][]{{"GET user:42","Cache hit or DB fallback"}});
    }

    // ── VUE ───────────────────────────────────────────────────────────────────
    private void seedVue() {
        String lang = "Vue"; String cat = "Frontend,Vue";
        p("Vue: Composition API Counter",  Problem.Difficulty.EASY,   cat, "Alibaba",   "<p>Build a counter component using Vue 3 Composition API with ref and reactive.</p>", "Use setup() syntax.", lang, new String[][]{{"click increment","count++"}});
        p("Vue: Pinia State Management",   Problem.Difficulty.MEDIUM,  cat, "Nuxt Labs", "<p>Set up a Pinia store for user authentication with login and logout actions.</p>", "Use defineStore.", lang, new String[][]{{"store.login()","isAuthenticated=true"}});
        p("Vue: Custom Directives",        Problem.Difficulty.MEDIUM,  cat, "Alibaba",   "<p>Create a custom v-focus directive that auto-focuses an input on mount.</p>", "Use mounted hook.", lang, new String[][]{{"<input v-focus>","Input is focused"}});
        p("Vue: Async Component",          Problem.Difficulty.MEDIUM,  cat, "Nuxt Labs", "<p>Lazy-load a heavy component using defineAsyncComponent with loading and error states.</p>", "Show spinner while loading.", lang, new String[][]{{"navigate to page","Component loads async"}});
        p("Vue: Render Functions",         Problem.Difficulty.HARD,    cat, "Alibaba",   "<p>Use Vue render functions to programmatically generate a dynamic list of components.</p>", "No template syntax.", lang, new String[][]{{"h('ul', items.map(...))","Rendered list"}});
    }

    // ── SVELTE ────────────────────────────────────────────────────────────────
    private void seedSvelte() {
        String lang = "Svelte"; String cat = "Frontend,Svelte";
        p("Svelte: Reactive Declarations",  Problem.Difficulty.EASY,  cat, "Svelte Team","<p>Use Svelte's reactive $ declarations to compute a derived value from input.</p>", "Use $ syntax.", lang, new String[][]{{"$: doubled = count * 2","doubled updates auto"}});
        p("Svelte: Stores",                Problem.Difficulty.MEDIUM,  cat, "Svelte Team","<p>Create a writable store for a shopping cart and subscribe in multiple components.</p>", "Use auto-subscription $.", lang, new String[][]{{"cart.update(items)","All subscribers notified"}});
        p("Svelte: Transitions & Animations",Problem.Difficulty.MEDIUM,cat, "Vercel",   "<p>Add fade and fly transitions to list items using the transition: directive.</p>", "Use built-in transitions.", lang, new String[][]{{"item added/removed","Fade transition plays"}});
        p("Svelte: Form Bindings",          Problem.Difficulty.EASY,  cat, "Svelte Team","<p>Use two-way binding with bind:value on inputs, selects, and checkboxes.</p>", "Live preview below form.", lang, new String[][]{{"bind:value={name}","name updates live"}});
        p("Svelte: SvelteKit SSR Route",   Problem.Difficulty.HARD,    cat, "Vercel",   "<p>Create a SvelteKit server-side rendered route that fetches data in load().</p>", "Use +page.server.ts.", lang, new String[][]{{"load() returns data","Page receives props"}});
    }

    // ── ORACLE ────────────────────────────────────────────────────────────────
    private void seedOracle() {
        String lang = "Oracle"; String cat = "Database,Oracle";
        p("Oracle: Basic SELECT Query",    Problem.Difficulty.BASIC,   cat, "Oracle Corp","<p>Write a SELECT query to fetch all employees earning more than 50000 from the employees table.</p>", "Standard SQL syntax.", lang, new String[][]{{"SELECT * FROM employees WHERE salary>50000","Filtered rows"}});
        p("Oracle: PL/SQL Procedure",      Problem.Difficulty.MEDIUM,  cat, "Oracle Corp","<p>Write a PL/SQL stored procedure that accepts an employee ID and prints their name and salary.</p>", "Use DBMS_OUTPUT.PUT_LINE.", lang, new String[][]{{"EXEC get_emp(101)","Name: Alice Salary: 75000"}});
        p("Oracle: Analytic Functions",    Problem.Difficulty.HARD,    cat, "Oracle Corp","<p>Use RANK() OVER(PARTITION BY dept ORDER BY salary DESC) to rank employees per department.</p>", "Window functions.", lang, new String[][]{{"RANK() OVER (...)","Rank column added"}});
        p("Oracle: Index Optimization",    Problem.Difficulty.MEDIUM,  cat, "Oracle Corp","<p>Create a composite index on (department_id, hire_date) and explain its query plan impact.</p>", "Use EXPLAIN PLAN.", lang, new String[][]{{"CREATE INDEX idx","Query uses index"}});
        p("Oracle: Sequences & Triggers",  Problem.Difficulty.MEDIUM,  cat, "Oracle Corp","<p>Use an Oracle SEQUENCE and a BEFORE INSERT TRIGGER to auto-generate primary key values.</p>", "Old Oracle style (pre-12c).", lang, new String[][]{{"INSERT INTO orders","ID auto-generated"}});
    }

    // ── SQL ───────────────────────────────────────────────────────────────────
    private void seedSQL() {
        String lang = "SQL"; String cat = "Database,SQL";
        p("SQL: SELECT Basics",            Problem.Difficulty.BASIC,   cat, "All",       "<p>Write a SELECT with WHERE, ORDER BY, and LIMIT to fetch the top 5 highest-paid employees.</p>", "Standard SQL.", lang, new String[][]{{"SELECT ... LIMIT 5","5 rows"}});
        p("SQL: INNER & LEFT JOIN",        Problem.Difficulty.EASY,   cat, "All",       "<p>JOIN the orders table with customers. Return customers with no orders using LEFT JOIN.</p>", "Handle NULLs.", lang, new String[][]{{"LEFT JOIN customers","Includes NULL orders"}});
        p("SQL: GROUP BY & HAVING",        Problem.Difficulty.MEDIUM,  cat, "Amazon",   "<p>Find departments with more than 10 employees and their average salary using GROUP BY and HAVING.</p>", "Use aggregate functions.", lang, new String[][]{{"HAVING COUNT(*)>10","Filtered groups"}});
        p("SQL: Subqueries",               Problem.Difficulty.MEDIUM,  cat, "Google",   "<p>Use a correlated subquery to find employees earning more than the average in their department.</p>", "No joins allowed.", lang, new String[][]{{"WHERE salary > (SELECT AVG...)","Filtered rows"}});
        p("SQL: Window Functions",         Problem.Difficulty.HARD,    cat, "Stripe",   "<p>Use ROW_NUMBER(), LAG(), and SUM() OVER() to analyze monthly revenue changes.</p>", "Partitioned by month.", lang, new String[][]{{"LAG(revenue) OVER(ORDER BY month)","Previous month value"}});
    }

    // ── MYSQL ─────────────────────────────────────────────────────────────────
    private void seedMySQL() {
        String lang = "MySQL"; String cat = "Database,MySQL";
        p("MySQL: Nth Highest Salary",     Problem.Difficulty.MEDIUM,  cat, "Amazon",     "<p>Write a SQL query to report the <code>n</code>th highest salary from the Employee table.</p>", "n >= 1", lang, new String[][]{{"n=2","2nd highest salary"}});
        p("MySQL: Delete Duplicate Emails",Problem.Difficulty.EASY,   cat, "Oracle",     "<p>Write a SQL query to delete all duplicate email entries in a table named Person, keeping only unique emails based on its smallest Id.</p>", "Table has Id and Email", lang, new String[][]{{"(1,a@b.com),(2,a@b.com)","Keeps (1,a@b.com)"}});
        p("MySQL: Department Highest Salary",Problem.Difficulty.MEDIUM,cat, "Google",     "<p>Write a SQL query to find employees who have the highest salary in each of the departments.</p>", "Join Department and Employee tables", lang, new String[][]{{"Dept 1: Max 90000","Returns Employee with 90000"}});
    }

    // ── POSTGRESQL ────────────────────────────────────────────────────────────
    private void seedPostgreSQL() {
        String lang = "PostgreSQL"; String cat = "Database,PostgreSQL";
        p("Postgres: Recursive CTE",       Problem.Difficulty.HARD,    cat, "Microsoft",  "<p>Write a recursive CTE to traverse an employee-manager hierarchy to find the total depth of reporting chains.</p>", "Use WITH RECURSIVE", lang, new String[][]{{"Employee 5 -> Manager 2 -> Manager 1","Depth: 3"}});
        p("Postgres: JSONB Querying",      Problem.Difficulty.MEDIUM,  cat, "Stripe",     "<p>Find all orders where the JSONB column <code>metadata</code> contains a specific key-value pair.</p>", "Use the @> or ->> operators", lang, new String[][]{{"metadata @> '{\"status\":\"shipped\"}'","Returns matched rows"}});
        p("Postgres: Array Aggregation",   Problem.Difficulty.EASY,   cat, "Uber",       "<p>Group products by category and use <code>array_agg()</code> to return an array of product names for each category.</p>", "Standard GROUP BY", lang, new String[][]{{"Category A: Pro1, Pro2","{Pro1, Pro2}"}});
    }

    // ── MONGODB ───────────────────────────────────────────────────────────────
    private void seedMongoDB() {
        String lang = "MongoDB"; String cat = "Database,MongoDB";
        p("MongoDB: Aggregate Pipeline",   Problem.Difficulty.MEDIUM,  cat, "MongoDB",    "<p>Write an aggregation pipeline using <code>$match</code>, <code>$group</code>, and <code>$sort</code> to find the total sales per region, sorted descending.</p>", "Input contains region and amount fields", lang, new String[][]{{"[ {region:\"us\", amount:10}, {region:\"us\", amount:20} ]","[ {\"_id\":\"us\", \"totalSales\":30} ]"}});
        p("MongoDB: Geospatial Query",     Problem.Difficulty.HARD,    cat, "Uber",       "<p>Use <code>$near</code> to find the 5 closest drivers to a given [longitude, latitude] point.</p>", "Collection has a 2dsphere index", lang, new String[][]{{"coordinates: [10, 20]","Returns top 5 drivers closest to [10,20]"}});
        p("MongoDB: Update Array Element", Problem.Difficulty.EASY,   cat, "Amazon",     "<p>Use the positional operator <code>$</code> to update a specific embedded document within an array based on a match condition.</p>", "Update an item's status to \"shipped\"", lang, new String[][]{{"update { \"items.id\": 42 }","Sets \"items.$.status\": \"shipped\""}});
    }

    // ── HELPER ────────────────────────────────────────────────────────────────
    private void p(String title, Problem.Difficulty diff, String tagsStr, String companies, String desc, String constraints, String lang, String[][] testCases) {
        Problem pb = problemRepository.findByTitle(title).orElse(new Problem());
        pb.setTitle(title);
        pb.setDifficulty(diff);
        pb.setCompanies(companies);
        pb.setDescription(desc);
        pb.setConstraints(constraints);
        pb.setLanguage(lang);

        Set<Tag> tags = new HashSet<>();
        for (String tagName : tagsStr.split(",")) {
            Tag tag = tagRepository.findByName(tagName.trim())
                    .orElseGet(() -> { Tag t = new Tag(); t.setName(tagName.trim()); return tagRepository.save(t); });
            tags.add(tag);
        }
        pb.setTags(tags);

        // Pre-defined templates
        String template = "";
        
        if (title.contains("Two Sum")) {
            template = "public class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{};\n    }\n}";
        } else if (title.contains("Reverse Linked List")) {
            template = "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\npublic class Solution {\n    public ListNode reverseList(ListNode head) {\n        // Your code here\n        return null;\n    }\n}";
        } else if (lang.equalsIgnoreCase("Java")) {
            template = "public class Solution {\n    public void solve() {\n        // Your Java code here\n    }\n}";
        } else if (lang.equalsIgnoreCase("JavaScript")) {
            template = "function solve() {\n    // Your JavaScript code here\n}";
        } else if (lang.equalsIgnoreCase("TypeScript")) {
            template = "function solve(): void {\n    // Your TypeScript code here\n}";
        } else if (lang.equalsIgnoreCase("React")) {
            template = "import React from 'react';\n\nexport const Solution = () => {\n    return (\n        <div>{/* Your React component here */}</div>\n    );\n};";
        } else if (lang.equalsIgnoreCase("Angular")) {
            template = "import { Component } from '@angular/core';\n\n@Component({\n    selector: 'app-solution',\n    template: '<div>Angular solution here</div>'\n})\nexport class SolutionComponent {\n    // Your Angular logic here\n}";
        } else if (lang.equalsIgnoreCase("Python")) {
            template = "class Solution:\n    def solve(self):\n        # Your Python code here\n        pass";
        } else if (lang.equalsIgnoreCase("SQL") || lang.equalsIgnoreCase("MySQL") || lang.equalsIgnoreCase("PostgreSQL")) {
            template = "-- Write your SQL query here\nSELECT * FROM table_name;";
        } else {
            template = "// Start coding here for " + lang;
        }
        pb.setDefaultCode(template);

        Problem saved = problemRepository.save(pb);

        if (testCases != null) {
            for (String[] tc : testCases) {
                TestCase t = new TestCase();
                t.setProblemId(saved.getId());
                t.setInputData(tc[0]);
                t.setExpectedOutput(tc[1]);
                testCaseRepository.save(t);
            }
        }
    }
}
