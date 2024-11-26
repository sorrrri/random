document.addEventListener("DOMContentLoaded", () => {
  let activeNames = [];

  fetch("assets/names.json")
    .then((response) => response.json())
    .then((data) => {
      activeNames = data.active.map((item) => item.name);
      const startButton = document.getElementById("start-btn");
      startButton.addEventListener("click", startCountdown);

      window.onload = createLiElements;
    })
    .catch((error) => {
      console.error("Error loading the JSON file:", error);
    });

  const createLiElements = () => {
    const ulElements = document.querySelectorAll("ul");
    ulElements.forEach((ul) => {
      const numberOfLi = ul.id === "ul7" || ul.id === "ul8" ? 12 : 16;
      for (let i = 0; i < numberOfLi; i++) {
        const li = document.createElement("li");
        ul.appendChild(li);
      }
    });
  };

  const startCountdown = () => {
    const loading = document.getElementById("loading");
    loading.style.display = "flex";

    const countdownElement = document.getElementById("countdown");
    let countdown = 5;

    const readyAudio = document.getElementById("ready-audio");
    readyAudio.play();

    countdownElement.textContent = countdown;

    const countdownInterval = setInterval(() => {
      countdown--;
      countdownElement.textContent = countdown;

      if (countdown === 0) {
        clearInterval(countdownInterval);
        const yayAudio = document.getElementById("yay-audio");
        yayAudio.play();
        displayGroups();
      }
    }, 1000);
  };

  const displayGroups = () => {
    if (activeNames.length === 0) {
      console.error("Names data is not loaded yet!");
      return;
    }

    const ulElements = document.querySelectorAll("ul");
    let allLis = [];

    ulElements.forEach((ul) => {
      const lis = ul.getElementsByTagName("li");
      for (let li of lis) {
        allLis.push(li);
      }
    });

    const shuffledNames = shuffle(activeNames.slice());

    const liIndexesToSkip = [7, 15];
    const ulIdsToSkip = ["ul2", "ul4", "ul5", "ul6"];

    let availableLis = [];
    ulElements.forEach((ul) => {
      const lis = ul.getElementsByTagName("li");
      Array.from(lis).forEach((li, index) => {
        if (ulIdsToSkip.includes(ul.id) && liIndexesToSkip.includes(index)) {
          li.textContent = "";
          li.classList.add("hidden");
        } else {
          availableLis.push(li);
        }
      });
    });

    let nameIndex = 0;
    availableLis.forEach((li) => {
      if (nameIndex < shuffledNames.length) {
        li.textContent = shuffledNames[nameIndex++] || "";
      }
    });

    const loading = document.getElementById("loading");
    loading.style.display = "none";
    groupContainer.classList.add("active");
  };

  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
});
