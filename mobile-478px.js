document.addEventListener("DOMContentLoaded", function() {
    const vorigeButton = document.getElementById("back-button");
    const nextButton = document.getElementById("volgende-button");
    const loadingProgress = document.querySelector('.laad-progress');
    let currentState = 0;
    let activeIndex = 0;

    function updateContent() {
        console.log("Updating content for currentState:", currentState);

        const elements = [
            ["eerste-title", "eerste-subtitle", "eerste-link",],
            ["tweede-title", "tweede-subtitle", "tweede-link",],
            ["derde-title", "derde-subtitle", "derde-link",]
        ];

        elements.flat().forEach(id => {
            const elem = document.getElementById(id);
            if (elem) {
                elem.style.opacity = "0";
            }
        });

        elements[currentState].forEach(id => {
            const elem = document.getElementById(id);
            if (elem) {
                elem.style.opacity = "1";
            }
        });

        loadingProgress.style.width = `${(currentState + 1) * 33.3}%`;

        const elementToModify = document.querySelector('.block-2-lijn3');

        if (currentState === 1 || currentState === 2) {
            elementToModify.classList.add('geen-underline');
        } else {
            elementToModify.classList.remove('geen-underline');
        }
    }

    function goForward() {
        if (currentState < 2) { 
            vorigeButton.setAttribute("disabled", "disabled");
            nextButton.setAttribute("disabled", "disabled");

            currentState++;
            updateContent();
        }
        if (activeIndex < 2) {  
            const nextindex = activeIndex + 1;

            const currentGroup = document.querySelector(`[data-index="${activeIndex}"]`);
            const nextGroup = document.querySelector(`[data-index="${nextindex}"]`);

            currentGroup.dataset.status = "after";
            nextGroup.dataset.status = "becoming-active";

            setTimeout(() => {
                nextGroup.dataset.status = "active";
                activeIndex = nextindex;
            });
        }

        const allButtons = document.querySelectorAll('.block-3-knop-container .block-3-knop');

        allButtons.forEach(button => {
            button.classList.remove('state-0', 'state-1', 'state-2');
        });

        allButtons.forEach(button => {
            button.classList.add(`state-${currentState}`);
        });

        const lineContainer = document.querySelector('.lijn-container');

        lineContainer.classList.remove('state-0', 'state-1', 'state-2');

        lineContainer.classList.add(`state-${currentState}`);
    }

    function goBack() {
        vorigeButton.setAttribute("disabled", "disabled");
        nextButton.setAttribute("disabled", "disabled");

        if (currentState > 0) {
            currentState--;
            updateContent();
        }
        if (activeIndex > 0) {  
            const previndex = activeIndex - 1;

            const currentGroup = document.querySelector(`[data-index="${activeIndex}"]`);
            const prevGroup = document.querySelector(`[data-index="${previndex}"]`);

            currentGroup.dataset.status = "before";
            prevGroup.dataset.status = "becoming-active-from-before";

            setTimeout(() => {
                prevGroup.dataset.status = "active";
                activeIndex = previndex;
            });
        }

        const allButtons = document.querySelectorAll('.block-3-knop-container .block-3-knop');

        allButtons.forEach(button => {
            button.classList.remove('state-0', 'state-1', 'state-2');
        });

        allButtons.forEach(button => {
            button.classList.add(`state-${currentState}`);
        });

        const lineContainer = document.querySelector('.lijn-container');

        lineContainer.classList.remove('state-0', 'state-1', 'state-2');

        lineContainer.classList.add(`state-${currentState}`);
    }

    function updateButtons() {
        if (currentState === 0) {
            vorigeButton.setAttribute("disabled", "disabled");
            nextButton.removeAttribute("disabled");
        } else if (currentState === 2) {
            nextButton.setAttribute("disabled", "disabled");
            vorigeButton.removeAttribute("disabled");
        } else {
            vorigeButton.removeAttribute("disabled");
            nextButton.removeAttribute("disabled");
        }
    }

    vorigeButton.addEventListener("click", goBack);
    nextButton.addEventListener("click", goForward);
 vorigeButton.setAttribute("disabled", "disabled"); 
});