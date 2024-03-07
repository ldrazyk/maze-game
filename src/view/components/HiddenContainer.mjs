import createElement from "../utils/createElement.mjs";

const HiddenContainer = function ({ id=false, classList=false, buttonText=false, cover=true, parent=false }) {
    
    let mainElement;
    let containers = {
        button: false,
        cover: false,
        content: false,
    };

    const toggle = function () {
    
        mainElement.classList.toggle('collapsed') ;
    };

    const createElements = function () {
    
        const createMain = function () {
        
            mainElement = createElement(
                {
                    type: 'div',
                    classList: 'hidden-container collapsed ' + classList,
                    id: id,
                    parent: parent,
                }
            );
        };

        const createButton = function () {
        
            containers.button = createElement(
                {
                    type: 'div',
                    classList: 'button',
                    textContent: buttonText,
                    onClick: toggle,
                    parent: mainElement,
                }
            );
        };

        const createCover = function () {
        
            containers.cover = createElement(
                {
                    type: 'div',
                    classList: 'cover',
                    onClick: toggle,
                    parent: mainElement,
                }
            )
        };

        const createContent = function () {
        
            containers.content = createElement(
                {
                    type: 'div',
                    classList: 'content',
                    parent: mainElement,
                }
            )
        };

        createMain();
        createButton();
        if (cover) {
            createCover();
        }
        createContent();
    };

    const init = function () {
    
        createElements();
    }();

    const __add = function ({ component, container }) {
    
        try {
            container.appendChild(component.getMain());
        } catch {
            container.appendChild(component);
        }
    };

    const addButton = function (component) {
    
        __add({ component, container: containers.button });
    };

    const add = function ({ component, setToggle=false }) {
    
        __add({ component, container: containers.content });

        if (setToggle) {
            component.setToggle(toggle);
        }
    };

    const getId = function () {
        
        return id;
    };
    
    const getMain = function () {
        
        return mainElement;
    };
    
    
    return Object.freeze(
        {
            addButton,
            add,
            getId,
            getMain,
        }
    );
};

export default HiddenContainer;