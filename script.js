// script.js

// JavaScript code to handle the shake and glitch movements
const h4ch1netElement = document.getElementById('h4ch1net');
let animationsPaused = false;

h4ch1netElement.addEventListener('click', () => {
    console.log('Clicked!'); // Log to the console for debugging

    if (animationsPaused) {
        // If animations are paused, resume them
        h4ch1netElement.classList.remove('shake');
        h4ch1netElement.style.animation = 'glitch 3s infinite';
    } else {
        // If animations are not paused, pause them
        h4ch1netElement.classList.add('shake');
        h4ch1netElement.style.animation = '';
    }

    // Toggle the animation state
    animationsPaused = !animationsPaused;
});
