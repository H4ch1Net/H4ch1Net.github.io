// script.js

document.addEventListener("DOMContentLoaded", function () {
    const h1Element = document.getElementById("h4ch1net");

    setTimeout(() => {
        // Add a class to apply the transformation to eyes
        h1Element.classList.add("eyes-transform");

        // Remove the class after another 2 seconds to revert to the original state
        setTimeout(() => {
            h1Element.classList.remove("eyes-transform");
        }, 20000);
    }, 10000);
});
