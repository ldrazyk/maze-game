const BoardPreviewPanel = function ({ factory, iterator }) {

    let elements = {};
    let components = {};
    const id = 'board-preview-panel';

    let boardId = false;
    let boardSize = false;
    let visibleBoardId = false;

    const createElements = function () {

        elements = factory.createElements({
            main: {
                type: 'div',
                id: id,
                classList: id,
            },
            wrapper: {
                type: 'div',
                classList: 'wrapper',
                parentKey: 'main',
            },
            emptyBoard: {
                type: 'div',
                classList: 'board-dummy empty',
                parentKey: 'wrapper',
            }
        });
    };

    const createBoardComponents = function () {

        const createEmptyGrid = function (size) {
        
            if (!components[size]) {

                components[size] = factory.createComponent({
                    type: 'gridDummy',
                    size,
                    factory,
                    parent: elements.wrapper,
                });
            }
        };
        
        while (iterator.hasNext()) {

            const boardDummy = iterator.next();

            const id = boardDummy.getId();
            const size = boardDummy.getSize();

            components[id] = factory.createComponent({
                type: 'boardDummy',
                boardDummy,
                factory,
                parent: elements.wrapper,
            });

            createEmptyGrid(size);
        };
    };

    const init = function () {
    
        createElements();
        createBoardComponents();
    }();

    const updateVisibleBoard = function (id) {

        // console.log('old id: ' + visibleBoardId);
        // console.log('new id: ' + id);

        const hideOld = function () {
        
            if (visibleBoardId) {
                components[visibleBoardId].show(false);
            }
        };

        const showNew = function () {
        
            if (id) {
                components[id].show(true);
            }
        };

        hideOld();
        showNew();
        visibleBoardId = id;
    };

    const setId = function (id) {
    
        boardId = id;

        if (id) {
            updateVisibleBoard(id);
        } else {
            updateVisibleBoard(boardSize);
        }
    };

    const setSize = function (size) {
    
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
            setId,
            setSize,
            getMain,
        }
    );
};

export default BoardPreviewPanel;