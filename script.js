const bars1 = document.getElementById("bars1");
const bars2 = document.getElementById("bars2");
const algo1Select = document.getElementById("algo1");
const algo2Select = document.getElementById("algo2");
const output = document.getElementById("comparison-output");

let array = [];

// Generate random bars
document.getElementById("generate").addEventListener("click", () => {
  array = Array.from({length: 12}, () => Math.floor(Math.random()*40)+5);
  renderBars(bars1, [...array]);
  renderBars(bars2, [...array]);
});

document.getElementById("start").addEventListener("click", async () => {
  let algo1 = algo1Select.value;
  let algo2 = algo2Select.value;

  document.getElementById("algo1-name").innerText = getComplexity(algo1).name;
  document.getElementById("algo2-name").innerText = getComplexity(algo2).name;

  let arr1 = [...array];
  let arr2 = [...array];

  let steps1 = await runAlgorithm(algo1, arr1, bars1);
  let steps2 = await runAlgorithm(algo2, arr2, bars2);

  showComparison(algo1, algo2, steps1, steps2);
});

function renderBars(container, arr) {
  container.innerHTML = "";
  arr.forEach(val => {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${val * 5}px`;
    bar.innerHTML = `<span>${val}</span>`;
    container.appendChild(bar);
  });
}

async function runAlgorithm(algo, arr, container) {
  if (algo === "bubble") return await bubbleSort(arr, container);
  if (algo === "merge") return await mergeSort(arr, container);
  if (algo === "selection") return await selectionSort(arr, container);
  if (algo === "insertion") return await insertionSort(arr, container);
  if (algo === "quick") return await quickSort(arr, container);
  if (algo === "heap") return await heapSort(arr, container);
}

function showComparison(algo1, algo2, steps1, steps2) {
  let c1 = getComplexity(algo1);
  let c2 = getComplexity(algo2);
  output.innerHTML = `
    <h3>${c1.name} vs ${c2.name}</h3>
    <p><b>${c1.name} Steps:</b> ${steps1}</p>
    <p><b>${c2.name} Steps:</b> ${steps2}</p>
    <p><b>${c1.name} Complexity:</b> ${c1.time}, Space: ${c1.space}</p>
    <p><b>${c2.name} Complexity:</b> ${c2.time}, Space: ${c2.space}</p>
    <h4>🏆 Winner: ${
      steps1 < steps2 ? c1.name : c2.name
    } (fewer steps & better complexity)</h4>
  `;
}
