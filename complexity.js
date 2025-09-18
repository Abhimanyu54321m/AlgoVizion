const complexityData = {
  bubble: {
    name: "Bubble Sort",
    time: "Best: O(n), Avg: O(n²), Worst: O(n²)",
    space: "O(1)",
  },
  merge: {
    name: "Merge Sort",
    time: "Best: O(n log n), Avg: O(n log n), Worst: O(n log n)",
    space: "O(n)",
  },
  selection: {
    name: "Selection Sort",
    time: "Best: O(n²), Avg: O(n²), Worst: O(n²)",
    space: "O(1)",
  },
  insertion: {
    name: "Insertion Sort",
    time: "Best: O(n), Avg: O(n²), Worst: O(n²)",
    space: "O(1)",
  },
  quick: {
    name: "Quick Sort",
    time: "Best: O(n log n), Avg: O(n log n), Worst: O(n²)",
    space: "O(log n)",
  },
  heap: {
    name: "Heap Sort",
    time: "Best: O(n log n), Avg: O(n log n), Worst: O(n log n)",
    space: "O(1)",
  }
};

function getComplexity(algo) {
  return complexityData[algo];
}
