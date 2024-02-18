import createElement from "../utils/createElement.mjs";

const ButtonComponent = function ({ id=false, text=false, onClick, order=false }) {
    let mainElement;
    let imageElement;

    const createElements = function () {

        let btnId = false;
        if (id) {
            btnId = 'btn-' + id;
        }

        mainElement = createElement({ type: 'button', id: btnId, text, order});
        imageElement = createElement({ type: 'div', classList: 'btn-img', parent: mainElement});
        
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