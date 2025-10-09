let quizData;
let currentQuestion = 0;
let choices = [];
let isNavigating = false; // Add this at the top with other variables

// Add event listeners when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("start-button")
    .addEventListener("click", startCounter);
  document
    .getElementById("show-results")
    .addEventListener("click", showResults);

  // Add event listeners for counter buttons
  document.querySelectorAll(".counter-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const action = this.dataset.action;
      const color = this.dataset.color;
      const input = document.getElementById(`${color}-count`);
      let value = parseInt(input.value) || 0;

      if (action === "increase") {
        value++;
      } else if (action === "decrease" && value > 0) {
        value--;
      }

      input.value = value;
    });
  });
});

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    quizData = data.onderdelen;
  });

function startCounter() {
  showView("quiz-view");
}

function showResults() {
  const regulierCount =
    parseInt(document.getElementById("regulier-count").value) || 0;
  const agoraCount =
    parseInt(document.getElementById("agora-count").value) || 0;
  const total = regulierCount + agoraCount;

  if (total === 0) {
    alert("Voer eerst het aantal kaartjes in.");
    return;
  }

  const regulierPercentage = Math.round((regulierCount / total) * 100);
  const agoraPercentage = Math.round((agoraCount / total) * 100);

  document.getElementById(
    "regulier-stat"
  ).style.height = `${regulierPercentage}%`;
  document.getElementById("agora-stat").style.height = `${agoraPercentage}%`;
  document.getElementById(
    "regulier-percentage"
  ).textContent = `${regulierPercentage}%`;
  document.getElementById(
    "agora-percentage"
  ).textContent = `${agoraPercentage}%`;

  showView("stats-view");
}

function showView(viewId) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.remove("active");
  });
  document.getElementById(viewId).classList.add("active");
}
