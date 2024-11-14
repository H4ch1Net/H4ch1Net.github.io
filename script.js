document.addEventListener("DOMContentLoaded", function () {
  const h1Element = document.getElementById("h4ch1net");
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789`~!@#$%^&*()-=+<>/\"";

  let iterationTimeout;
  let effectInterval;

  function startRandomLetterEffect(target, newText, duration, callback) {
      let iteration = 0;

      // Clear any existing effect interval to prevent overlapping effects
      clearInterval(effectInterval);
      clearTimeout(iterationTimeout);

      // Set a longer duration for the random letter effect
      effectInterval = setInterval(() => {
          target.innerText = newText
              .split("")
              .map((letter, index) => {
                  if (index < iteration) {
                      return newText[index];
                  }
                  return characters[Math.floor(Math.random() * characters.length)];
              })
              .join("");

          // Slow down the iteration to make the effect more gradual
          iteration += 1 / newText.length; // Increment more slowly for a smoother transition

          if (iteration >= newText.length) {
              clearInterval(effectInterval);
              if (callback) {
                  setTimeout(callback, 500);
              }
          }
      }, 50); // Slowed down interval for a more noticeable effect

      // Ensure that the effect stops after the extended duration
      iterationTimeout = setTimeout(() => {
          clearInterval(effectInterval);
          if (callback) {
              callback();
          }
      }, duration);
  }

  function changeHeaderTextSequence() {
      // Step 1: Display "~$H4ch1Net" for 5 seconds
      h1Element.innerText = "~$H4ch1Net";
      setTimeout(() => {
          // Step 2: Random letter effect to transition to "~$Mauro" for ? seconds
          startRandomLetterEffect(h1Element, "~$Mauro", 3000, () => {
              // Step 3: Random chance to display "Nerd"
              if (Math.random() < 0.3) { // 30% chance to display "Nerd"
                  h1Element.innerText = "Nerd";
                  setTimeout(() => {
                      // Continue sequence after showing "Nerd" for 2 seconds
                      continueSequenceFromMauro();
                  }, 2000);
              } else {
                  continueSequenceFromMauro();
              }
          });
      }, 5000);
  }

  function continueSequenceFromMauro() {
      // Step 4: Display "~$Mauro" for 3 seconds
      h1Element.innerText = "~$Mauro";
      setTimeout(() => {
          // Step 5: Random letter effect to transition to "~$H4ch1" for 6 seconds
          startRandomLetterEffect(h1Element, "~$H4ch1", 3000, () => {
              // Step 6: Random chance to display "Nerd"
              if (Math.random() < 0.3) { // 30% chance to display "Nerd"
                  h1Element.innerText = "Nerd";
                  setTimeout(() => {
                      // Continue sequence after showing "Nerd" for 2 seconds
                      continueSequenceFromH4ch1();
                  }, 2000);
              } else {
                  continueSequenceFromH4ch1();
              }
          });
      }, 3000);
  }

  function continueSequenceFromH4ch1() {
      // Step 7: Display "~$H4ch1" for 3 seconds
      h1Element.innerText = "~$H4ch1";
      setTimeout(() => {
          // Step 8: Random letter effect to transition to "~$H4ch1Net" for 6 seconds
          startRandomLetterEffect(h1Element, "~$H4ch1Net", 3000, () => {
              // Step 9: Restart the sequence by displaying "~$H4ch1Net"
              changeHeaderTextSequence();
          });
      }, 3000);
  }

  // Start the sequence
  changeHeaderTextSequence();
});
