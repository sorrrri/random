fetch("assets/names.json")
  .then((response) => response.json())
  .then((names) => {
    shuffle(names);

    const startButton = document.getElementById("start-btn");
    startButton.addEventListener("click", () => {
      const groupSize = parseInt(document.querySelector('input[name="team-size"]:checked').id.replace("team", ""));
      startCountdown(names, groupSize);
    });

    function displayGroups(names, groupSize) {
      const groups = [];
      for (let i = 0; i < names.length; i += groupSize) {
        groups.push(names.slice(i, i + groupSize));
      }

      shuffle(groups);

      groups.sort((a, b) => a.length - b.length);

      const groupContainer = document.getElementById("group-container");
      groupContainer.innerHTML = "";
      groups.forEach((group, i) => {
        const groupElement = document.createElement("div");
        groupElement.classList.add("group");

        const groupTitle = document.createElement("h2");
        groupTitle.textContent = `그룹 ${i + 1}`;
        groupElement.appendChild(groupTitle);

        const groupList = document.createElement("ul");
        group.forEach((name) => {
          const li = document.createElement("li");
          li.textContent = name.name;
          groupList.appendChild(li);
        });

        groupElement.appendChild(groupList);
        groupContainer.appendChild(groupElement);
      });

      const loading = document.getElementById("loading");
      loading.style.display = "none";
      groupContainer.classList.add("active");
    }

    function startCountdown(names, groupSize) {
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
          displayGroups(names, groupSize);
        }
      }, 1000);
    }
  })
  .catch((error) => {
    console.error("Error loading the JSON file:", error);
  });

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
