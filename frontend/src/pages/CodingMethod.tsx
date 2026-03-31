import { motion } from 'framer-motion';
import { Container } from '../components/layout/BaseLayout';
import { Badge } from '../components/ui/Badge';

const methods = [
  {
    id: 1,
    title: 'Two Pointer Technique',
    category: 'Arrays',
    difficulty: 'Beginner',
    description: 'Use two indices moving toward each other to solve array problems in O(n) time instead of O(n²).',
    when: 'Finding pairs in sorted arrays, palindrome checks, removing duplicates.',
    example: 'function twoSum(arr, target) {\n  let l = 0, r = arr.length - 1;\n  while (l < r) {\n    const sum = arr[l] + arr[r];\n    if (sum === target) return [l, r];\n    if (sum < target) l++; else r--;\n  }\n  return [];\n}',
    tips: ['Array must be sorted for most cases', 'Reduces O(n²) brute force to O(n)', 'Works great for palindrome and sum problems'],
  },
  {
    id: 2,
    title: 'Sliding Window',
    category: 'Arrays / Strings',
    difficulty: 'Intermediate',
    description: 'Maintain a dynamic window of elements and expand/shrink it based on conditions to avoid redundant iterations.',
    when: 'Max/min subarray, longest substring without repeating characters, fixed-size window problems.',
    example: 'function maxSum(arr, k) {\n  let sum = 0;\n  for (let i = 0; i < k; i++) sum += arr[i];\n  let max = sum;\n  for (let i = k; i < arr.length; i++) {\n    sum += arr[i] - arr[i - k];\n    max = Math.max(max, sum);\n  }\n  return max;\n}',
    tips: ['Avoid nested loops with a running total', 'Expand right pointer, shrink left when condition breaks', 'Track frequency maps for string problems'],
  },
  {
    id: 3,
    title: 'Fast & Slow Pointers',
    category: 'Linked Lists',
    difficulty: 'Intermediate',
    description: 'Use two pointers moving at different speeds to detect cycles or find midpoints in linked lists.',
    when: 'Cycle detection, finding middle of list, finding the Nth node from end.',
    example: 'function hasCycle(head) {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}',
    tips: ['Fast pointer moves 2x speed of slow', 'If they meet, a cycle exists', 'When fast hits null, slow is at midpoint'],
  },
  {
    id: 4,
    title: 'Binary Search Pattern',
    category: 'Search',
    difficulty: 'Intermediate',
    description: 'Divide a sorted search space in half at every step, reducing runtime from O(n) to O(log n).',
    when: 'Finding elements in sorted arrays, search on answer space, rotated sorted arrays.',
    example: 'function binarySearch(arr, target) {\n  let l = 0, r = arr.length - 1;\n  while (l <= r) {\n    const mid = Math.floor((l + r) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) l = mid + 1;\n    else r = mid - 1;\n  }\n  return -1;\n}',
    tips: ['Always use l + (r-l)/2 to prevent overflow', 'Think about what to do when mid is too big vs too small', 'Works on any monotonic function — not just arrays'],
  },
  {
    id: 5,
    title: 'Recursion & Backtracking',
    category: 'Trees / Combinatorics',
    difficulty: 'Advanced',
    description: 'Explore all possibilities by making choices, and "undo" them (backtrack) when a path fails.',
    when: 'Generating permutations, sudoku solving, N-Queens, finding all subsets.',
    example: 'function permute(nums) {\n  const result = [];\n  function bt(curr, remaining) {\n    if (!remaining.length) return result.push([...curr]);\n    for (let i = 0; i < remaining.length; i++) {\n      curr.push(remaining[i]);\n      bt(curr, [...remaining.slice(0,i), ...remaining.slice(i+1)]);\n      curr.pop(); // backtrack\n    }\n  }\n  bt([], nums);\n  return result;\n}',
    tips: ['Always define a base case first', 'Undo the last choice before trying the next one', 'Prune early to avoid exploring invalid paths'],
  },
  {
    id: 6,
    title: 'Dynamic Programming',
    category: 'Optimization',
    difficulty: 'Advanced',
    description: 'Break problems into overlapping subproblems and store their results to avoid recomputation.',
    when: 'Fibonacci, knapsack, longest common subsequence, minimum path problems.',
    example: 'function climbStairs(n) {\n  const dp = [1, 1];\n  for (let i = 2; i <= n; i++) {\n    dp[i] = dp[i - 1] + dp[i - 2];\n  }\n  return dp[n];\n}',
    tips: ['Identify the recurrence relation first', 'Top-down (memoization) vs Bottom-up (tabulation)', 'Always define what dp[i] means explicitly'],
  },
  {
    id: 7,
    title: 'BFS & DFS Graph Traversal',
    category: 'Graphs / Trees',
    difficulty: 'Intermediate',
    description: 'BFS explores layer by layer using a queue; DFS goes deep using recursion or a stack.',
    when: 'Shortest path (BFS), detecting cycles (DFS), connected components, tree level order.',
    example: '// BFS\nfunction bfs(root) {\n  const queue = [root], result = [];\n  while (queue.length) {\n    const node = queue.shift();\n    result.push(node.val);\n    if (node.left) queue.push(node.left);\n    if (node.right) queue.push(node.right);\n  }\n  return result;\n}',
    tips: ['BFS guarantees shortest path in unweighted graphs', 'Use a visited set to avoid infinite loops', 'DFS uses O(h) space; BFS uses O(w) space'],
  },
  {
    id: 8,
    title: 'HashMap / Frequency Counter',
    category: 'Hashing',
    difficulty: 'Beginner',
    description: 'Use a hash map to count, group, or look up elements in O(1) time, eliminating nested loops.',
    when: 'Anagram checks, finding duplicates, two-sum, grouping by attribute.',
    example: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n}',
    tips: ['Converts O(n²) lookup problems to O(n)', 'Count frequencies before comparing', 'Works for anagrams, duplicates, pair sums'],
  },
];

