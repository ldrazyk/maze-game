import createElement from "../utils/createElement.mjs";

const ChangeColorsPanel = function () {
    
    let mainElement;
    const components = {};
    const id = 'change-colors-panel';

    const createElements = function () {
    
        const createMain = function () {
        
            mainElement = createElement(
                {
                    type: 'div',
                    id: id,
                    classList: id,
                    textContent: 'Change Colors',
                }
            );
        };

        createMain();
    };

    const init = function () {
    
        createElements();
    }();

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
            update,
            getId,
            getMain,
        }
    );
};

export default ChangeColorsPanel;