const MenuComponent = function ({ factory }) {
    
    let mainElement;
    let components = {};
    const id = 'menu';

    let mediator;

    const createElements = function () {

        const createMain = function () {
        
            mainElement = factory.createElement(
                {
                    type: 'div',
                    classList: 'menu',
                }
            );
        };

        const createMainDropdown = function () {
        
            components.mainDropdown = factory.createComponent(
                {
                    type: 'hiddenContainer',
                    id: 'main-dropdown',
                    classList: 'dropdown',
                    factory,
                    parent: mainElement 
                }
            );
        };

        const createOptions = function () {

            const appendToOptionWindow = function ({ component, buttonText }) {
            
                const option = factory.createComponent(
                    {
                        type: 'hiddenContainerWithWindow',
                        hiddenSpec: {
                            classList: 'option',
                            buttonText: buttonText,
                            cover: false,
                        },
                        windowSpec: {
                            classList: 'fixed-window',
                            setToggle: true,
                        },
                        factory,
                        parent: components.mainDropdown,
                    }
                );

                option.appendChild(component);
            };

            const createOption = function ({ id, buttonText, componentSpec }) {
            
                const component = factory.createComponent({ ...componentSpec, factory });

                components[id] = component;

                appendToOptionWindow({ component, buttonText });
            };

            const create = function () {
            
                const optionsSpec = [
                    {
                        id: 'colorsPanel',
                        buttonText: 'Change Colors',
                        componentSpec: {
                            type: 'colorsPanel',
                        }
                    },
                    {
                        id: 'rulesPanel',
                        buttonText: 'Show Rules',
                        componentSpec: {
                            type: 'rulesPanel',
                        }
                    },
                ];
                
                optionsSpec.forEach(spec => {
                    createOption(spec);
                });
            };

            create();
        };



        createMain();
        createMainDropdown();
        createOptions();
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

export default MenuComponent;