const difficultyColor: Record<string, string> = {
  Beginner: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5',
  Intermediate: 'text-amber-400 border-amber-400/20 bg-amber-400/5',
  Advanced: 'text-red-400 border-red-400/20 bg-red-400/5',
};

export const CodingMethod = () => {
  return (
    <Container className="py-24 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="mb-16 space-y-4">
          <Badge variant="outline" className="text-accent border-accent/20 bg-accent/5 uppercase px-3 py-1 text-[10px] font-black tracking-widest">
            Coding Methods
          </Badge>
          <h1 className="text-5xl md:text-6xl font-display font-black text-white leading-tight tracking-tight">
            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Patterns.</span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed max-w-2xl">
            The most frequently tested coding patterns and techniques. Learn them once, apply them everywhere.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-8">
          {methods.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="group border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl p-8 transition-all duration-300"
            >
              {/* Top row */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-600 text-sm font-black font-mono">#{String(m.id).padStart(2, '0')}</span>
                    <Badge variant="outline" className="text-slate-400 border-white/10 text-[10px] font-black tracking-widest uppercase">
                      {m.category}
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-black text-white group-hover:text-accent transition-colors">{m.title}</h2>
                </div>
                <Badge variant="outline" className={`text-[11px] font-black tracking-wider uppercase px-3 py-1.5 ${difficultyColor[m.difficulty]}`}>
                  {m.difficulty}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-slate-300 leading-relaxed mb-6">{m.description}</p>

              {/* When to use */}
              <div className="mb-6 p-4 bg-accent/5 border border-accent/10 rounded-xl">
                <p className="text-xs font-black text-accent uppercase tracking-widest mb-1.5">When to use</p>
                <p className="text-slate-300 text-sm leading-relaxed">{m.when}</p>
              </div>

              {/* Code */}
              <div className="mb-6">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Code Template</p>
                <div className="relative group/code">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-purple-500/10 blur-xl opacity-0 group-hover/code:opacity-100 transition-opacity rounded-2xl" />
                  <pre className="relative p-5 bg-[#0f111a] border border-white/8 rounded-xl overflow-x-auto">
                    <code className="text-sm font-mono text-emerald-300/90 leading-relaxed">{m.example}</code>
                  </pre>
                </div>
              </div>

              {/* Tips */}
              <div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Key Tips</p>
                <ul className="space-y-2">
                  {m.tips.map((tip, j) => (
                    <li key={j} className="flex items-start gap-3 text-slate-400 text-sm">
                      <span className="text-accent opacity-60 mt-0.5 shrink-0">▹</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Container>
  );
};
