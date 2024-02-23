import Board from "../game/Board.mjs";

const BoardRepository = function (boardSpec) {

    const boards = {};
    let hasAllBoards = false;
    
    const createBoard = function (id) {
    
        const spec = boardSpec[id];

        return Board({ id, ...spec});
    };

    const createAllBoards = function () {

        for (const id of Object.keys(boardSpec)) {

            boards[id] = createBoard(id);
        }
    };

    const checkHasAllBoards = function () {
    
        if (!hasAllBoards) {
            
            createAllBoards();
            hasAllBoards = true;
        }
    };

    const getBoard = function (id) {

        checkHasAllBoards();
    
        return boards[id];
    };
    
    return Object.freeze(
        {
            createBoard,
            getBoard,
        }
    );
};

export default BoardRepository;