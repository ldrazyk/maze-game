const ColorsPanel = function ({ gameState, factory }) {
    
    let mainElement;
    const components = [];
    const id = 'colors-panel';

    const createElements = function () {
    
        mainElement = factory.createElement(
            {
                type: 'div',
                id: id,
                classList: 'panel ' + id,
            }
        );
    };

    const createComponents = function () {
    
        [2, 1].forEach(playerNumber => {

            const component = factory.createComponent(
                {
                    type: 'changeColors',
                    playerNumber,
                    gameState,
                    factory,
                    parent: mainElement,
                }
            );
            components['player' + playerNumber] = component;
        });
    };

    const init = function () {
    
        createElements();
        createComponents();
    }();

    const update = function ({ code, gameState }) {
    
        if (['changePlayerName'].includes(code)) {
            Object.values(components).forEach(component => {
                component.update({ code, gameState });
            });
        }
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

export default ColorsPanel;