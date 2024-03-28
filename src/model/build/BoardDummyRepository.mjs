import ArrayIterator from "../utils/ArrayIterator.mjs";

const BoardDummyRepository = function () {
    
    let boards;
    let mediator;

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };

    const createBoards = function () {
    
        boards = {};

        const boardsArray = mediator.createAllBoardDummies();

        boardsArray.forEach(board => {
            
            boards[board.getId()] = board;
        });
    };

    const getBoard = function (id) {
    
        return boards[id];
    };

    const getAllIds = function () {
    
        return Object.keys(boards);
    };

    const getIterator = function () {
    
        if (!boards) {
            createBoards();
        }
        return ArrayIterator(Object.values(boards));
    };

    
    return Object.freeze(
        {
            setMediator,
            // getBoard,
            // getAllIds,
            getIterator,
        }
    );
};

export default BoardDummyRepository;