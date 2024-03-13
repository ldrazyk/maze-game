const WindowContainer = function ({ id, classList=false, factory }) {
    
    let elements;
    let toggleFunction = false;

    let mediator;

    const createElements = function () {

        const spec = {
            main: {
                type: 'div',
                classList: 'window ' + classList,
                id: id,
            },
            closeButton: {
                type: 'div',
                classList: 'button close-button',
                parentKey: 'main',
            },
            svg: {
                type: 'svg',
                name: 'close',
                parentKey: 'closeButton',
            },
            container: {
                type: 'div',
                classList: 'container',
                parentKey: 'main',
            },
        };

        elements = factory.createElements(spec);
    };

    const init = function () {
    
        createElements();
    }();

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };

    const setToggle = function (toggle) {
    
        toggleFunction = toggle;

        elements.closeButton.addEventListener('click', toggleFunction);
    };

    const appendChild = function (child) {
    
        factory.append({ parent: elements.container, child});
    };

    const update = function () {
    
        return ;
    };

    const getId = function () {
        
        return id;
    };
    
    const getMain = function () {
        
        return elements.main;
    };
    
    
    return Object.freeze(
        {
            setMediator,
            setToggle,
            appendChild,
            update,
            getId,
            getMain,
        }
    );
};

export default WindowContainer;