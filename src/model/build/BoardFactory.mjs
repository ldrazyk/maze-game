import Board from "../game/Board.mjs";
import BoardDummy from "./BoardDummy.mjs";
import shuffle from "../utils/shuffle.mjs";

const BoardFactory = function (boardsSpec) {

    const boardsSpecById = {};
    
    const setBoardsSpecById = function () {
        
        for (const sizeBoardsSpec of Object.values(boardsSpec)) {
            for (const [id, spec] of Object.entries(sizeBoardsSpec)) {

                boardsSpecById[id] = spec;
            }
        }
    };

    const init = function () {
    
        setBoardsSpecById();
    }();

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

    const createAllBoardDummies = function () {

        const allDummies = [];

        for (const [size, sizeBoardsSpec] of Object.entries(boardsSpec)) {
            for (const [id, spec] of Object.entries(sizeBoardsSpec)) {

                allDummies.push(BoardDummy({ ...spec, id, size }))
            }
        }
    
        return allDummies;
    };
    
    return Object.freeze(
        {
            createBoard,
            createAllBoardDummies,
        }
    );
};

export default BoardFactory;