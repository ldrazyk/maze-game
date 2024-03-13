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
                "If you're left with no pawns you loose.",
                "You have to move or hold all of your pawns each turn.",
                "You can't hold more than half of your pawns.",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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