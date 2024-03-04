import createElement from "../utils/createElement.mjs";

const InfoPanel = function ({ order=false }) {
    
    let mainElement;
    let screen;
    const id = 'info-panel';

    let mediator;


    const createElements = function () {
    
        const createMain = function () {
        
            mainElement = createElement(
                {
                    type: 'div',
                    classList: 'panel info-panel',
                    order: order,
                }
            );
        };

        const createScreen = function () {
        
            screen = createElement(
                {
                    type: 'div',
                    classList: 'screen',
                    parent: mainElement,
                }
            );
        };

        createMain();
        createScreen();
    };

    const init = function () {
    
        createElements();
    }();

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };

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
            setMediator,
            update,
            getId,
            getMain,
        }
    );
};

export default InfoPanel;