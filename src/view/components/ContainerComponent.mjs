import createElement from "../utils/createElement.mjs";

const ContainerComponent = function ({ id, type='div', classList=false }) {
    
    let mainElement;
    
    const createMainElement = function () {
        
        mainElement = createElement(
            {
                type: type,
                classList: classList,
                id: id,
            }
        );
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