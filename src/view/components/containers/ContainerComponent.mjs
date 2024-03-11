const ContainerComponent = function ({ id, elementType='div', classList=false, factory }) {
    
    let mainElement;
    
    const createMainElement = function () {
        
        mainElement = factory.createElement(
            {
                type: elementType,
                classList: classList,
                id: id,
            }
        );
    };

    const init = function () {
        
        createMainElement();
    }();

    const appendChild = function (element) {
        
        mainElement.appendChild(element);
    };

    const remove = function (element) {
    
        mainElement.remove(element);
    };

    const getId = function () {
        
        return id;
    };

    const getMain = function () {
        
        return mainElement;
    };

    return Object.freeze(
        {
            appendChild,
            remove,
            getId,
            getMain,
        }
    );
};

export default ContainerComponent;