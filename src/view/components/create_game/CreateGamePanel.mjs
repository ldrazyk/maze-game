const CreateGamePanel = function ({ gameState, createGame, hideParent, factory }) {
    
    const id = 'create-game-panel';
    const components = {};
    let elements;

    const thisCreateGame = function () {

        const getGameSpec = function () {

            const getBoardSpec = function () {

                const spec = {};

                const size = components.boardPanel.getBoardSize();
                const id = components.boardPanel.getBoardId();

                if (id) {
                    spec.id = id;
                } else if (size) {
                    spec.sizes = [size];
                }

                return spec;
            };

            const getPawnsSpec = function () {

                const pawnsAmount = components.pawnsPanel.getPawnsAmount();
                const spec = [];

                for (let [type, amount] of Object.entries(pawnsAmount)) {

                    spec.push({ type, amount });
                }
            
                return [spec, spec];
            };
        
            return {
                boardSpec: getBoardSpec(),
                pawnsSpec: getPawnsSpec(),
            };
        };
        
        createGame(getGameSpec());
        hideParent();
    };

    const createElements = function () {
    
        elements = factory.createElements(
            {
                main: {
                    type: 'div',
                    id: id,
                    classList: 'panel ' + id,
                },
                confirmSection: {
                    type: 'section',
                    classList: 'confirm-section',
                    parentKey: 'main',
                },
            }
        )
    };

    const createComponents = function () {
    
        components.boardPanel = factory.createComponent(
            {
                type: 'boardSetupPanel',
                gameState,
                factory,
                parent: elements.main,
            }
        );

        components.pawnsPanel = factory.createComponent(
            {
                type: 'pawnsSetupPanel',
                factory,
                parent: elements.main,
            }
        );

        components.createGameButton = factory.createComponent(
            {
                type: 'buttonCreateGame',
                onClick: thisCreateGame,
                factory,
                parent: elements.confirmSection,
            }
        );
    };

    const init = function () {
    
        createElements();
        createComponents();
    }();


    const getId = function () {
        
        return id;
    };
    
    const getMain = function () {
        
        return elements.main;
    };
    
    return Object.freeze(
        {
            getId,
            getMain,
        }
    );
};

export default CreateGamePanel;