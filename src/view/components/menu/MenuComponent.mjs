const MenuComponent = function ({ gameState, factory }) {
    
    let mainElement;
    const elements = {};
    const containers = {}
    const components = {};
    const id = 'menu';

    let state;

    let mediator;

    const toggleContainer = function (id) {
    
        containers[id].toggle();
    };

    const createState = function () {
    
        state = factory.createState();

        state.add({
            name: 'isPlaying',
            value: false,
            onClick: false,
        });

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
                        onClick: () => {
                            if (state.get('isPlaying')) {
                                toggleContainer('endGameWindow');
                            } else {
                                toggleContainer('createGameWindow');
                            }
                        },
                        windowId: 'endGameWindow',
                    },
                    {
                        id: 'colorsButton',
                        textContent: 'Colors',
                        onClick: () => toggleContainer('colorsWindow'),
                    },
                    {
                        id: 'rulesButton',
                        textContent: 'Rules',
                        onClick: () => toggleContainer('rulesWindow'),
                    },
                ];

                buttonsSpec.forEach(spec => {

                    const button = factory.createElement({
                        type: 'div',
                        classList: 'button option',
                        textContent: spec.textContent,
                        onClick: spec.onClick,
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
                'createGameWindow',
                'colorsWindow',
                'rulesWindow',
            ];

            ids.forEach(id => {

                const windowComponent = factory.createComponent({
                    type: 'windowContainer',
                    id,
                    classList: 'fixed-window',
                    onHide: () => containers.mainDropdown.show(false),
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
        
            const component = factory.createComponent({
                ...spec, 
                gameState, 
                factory, 
                toggleParent: () => {
                    spec.parent.toggle();
                },
                hideParent: () => {
                    spec.parent.show(false);
                },
            });

            components[spec.id] = component;

            return component;
        };

        const componentsSpec = [
            {
                id: 'endGamePanel',
                type: 'endGamePanel',
                endGame: (spec) => mediator.endGame(spec),
                toggleNext: () => toggleContainer('createGameWindow'),
                parent: containers.endGameWindow,
            },
            {
                id: 'createGamePanel',
                type: 'createGamePanel',
                createGame: (spec) => mediator.createGame(spec),
                parent: containers.createGameWindow,
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

    const showWindowForTesting = function () {
    
        const showCreateGameWindow = function () {
        
            containers.createGameWindow.show();
        };
    };

    const init = function () {
    
        createState();
        createMain();
        createContainers();
        createComponents();
        showWindowForTesting();
    }();

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };

    const update = function ({ code, object }) {
    
        if (['changePlayerName'].includes(code)) {
            Object.values(components).forEach(component => {
                component.update({ code, gameState: object });
            });
        } else if (['createGame', 'endGame'].includes(code)) {
            state.update('isPlaying', object.isPlaying());
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