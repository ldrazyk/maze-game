const RulesPanel = function ({ factory }) {
    
    const elements = {
        main: false,
        rulesContainer: false,
    };
    const id = 'rules-panel';

    
    const createMain = function () {

        elements.main = factory.createElement(
            {
                type: 'div',
                id: id,
                classList: 'panel ' + id,
            }
        );
    };

    const createRulesContainer = function () {

        if (elements.rulesContainer) {
            elements.rulesContainer.remove();
        }
    
        elements.rulesContainer = factory.createElement(
            {
                type: 'div',
                classList: 'rules',
                parent: elements.main,
            }
        );
    };

    const updateRules = function () {

        const getRulesLines = function () {
        
            const rulesLines = [
                "To win capture oponents Flag.",
                "Lion kills Rooster.",
                "Rooster kills Snake.",
                "Snake kills Lion.",
                "If you have no pawns you loose.",
                "Every turn you must move/hold all pawns.",
                "You can't hold more than half of your pawns.",
                "Commands:",
                "Start next turn: press 'T' or 'Hourglass Button'",
                "Move Pawn: press 'Arrows' or click Field.",
                "Hold Pawn: press 'Enter' or 'Cross Button' or click selected pawn.",
                "Select Pawn: click Pawn.",
                "Select next Pawn: press 'S' or 'Frame Button'.",
                "Undo: press 'Z' or 'Left-Bend Button'.",
                "Redo: press 'Y' or 'Right-Bend Button'.",
            ];

            return rulesLines;
        };

        const addRulesElements = function (rulesLines) {
        
            rulesLines.forEach(line => {
    
                const lineElement = factory.createElement(
                    {
                        type: 'p',
                        classList: 'rules-line',
                        textContent: line,
                        parent: elements.rulesContainer,
                    }
                );
            });
        };
        
        createRulesContainer();
        const rulesLines = getRulesLines();
        addRulesElements(rulesLines);
    };

    const init = function () {
    
        createMain();
        updateRules();
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

export default RulesPanel;