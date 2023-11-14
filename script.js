// script.js

// JavaScript code to handle the shake and glitch movements
const h4ch1netElement = document.getElementById('h4ch1net');

h4ch1netElement.addEventListener('click', () => {
    console.log('Clicked!'); // Log to the console for debugging

    // Remove all classes to stop any ongoing animations
    h4ch1netElement.classList.remove('shake');

    // Reset the glitch animation
    h4ch1netElement.style.animation = '';

    // Trigger the glitch effect after a delay of 3 seconds
    setTimeout(() => {
        h4ch1netElement.style.animation = 'glitch 3s infinite';
    }, 3000); // 3000ms matches the glitch animation duration
});
