const ContainerComponent = function ({ id, type='div' }) {
    
    let mainElement;
    
    const createMainElement = function () {
        
        mainElement = document.createElement(type);
        mainElement.id = id;
    };

    const init = function () {
        
        createMainElement();
    }();

    const add = function (component) {
        
        mainElement.appendChild(component.getMain());
    };

    const remove = function (component) {
    
        mainElement.remove(component);
    };

    const getId = function () {
        
        return id;
    };

    const getMain = function () {
        
        return mainElement;
    };

    return Object.freeze(
        {
            add: add,
            remove: remove,
            getId: getId,
            getMain: getMain,
        }
    );
};

export default ContainerComponent;