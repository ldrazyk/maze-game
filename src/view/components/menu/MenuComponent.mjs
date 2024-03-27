const MenuComponent = function ({ gameState, factory }) {
    
    let mainElement;
    const elements = {};
    const containers = {}
    const components = {};
    const id = 'menu';

    let mediator;

    const toggleContainer = function (id) {
    
        containers[id].toggle();
    };

    const createMain = function () {
        
        mainElement = factory.createElement(
            {
                type: 'div',
                classList: 'menu',
            }
        );
    };

    const createContainers = function () {

        const createMainDropdownContainer = function () {
        
            const createDropdown = function () {
            
                const dropdown = factory.createComponent(
                    {
                        type: 'dropdownContainer',
                        id: 'mainDropdown',
                        // classList: 'dropdown',
                        factory,
                        parent: mainElement 
                    }
                );
    
                const svg = factory.createElement(
                    {
                        type: 'svg',
                        name: 'burger',
                    }
                );
    
                dropdown.appendToButton(svg);
    
                containers.mainDropdown = dropdown;
            };

            const createOptionButtons = function () {
            
                const buttonsSpec = [
                    {
                        id: 'newGameButton',
                        textContent: 'New Game',
                        windowId: 'endGameWindow',
                    },
                    {
                        id: 'colorsButton',
                        textContent: 'Colors',
                        windowId: 'colorsWindow',
                    },
                    {
                        id: 'rulesButton',
                        textContent: 'Rules',
                        windowId: 'rulesWindow',
                    },
                ];

                buttonsSpec.forEach(spec => {

                    const button = factory.createElement({
                        type: 'div',
                        classList: 'button option',
                        textContent: spec.textContent,
                        onClick: () => toggleContainer(spec.windowId),
                        parent: containers.mainDropdown,
                    });

                    elements[spec.id] = button;
                });
            };

            createDropdown();
            createOptionButtons();
        };

        const createWindowContainers = function () {
        
            const ids = [
                'endGameWindow',
                'newGameWindow',
                'colorsWindow',
                'rulesWindow',
            ];

            ids.forEach(id => {

                const windowComponent = factory.createComponent({
                    type: 'windowContainer',
                    id,
                    classList: 'fixed-window',
                    factory,
                    parent: mainElement,
                });

                containers[id] = windowComponent;
            });
        };

        createMainDropdownContainer();
        createWindowContainers();
    };

    const createComponents = function () {

        const createComponent = function (spec) {
        
            const component = factory.createComponent({ ...spec, gameState, factory });

            components[spec.id] = component;

            return component;
        };

        const componentsSpec = [
            {
                id: 'endGamePanel',
                type: 'endGamePanel',
                endGame: (spec) => components.newGamePanel.endGame(spec),
                parent: containers.endGameWindow,
            },
            {
                id: 'newGamePanel',
                type: 'newGamePanel',
                endGame: (spec) => mediator.endGame(spec),
                createGame: (spec) => mediator.createGame(spec),
                parent: containers.newGameWindow,
            },
            {
                id: 'colorsPanel',
                type: 'colorsPanel',
                parent: containers.colorsWindow,
            },
            {
                id: 'rulesPanel',
                type: 'rulesPanel',
                parent: containers.rulesWindow,
            }
        ];

        componentsSpec.forEach(spec => {

            createComponent(spec);
        });
    };

    const init = function () {
    
        createMain();
        createContainers();
        createComponents();
    }();

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };

    const update = function ({ code, object }) {
    
        if (['changePlayerName'].includes(code)) {
            Object.values(components).forEach(component => {
                component.update({ code, gameState: object });
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
            setMediator,
            update,
            getId,
            getMain,
        }
    );
};

export default MenuComponent;