const CreateGamePanel = function ({ factory, gameState, createGame }) {
    
    const elements = {};
    const id = 'create-game-panel';



    const newGame = function () {

        const create = function () {
        
            const boardSpec = {
                sizes: [7],
            };
        
            const pawnsSpec1 = [
                {type: 'lion', amount: 1}, 
                {type: 'rooster', amount: 1}, 
                {type: 'snake', amount: 1}
            ];
        
            const pawnsSpec = [pawnsSpec1, pawnsSpec1];
        
            createGame({ boardSpec, pawnsSpec });
        };

        create();
        toggle();
    };

    
    const createMain = function () {

        elements.main = factory.createElement(
            {
                type: 'div',
                id: id,
                classList: 'panel ' + id,
                textContent: 'Create Game Panel',
            }
        );
    };

    const createBoards = function () {
    
        const printBoardNames = function () {
        
            const iterator = gameState.getBoardDummyIterator();

            const firstBoardIterator = iterator.next().getIterator();

            while (firstBoardIterator.hasNext()) {
                console.log(firstBoardIterator.next());
            }

            while (iterator.hasNext()) {

                const board = iterator.next();
                console.log(board.getName());
            }
        };

        printBoardNames();
    };

    const init = function () {
    
        createMain();
        createBoards();
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

export default CreateGamePanel;