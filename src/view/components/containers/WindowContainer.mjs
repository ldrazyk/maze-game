import createElement from "../utils/createElement.mjs";

const WindowContainer = function ({ id, classList=false }) {
    
    let mainElement;
    const components = {
        container: false,
        closeButton: false,
    };
    let toggleFunction = false;

    let mediator;

    const createElements = function () {
    
        const createMain = function () {
        
            mainElement = createElement(
                {
                    type: 'div',
                    classList: 'window ' + classList,
                    id: id,
                }
            );
        };

        const createCloseButton = function () {
        
            components.closeButton = createElement(
                {
                    type: 'div',
                    classList: 'button close-button',
                    parent: mainElement,
                }
            )
        };

        const createContainer = function () {
        
            components.container = createElement(
                {
                    type: 'div',
                    classList: 'container',
                    parent: mainElement,
                }
            )
        };

        createMain();
        createCloseButton();
        createContainer();
    };

    const init = function () {
    
        createElements();
    }();

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };

    const setToggle = function (toggle) {
    
        toggleFunction = toggle;

        components.closeButton.addEventListener('click', toggleFunction);
    };

    const add = function (component) {
    
        try {
            components.container.appendChild(component.getMain());
        } catch {
            components.container.appendChild(component);
        }
    };

    const update = function () {
    
        return ;
    };

    const getId = function () {
        
        return id;
    };
    
    const getMain = function () {
        
        return mainElement;
    };
    
    
    return Object.freeze(
        {
            setMediator,
            setToggle,
            add,
            update,
            getId,
            getMain,
        }
    );
};

export default WindowContainer;