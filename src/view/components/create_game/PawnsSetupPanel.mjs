const PawnsSetupPanel = function ({ factory }) {
    
    const id = 'pawns-setup-panel';
    let elements;
    let pawnComponents = {};

    const createElements = function () {
    
        elements = factory.createElements(
            {
                main: {
                    type: 'div',
                    id: id,
                    classList: 'panel ' + id,
                    textContent: 'Pawns Setup Panel',
                }
            }
        );
    };

    const init = function () {
    
        createElements();
    }();
    
    const getPawnsAmount = function () {
    
        const amount = {};

        for (let component of Object.values(pawnComponents)) {

            amount[component.getType()] = component.getAmount();
        }

        // return amount;

        // TEST
        return {
            'lion': 1,
            'snake': 1,
            'rooster': 1
        };
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