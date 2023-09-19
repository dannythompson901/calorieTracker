const modal = document.getElementById("myModal");
const btn = document.getElementById("openModalBtn");
const span = document.getElementsByClassName("close")[0];
const foodInput = document.getElementById("food-item");
const calorieInput = document.getElementById("calorie-count");
let dailyGoal = 2000;
let currentProgress = 0;


btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

foodInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addCalories();
    }
  });

  calorieInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addCalories();
    }
  });

let totalCalories = 0;

function addCalories() {
  const foodItem = document.getElementById("food-item").value.trim();
  const calorieCount = parseInt(
    document.getElementById("calorie-count").value,
    10
  );

  if (!foodItem) {
    alert("Please enter a food item.");
    return;
  }

  if (isNaN(calorieCount) || calorieCount <= 0) {
    alert("Please enter a valid calorie count.");
    return;
  }

  if (foodItem && !isNaN(calorieCount)) {

    const tableBody = document.querySelector("#calorie-table tbody");

    const tableRow = document.createElement("tr");
    const foodItemCell = document.createElement("td");
    const calorieCountCell = document.createElement("td");

    foodItemCell.textContent = foodItem;
    calorieCountCell.textContent = calorieCount;

    tableRow.appendChild(foodItemCell);
    tableRow.appendChild(calorieCountCell);
    tableBody.appendChild(tableRow);
  
    totalCalories += calorieCount;
    document.getElementById("total-calories").textContent = totalCalories;

    // Reset input fields
    document.getElementById("food-item").value = "";
    document.getElementById("calorie-count").value = "";

    
    modal.style.display = "none";
    updateProgressBar(calorieCount);
  } else {
    alert("Please enter valid inputs.");
  }
}

function updateProgressBar(calories) {
  currentProgress += calories;
  
  const circumference = 2 * Math.PI * 90; // 2 * π * r
  const progress = (currentProgress / dailyGoal) * circumference;
  const remainingCircumference = circumference - progress;
  
  const progressBar = document.getElementById("progress");
  progressBar.style.strokeDashoffset = remainingCircumference;
}
