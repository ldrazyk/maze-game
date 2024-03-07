import createElement from "../utils/createElement.mjs";

const RulesPanel = function () {
    
    let mainElement;
    const components = {
        rulesContainer: false,
    };
    const id = 'rules-panel';

    
    const createMain = function () {

        mainElement = createElement(
            {
                type: 'div',
                id: id,
                classList: id,
            }
        );
    };

    const createRulesContainer = function () {

        if (components.rulesContainer) {
            components.rulesContainer.remove();
        }
    
        components.rulesContainer = createElement(
            {
                type: 'div',
                classList: 'rules',
                parent: mainElement,
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
                "If you're left with no pawns you loose.",
                "You have to move or hold all of your pawns each turn.",
                "You can't hold more than half of your pawns.",
            ];

            return rulesLines;
        };

        const addRulesElements = function (rulesLines) {
        
            rulesLines.forEach(line => {
    
                const lineElement = createElement(
                    {
                        type: 'p',
                        classList: 'rules-line',
                        textContent: line,
                        parent: components.rulesContainer,
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

export default RulesPanel;