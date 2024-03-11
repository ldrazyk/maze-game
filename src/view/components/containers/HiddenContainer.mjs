const HiddenContainer = function ({ id=false, classList=false, buttonText=false, cover=true, parent=false, factory }) {
    
    let elements;

    const toggle = function () {
    
        elements.main.classList.toggle('collapsed') ;
    };

    const createElements = function () {

        const spec = {
            main: {
                type: 'div',
                classList: 'hidden-container collapsed ' + classList,
                id: id,
                parent: parent,
            },
            button: {
                type: 'div',
                classList: 'button',
                textContent: buttonText,
                onClick: toggle,
                parentKey: 'main',
            },
            content: {
                type: 'div',
                classList: 'content',
                parentKey: 'main',
            }
        };

        if (cover) {
            spec.cover = {
                type: 'div',
                classList: 'cover',
                onClick: toggle,
                parentKey: 'main',
            }
        }

        elements = factory.createElements(spec);
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
    
        __add({ component, container: elements.button });
    };

    const add = function ({ component, setToggle=false }) {
    
        __add({ component, container: elements.content });

        if (setToggle) {
            component.setToggle(toggle);
        }
    };

    const getId = function () {
        
        return id;
    };
    
    const getMain = function () {
        
        return elements.main;
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