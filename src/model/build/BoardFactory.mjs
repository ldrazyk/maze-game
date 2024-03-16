import Board from "../game/Board.mjs";
import shuffle from "../utils/shuffle.mjs";

const BoardFactory = function (boardsSpec) {

    const boards = {};
    const boardsSizes = {};
    let hasBoards = false;

    const boardsSpecById = {};
    
    
    const createBoards = function () {
        
        const createBoard = function ({ id, size, spec}) {
        
            const board = Board(spec);

            boards[id] = board;

            if (!boardsSizes[size]) {
                boardsSizes[size] = [];
            }
            boardsSizes[size].push(board);
        };

        for (const [size, sizeBoardsSpec] of Object.entries(boardsSpec)) {
            for (const [id, spec] of Object.entries(sizeBoardsSpec)) {

                boardsSpecById[id] = spec;
                createBoard({ id, size, spec});
            }
        }
    };

    const checkHasBoards = function () {
    
        if (!hasBoards) {
            
            createBoards();
            hasBoards = true;
        }
    };

    const getBoard = function ({ id=false, sizes=false }) {

        const getRandomBoard = function (sizes) {
        
            let boardsArray;

            if (sizes) {

                boardsArray = [];
                sizes.forEach(size => {
                    boardsArray = [...boardsArray, ...boardsSizes[size]];
                });

            } else {

                boardsArray = Object.values(boards);
            }

            shuffle(boardsArray);

            return boardsArray[0];
        };

        checkHasBoards();

        if (id) {
            return boards[id];
        } else {
            return getRandomBoard(sizes);
        }
    };

    const createBoard = function ({ id=false, sizes=false }) {

        const getSpec = function () {
        
            let spec;

            if (id) {
                spec = boardsSpecById[id];

            } else {

                let specList = [];

                if (sizes) {
    
                    sizes.forEach(size => {
                        specList = [...specList, ...Object.values(boardsSpec[size])]
                    });
                } else {

                    specList = Object.values(boardsSpecById);
                }

                shuffle(specList);
                spec = specList[0];
            }
                
            return spec;
        };
    
        return Board(getSpec());
    };
    
    return Object.freeze(
        {
            getBoard,
            createBoard,
        }
    );
};

export default BoardFactory;