const CreateGamePanel = function ({ createGame, hideParent, factory }) {
    
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
        
        console.log('Create Game');
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
                pawnsSection: {
                    type: 'section',
                    classList: 'pawns-section',
                    parentKey: 'main',
                },
                boardSection: {
                    type: 'section',
                    classList: 'board-section',
                    parentKey: 'main',
                },
                confirmSection: {
                    type: 'section',
                    classList: 'confirm-section',
                    parentKey: 'main',
                },
            }
        )
        return ;
    };

    const createComponents = function () {
    
        components.boardPanel = factory.createComponent(
            {
                type: 'boardSetupPanel',
                factory,
                parent: elements.boardSection,
            }
        );

        components.pawnsPanel = factory.createComponent(
            {
                type: 'pawnsSetupPanel',
                factory,
                parent: elements.pawnsSection,
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