// script.js

// JavaScript code to handle the shake and glitch movements
const h4ch1netElement = document.getElementById('h4ch1net');

h4ch1netElement.addEventListener('click', () => {
    // Add the "shake" class to trigger the shake animation
    h4ch1netElement.classList.add('shake');

    // Remove the "shake" class after the shake animation completes
    setTimeout(() => {
        h4ch1netElement.classList.remove('shake');
    }, 500); // 500ms matches the shake animation duration

    // Trigger the glitch effect
    h4ch1netElement.style.animation = 'glitch 3s infinite';
    setTimeout(() => {
        h4ch1netElement.style.animation = ''; // Reset the animation
    }, 3000); // 3000ms matches the glitch animation duration
});
