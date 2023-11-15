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
