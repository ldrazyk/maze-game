import createElement from "../utils/createElement.mjs";

const ButtonComponent = function ({ id=false, text=false, onClick, order=false, svgNames, getSvgCopy }) {
    let mainElement;
    let containers = [];

    const createElements = function () {

        let btnId = false;
        if (id) {
            btnId = 'btn-' + id;
        }

        mainElement = createElement({ type: 'button', id: btnId, text, order});

        containers[0] = createElement({ type: 'div', classList: 'container positive', parent: mainElement});
        containers[1] = createElement({ type: 'div', classList: 'container negative', parent: mainElement});

        const addSvgsToContainers = function () {
        
            [0, 1].forEach(n => {

                const svg = getSvgCopy(svgNames[n]);
                containers[n].appendChild(svg);
            });
        };

        addSvgsToContainers();
    };

    const init = function() {
        
        createElements();
    }();

    const setActive = function (active=true) {

        if (active) {

            mainElement.addEventListener('click', onClick);
            mainElement.classList.add('active');
        } else {

            mainElement.removeEventListener('click', onClick);
            mainElement.classList.remove('active');
        }
    };

    const getMain = function () {
    
        return mainElement;
    };

    return Object.freeze(
        {
            setActive,
            getMain,
        }
    );
};

export default ButtonComponent;