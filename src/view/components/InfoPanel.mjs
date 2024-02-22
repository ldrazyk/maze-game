import createElement from "../utils/createElement.mjs";

const InfoPanel = function () {
    
    let mainElement;
    let screen;
    const id = 'info_panel';

    let mediator;


    const createElements = function () {
    
        const createMain = function () {
        
            mainElement = createElement(
                {
                    type: 'div',
                    id: id,
                    textContent: 'Info Panel'
                }
            );
        };

        const createScreen = function () {
        
            screen = createElement(
                {
                    type: 'div',
                    classList: 'screen',
                    textContent: 'This is screen...',
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