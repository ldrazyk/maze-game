const PawnsSetupPanel = function ({ factory }) {
    
    const minPanwsAmount = 1;
    const maxPawnsAmount = 3;

    const id = 'pawns-setup-panel';
    let elements;
    const pawnComponents = {};


    const createElements = function () {
    
        elements = factory.createElements(
            {
                main: {
                    type: 'section',
                    id: id,
                    classList: 'pawns-section',
                }
            }
        );
    };

    const createComponents = function () {
    
        ['lion', 'rooster', 'snake'].forEach(type => {

            pawnComponents[type] = factory.createComponent(
                {
                    type: 'pawnAmountComponent',
                    pawnType: type,
                    min: minPanwsAmount,
                    max: maxPawnsAmount,
                    factory,
                    parent: elements.main,
                }
            );                    
        });
    };

    const init = function () {
    
        createElements();
        createComponents();
    }();
    
    const getPawnsAmount = function () {
    
        const amount = {};

        for (let component of Object.values(pawnComponents)) {

            amount[component.getType()] = component.getAmount();
        }

        return amount;
    };

    const getId = function () {
        
        return id;
    };
    
    const getMain = function () {
        
        return elements.main;
    };
    
    return Object.freeze(
        {
            getPawnsAmount,
            getId,
            getMain,
        }
    );
};

export default PawnsSetupPanel;