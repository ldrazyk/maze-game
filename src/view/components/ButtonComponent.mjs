const ButtonComponent = function ({ id, text, onClick, order }) {
    let mainElement;

    const createMainElement = function () {

        mainElement = document.createElement('button');
        mainElement.textContent = text;
        mainElement.id = 'btn_' + id;
        mainElement.style.order = order;
    };

    const init = function() {
        
        createMainElement();
    }();

    const activate = function () {

        mainElement.addEventListener('click', onClick);
        mainElement.classList.add('active');
    };

    const disactivate = function () {

        mainElement.removeEventListener('click', onClick);
        mainElement.classList.remove('active');
    };

    const appendTo = function (container) {
        
        container.appendChild(mainElement);
    };

    return Object.freeze(
        {
            activate: activate,
            disactivate: disactivate,
            appendTo: appendTo,
        }
    );
};

export default ButtonComponent;