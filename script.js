document.addEventListener("DOMContentLoaded", function () {
    const h1Element = document.getElementById("h4ch1net");

    setTimeout(() => {
        // Add a class to apply the transformation to eyes
        h1Element.classList.add("eyes-transform");

        // Remove the class after another 2 seconds to revert to the original state
        setTimeout(() => {
            h1Element.classList.remove("eyes-transform");
        }, 2000);
    }, 10000);

    const titleSequence = [
        { title: "H4ch1net", delay: 2000 },
        { title: "👁️👁️", delay: 500 },
        { title: "👁️", delay: 5 },
        { title: "H4ch1net", delay: 6000 },
        { title: "Nerd", delay: 100 }
    ];

    function changeTitle(newTitle, delay) {
        setTimeout(function () {
            document.title = newTitle;
        }, delay);
    }

    function titleLoop() {
        let currentIndex = 0;

        function nextTitle() {
            changeTitle(titleSequence[currentIndex].title, titleSequence[currentIndex].delay);
            currentIndex = (currentIndex + 1) % titleSequence.length;
            setTimeout(nextTitle, titleSequence[currentIndex].delay);
        }

        nextTitle();
    }

    // Start the title loop
    titleLoop();
});

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.querySelector("h1").onmouseover = event => {
  let iteration = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return event.target.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= event.target.dataset.value.length) {
      clearInterval(interval);

      // After the random number effect, show "Mauro" with a delay
      setTimeout(() => {
        event.target.innerText = "~$Mauro";

        // Another delay before restarting the random number effect with "~$H4ch1net"
        setTimeout(() => {
          startRandomNumberEffect(event.target, event.target.dataset.value);
        }, 1000);
      }, 1000);
    }

    iteration += 1 / 3;
  }, 30);
}

function startRandomNumberEffect(target, originalText) {
  interval = setInterval(() => {
    target.innerText = target.innerText
      .split("")
      .map(() => letters[Math.floor(Math.random() * 26)])
      .join("");
  }, 30);

  // After a short delay, reset the text to the original value
  setTimeout(() => {
    clearInterval(interval);
    target.innerText = originalText;
  }, 2000);
}

// Initial random number effect on page load
window.onload = () => {
  const h1 = document.querySelector("h1");
  startRandomNumberEffect(h1, h1.dataset.value);
};
