const DropdownContainer = function ({ id=false, classList=false, buttonText=false, cover=true, parent=false, factory }) {
    
    let elements;

    const toggle = function () {
    
        elements.main.classList.toggle('collapsed') ;
    };

    const show = function (show=true) {
    
        if (show) {
            elements.main.classList.remove('collapsed');
        } else {
            elements.main.classList.add('collapsed');
        }
    };

    const createElements = function () {

        const spec = {
            main: {
                type: 'div',
                classList: 'dropdown-container ' + classList,
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
        toggle();
    }();

    const appendToButton = function (element) {

        factory.append({parent: elements.button, child: element});
    };

    const appendChild = function (child) {
    
        factory.append({ parent: elements.content, child });
    };

    const getId = function () {
        
        return id;
    };

    const getMain = function () {
        
        return elements.main;
    };
    
    
    return Object.freeze(
        {
            toggle,
            show,
            appendToButton,
            appendChild,
            getId,
            getMain,
        }
    );
};

export default DropdownContainer;