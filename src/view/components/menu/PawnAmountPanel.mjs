const PawnAmountPanel = function ({ factory, pawnType, add=(n) => {console.log(pawnType + ' add ' + n)} }) {
    
    let elements = {};

    const createElements = function () {
    
        elements = factory.createElements({
            main: {
                type: 'div',
                classList: 'pawn-amount-panel',
            },
            icon: {
                type: 'div',
                classList: 'pawn-icon player-1',
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
    
        createElements();
    }();

    const update = function () {
    
        return ;
    };

    const getId = function () {
        
        return id;
    };
    
    const getMain = function () {
        
        return elements.main;
    };
    
    return Object.freeze(
        {
            update,
            getId,
            getMain,
        }
    );
};

export default PawnAmountPanel;