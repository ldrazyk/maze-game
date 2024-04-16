const WindowContainer = function ({ id, classList=false, onHide= () => {}, factory }) {
    
    let elements;

    const toggle = function () {
    
        elements.main.classList.toggle('hidden');
    };

    const show = function (show=true) {
    
        if (show) {
            elements.main.classList.remove('hidden');
        } else {
            elements.main.classList.add('hidden');
            onHide();
        }
    };

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
                onClick: () => show(false),
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
            cover: {
                type: 'div',
                classList: 'cover',
                onClick: () => show(false),
                parentKey: 'main',
            },
        };

        elements = factory.createElements(spec);
    };

    const init = function () {
    
        createElements();
        toggle();
    }();

    const appendChild = function (child) {
    
        factory.append({ parent: elements.container, child});
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
            appendChild,
            getId,
            getMain,
        }
    );
};

export default WindowContainer;