const BoardDummiesPanel = function ({ factory, iterator }) {

    let elements = {};
    let components = {};
    const id = 'board-panel';

    let boardId = false;
    let boardSize = false;
    let visibleBoardId = false;

    const createElements = function () {

        elements = factory.createElements({
            main: {
                type: 'div',
                id: id,
                classList: 'panel ' + id,
                textContent: 'Board Dummies Panel',
            },
        });
    };

    const createBoardComponents = function () {

        const createGrid = function (size) {
        
            if (!components[size]) {

                components[size] = factory.createComponent({
                    type: 'gridDummy',
                    size,
                    factory,
                    parent: elements.main
                });
            }
        };
        
        while (iterator.hasNext()) {

            const boardDummy = iterator.next();

            const id = boardDummy.getId();
            const size = boardDummy.getSize();

            console.log(id);
            console.log(size);

            components[id] = factory.createComponent({
                type: 'boardDummy',
                boardDummy,
                factory,
                parent: elements.main,
            });

            createGrid(size);
        };
    };

    const init = function () {
    
        createElements();
        createBoardComponents();
    }();

    const updateVisibleBoard = function (id) {

        // console.log('old id: ' + visibleBoardId);
        // console.log('new id: ' + id);

        if (visibleBoardId) {
            components[visibleBoardId].show(false);
        }

        if (id) {
            components[id].show(true);
        }

        visibleBoardId = id;
    };

    const updateId = function (id) {
    
        boardId = id;

        if (id) {
            updateVisibleBoard(id);
        } else {
            updateVisibleBoard(boardSize);
        }
    };

    const updateSize = function (size) {
    
        boardSize = size;

        if (!boardId) {
            updateVisibleBoard(boardSize);
        }
    };
    
    const getMain = function () {
        
        return elements.main;
    };
    
    return Object.freeze(
        {
            updateId,
            updateSize,
            getMain,
        }
    );
};

export default BoardDummiesPanel;