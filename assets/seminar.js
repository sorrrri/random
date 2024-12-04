document.addEventListener("DOMContentLoaded", () => {
  let activeNames = [];

  fetch("assets/seminar.json")
    .then((response) => response.json())
    .then((data) => {
      activeNames = data.active.map((item) => item.name);
      const startButton = document.getElementById("start-btn");
      startButton.addEventListener("click", startCountdown);
    })
    .catch((error) => {
      console.error("Error loading the JSON file:", error);
    });

  const startCountdown = () => {
    const loading = document.getElementById("loading");
    const countdownElement = document.getElementById("countdown");
    const readyAudio = document.getElementById("ready-audio");
    const yayAudio = document.getElementById("yay-audio");

    loading.style.display = "flex";
    let countdown = 5;
    readyAudio.play();
    countdownElement.textContent = countdown;
    const countdownInterval = setInterval(() => {
      countdown--;
      countdownElement.textContent = countdown;

      if (countdown === 0) {
        clearInterval(countdownInterval);
        yayAudio.play();
        displayGroups();
      }
    }, 1000);
  };

  const displayGroups = () => {

    const people = document.querySelectorAll("[data-random]")
    const shuffledNames = shuffle(activeNames.slice());


    let nameIndex = 0;
    people.forEach((li) => {
      if (nameIndex < shuffledNames.length) {
        li.textContent = shuffledNames[nameIndex++] || "";
      }
    });

    const loading = document.getElementById("loading");
    loading.style.display = "none";
  };

  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
});
