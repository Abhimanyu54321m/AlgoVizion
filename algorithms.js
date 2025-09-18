// ================== Helper Functions ==================
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function highlightBars(container, indices) {
  let bars = container.querySelectorAll(".bar");
  bars.forEach((bar, idx) => {
    bar.classList.toggle("active", indices.includes(idx));
  });
}

function swapBars(container, i, j) {
  let bars = container.querySelectorAll(".bar");
  let tempHeight = bars[i].style.height;
  let tempText = bars[i].querySelector("span").innerText;

  bars[i].style.height = bars[j].style.height;
  bars[i].querySelector("span").innerText = bars[j].querySelector("span").innerText;

  bars[j].style.height = tempHeight;
  bars[j].querySelector("span").innerText = tempText;
}

function updateBar(container, i, value) {
  let bars = container.querySelectorAll(".bar");
  bars[i].style.height = `${value * 5}px`;
  bars[i].querySelector("span").innerText = value;
}

// ================== Sorting Algorithms ==================

// Bubble Sort
async function bubbleSort(arr, container) {
  let steps = 0, n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps++;
      highlightBars(container, [j, j+1]);
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        swapBars(container, j, j+1);
        await sleep(200);
      }
    }
  }
  return steps;
}

// Selection Sort
async function selectionSort(arr, container) {
  let steps = 0, n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i+1; j < n; j++) {
      steps++;
      highlightBars(container, [i, j]);
      if (arr[j] < arr[minIdx]) minIdx = j;
      await sleep(100);
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swapBars(container, i, minIdx);
    }
  }
  return steps;
}

// Insertion Sort
async function insertionSort(arr, container) {
  let steps = 0, n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i-1;
    while (j >= 0 && arr[j] > key) {
      steps++;
      highlightBars(container, [j, j+1]);
      arr[j+1] = arr[j];
      updateBar(container, j+1, arr[j]);
      await sleep(150);
      j--;
    }
    arr[j+1] = key;
    updateBar(container, j+1, key);
  }
  return steps;
}

// Merge Sort
async function mergeSort(arr, container, start=0, end=arr.length-1, steps={count:0}) {
  if (start >= end) return steps.count;
  let mid = Math.floor((start+end)/2);
  await mergeSort(arr, container, start, mid, steps);
  await mergeSort(arr, container, mid+1, end, steps);
  await merge(arr, container, start, mid, end, steps);
  return steps.count;
}

async function merge(arr, container, start, mid, end, steps) {
  let left = arr.slice(start, mid+1);
  let right = arr.slice(mid+1, end+1);
  let i=0, j=0, k=start;
  while (i<left.length && j<right.length) {
    steps.count++;
    highlightBars(container, [k]);
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      updateBar(container, k, left[i]);
      i++;
    } else {
      arr[k] = right[j];
      updateBar(container, k, right[j]);
      j++;
    }
    await sleep(200);
    k++;
  }
  while (i<left.length) {
    arr[k] = left[i];
    updateBar(container, k, left[i]);
    i++; k++;
  }
  while (j<right.length) {
    arr[k] = right[j];
    updateBar(container, k, right[j]);
    j++; k++;
  }
}

// Quick Sort
async function quickSort(arr, container, low=0, high=arr.length-1, steps={count:0}) {
  if (low < high) {
    let pi = await partition(arr, container, low, high, steps);
    await quickSort(arr, container, low, pi-1, steps);
    await quickSort(arr, container, pi+1, high, steps);
  }
  return steps.count;
}

async function partition(arr, container, low, high, steps) {
  let pivot = arr[high];
  let i = low-1;
  for (let j=low; j<high; j++) {
    steps.count++;
    highlightBars(container, [j, high]);
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      swapBars(container, i, j);
      await sleep(150);
    }
  }
  [arr[i+1], arr[high]] = [arr[high], arr[i+1]];
  swapBars(container, i+1, high);
  return i+1;
}

// Heap Sort
async function heapSort(arr, container) {
  let steps = 0, n = arr.length;

  async function heapify(n, i) {
    let largest = i, l = 2*i+1, r = 2*i+2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      swapBars(container, i, largest);
      steps++;
      await sleep(200);
      await heapify(n, largest);
    }
  }

  for (let i=Math.floor(n/2)-1; i>=0; i--) {
    await heapify(n, i);
  }

  for (let i=n-1; i>0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    swapBars(container, 0, i);
    steps++;
    await sleep(200);
    await heapify(i, 0);
  }
  return steps;
}
