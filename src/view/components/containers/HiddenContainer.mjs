const HiddenContainer = function ({ id=false, classList=false, buttonText=false, cover=true, parent=false, factory }) {
    
    let elements;
    let childContainer;

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

    const appendToButton = function (element) {

        factory.append({parent: elements.button, child: element});
    };

    const addContainer = function ({ container, setToggle=false }) {
    
        childContainer = container;

        factory.append({ parent: elements.content, child: container })

        if (setToggle) {
            container.setToggle(toggle);
        }
    };

    const appendChild = function (child, setToggle=false) {
    
        let parent;
        if (childContainer) {
            parent = childContainer;
        } else {
            parent = elements.content;
        }

        factory.append({ parent, child });

        if (setToggle) {
            child.setToggle(toggle);
        }
    };

    const getId = function () {
        
        return id;
    };

    const getToggle = function () {
    
        return toggle;
    };
    
    const getMain = function () {
        
        return elements.main;
    };
    
    
    return Object.freeze(
        {
            appendToButton,
            addContainer,
            appendChild,
            getId,
            getToggle,
            getMain,
        }
    );
};

export default HiddenContainer;