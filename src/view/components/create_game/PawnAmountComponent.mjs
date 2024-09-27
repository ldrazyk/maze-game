const PawnAmountComponent = function ({ pawnType, min, max, factory }) {
    
    const id = "pawns-amount-component";
    let elements;
    let state;

    const createState = function () {
    
        state = factory.createState();

        const onAmountChange = function (amount) {
        
            elements.screenParagraph.textContent = String(amount);
        };

        state.add({
            name: 'amount',
            value: 1,
            onChange: onAmountChange,
        });
    };

    const add = function (addition) {

        const checkConditions = function (amount) {
        
            if (min <= amount && amount <= max) {
                return true;
            } else {
                return false;
            }
        };

        const newAmount = state.get('amount') + addition;

        if (checkConditions(newAmount)) {

            state.update('amount', newAmount);
        }
    };

    const createElements = function () {
    
        elements = factory.createElements({
            main: {
                type: 'div',
                classList: 'pawn-amount-panel',
            },
            icon: {
                type: 'div',
                classList: 'pawn-icon',
                parentKey: 'main',
            },
            iconSvg: {
                type: 'svg',
                name: pawnType,
                parentKey: 'icon',
            },
            amountPanel: {
                type: 'div',
                classList: 'amount-panel',
                parentKey: 'main',
            },
            screen: {
                type: 'div',
                classList: 'screen',
                parentKey: 'amountPanel',
            },
            screenParagraph: {
                type: 'p',
                textContent: 1,
                parentKey: 'screen',
            },
            plusButton: {
                type: 'div',
                classList: 'button plus-button',
                onClick: () => add(1),
                textContent: '+',
                parentKey: 'amountPanel',
            },
            minusButton: {
                type: 'div',
                classList: 'button minus-button',
                onClick: () => add(-1),
                textContent: '-',
                parentKey: 'amountPanel',
            },
        });
    };

    const init = function () {
    
        createState();
        createElements();
    }();

    const getType = function () {
    
        return pawnType;
    };

    const getAmount = function () {
    
        return state.get('amount');
    };

    const getId = function () {
        
        return id;
    };
    
    const getMain = function () {
        
        return elements.main;
    };
    
    return Object.freeze(
        {
            getType,
            getAmount,
            getId,
            getMain,
        }
    );
};

export default PawnAmountComponent;