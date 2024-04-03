const CreateGamePanel = function ({ factory, gameState, createGame }) {
    
    let elements = {};
    const components = {};
    const id = 'create-game-panel';
    
    const props = {
        boardIds: [],
        boardSizes: [],
        boardIdsBySize: {},
        initBoardIdBySizeIndex: {},
        boardComponent: false,
    };
    let state;

    const changeBoardSizeIndex = function (direction) {

        console.log(`changeBoardSizeIndex(${direction})`);
        
    
        const boardSizeIndex = state.get('boardSizeIndex');
        
        let newIndex = boardSizeIndex + direction;

        if (newIndex < 0) {
            newIndex = props.boardSizes.length - 1;
        } else if (newIndex >= props.boardSizes.length) {
            newIndex = 0;
        }

        console.log(`newIndex: ${newIndex}`);

        state.update('boardSizeIndex', newIndex);
    };

    const changeBoardIdIndex = function (direction) {

        console.log(`changeBoardIdIndex(${direction})`);

        let idList, boardIdIndex;

        const hasBoardSize = state.get('hasBoardSize');
        const size = state.get('boardSize');
        
        const setIdListVariables = function () {
        
            if (hasBoardSize) {
                
                idList = props.boardIdsBySize[size];
                boardIdIndex = state.get('boardIdBySizeIndex')[size];
            } else {

                idList = props.boardIds;
                boardIdIndex = state.get('boardIdIndex');
            }
        }();

        const getNewIndex = function () {
        
            let newIndex = boardIdIndex + direction;
    
            if (newIndex < 0) {
                newIndex = idList.length - 1;
            } else if (newIndex >= idList.length) {
                newIndex = 0;
            }
    
            console.log(`newIndex: ${newIndex}`);

            return newIndex;
        };

        const newIndex = getNewIndex();

        const updateStates = function () {

            if (hasBoardSize) {

                const stateName = 'boardIdBySizeIndex';
                const newState = { ...state.get(stateName) };
                newState[size] = newIndex;

                state.update(stateName, newState);
            } else {

                state.update('boardIdIndex', newIndex);
            }
        }();
    };
    
    const createState = function () {

        state = factory.createState();

        const onBoardIdIndexUpdate = function (index) {
        
            console.log('index: ' + index);
            state.update('boardId', props.boardIds[index]);
        };

        const onBoardIdBySizeIndexUpdate = function (boardIdBySize) {
        
            console.log(boardIdBySize);
            const size = state.get('boardSize');
            const index = state.get('boardIdBySizeIndex')[size];

            state.update('boardId', props.boardIdsBySize[size][index]);
        };

        const onBoardIdUpdate = function (id) {
        
            console.log('id: ' + id);
            elements.boardOutput.textContent = id;

            if (props.boardComponent) {
                props.boardComponent.show(false);
            }
            props.boardComponent = components[id];
            props.boardComponent.show(true);

        };

        const onBoardSizeIndexUpdate = function (index) {
        
            state.update('boardSize', props.boardSizes[index]);
        };
        
        const onBoardSizeUpdate = function (size) {
        
            elements.sizeOutput.textContent = size;
            onBoardIdBySizeIndexUpdate(state.get('boardIdBySizeIndex'));
        };

        // Board Size

        state.add({
            name: 'hasBoardSize',
            value: true,
            // onChange: ,
        });

        state.add({
            name: 'boardSizeIndex',
            value: false,
            onChange: onBoardSizeIndexUpdate,
        });

        state.add({
            name: 'boardSize',
            value: false,
            onChange: onBoardSizeUpdate,
        });

        // Board Id

        state.add({
            name: 'hasBoardId',
            value: false,
            // onChange: ,
        });

        state.add({
            name: 'boardIdIndex',
            value: false,
            onChange: onBoardIdIndexUpdate,
        });

        state.add({
            name: 'boardIdBySizeIndex',
            value: props.initBoardIdBySizeIndex,
            onChange: onBoardIdBySizeIndexUpdate,
        });

        state.add({
            name: 'boardId',
            value: false,
            onChange: onBoardIdUpdate,
        });
    };

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
    
    const createElements = function () {

        elements = factory.createElements({
            main: {
                type: 'div',
                id: id,
                classList: 'panel ' + id,
            },
            // selectSize
            selectSizePanel: {
                type: 'div',
                classList: 'list-preview',
                parentKey: 'main',
            },
            prevSizeButton: {
                type: 'div',
                classList: 'button prev',
                onClick: () => changeBoardSizeIndex(-1),
                parentKey: 'selectSizePanel',
            },
            prevSizeSvg: {
                type: 'svg',
                name: 'move',
                parentKey: 'prevSizeButton',
            },
            sizeOutput: {
                type: 'div',
                classList: 'output-line',
                parentKey: 'selectSizePanel',
            },
            nextSizeButton: {
                type: 'div',
                classList: 'button next',
                onClick: () => changeBoardSizeIndex(1),
                parentKey: 'selectSizePanel',
            },
            nextSizeSvg: {
                type: 'svg',
                name: 'move',
                parentKey: 'nextSizeButton',
            },
            // selectBoard
            selectBoardPanel: {
                type: 'div',
                classList: 'list-preview',
                parentKey: 'main',
            },
            prevBoardButton: {
                type: 'div',
                classList: 'button prev',
                onClick: () => changeBoardIdIndex(-1),
                parentKey: 'selectBoardPanel',
            },
            prevBoardSvg: {
                type: 'svg',
                name: 'move',
                parentKey: 'prevBoardButton',
            },
            boardOutput: {
                type: 'div',
                classList: 'output-line',
                textContent: 'boardXXXX',
                parentKey: 'selectBoardPanel',
            },
            nextBoardButton: {
                type: 'div',
                classList: 'button next',
                onClick: () => changeBoardIdIndex(1),
                parentKey: 'selectBoardPanel',
            },
            nextBoardSvg: {
                type: 'svg',
                name: 'move',
                parentKey: 'nextBoardButton',
            },
            // board
            boardSection: {
                type: 'section',
                classList: 'board-section',
                parentKey: 'main',
            },
        });
    };

    const createBoards = function () {
    
        const iterator = gameState.getBoardDummyIterator();

        while (iterator.hasNext()) {

            const boardDummy = iterator.next();

            const id = boardDummy.getId();
            const size = boardDummy.getSize();
            const name = boardDummy.getName();

            const updateProps = function () {
            
                if (!props.boardSizes.includes(size)) {
                    
                    props.boardSizes.push(size);
                    props.boardIdsBySize[size] = [];
                    props.initBoardIdBySizeIndex[size] = 0;
                }

                props.boardIds.push(id);
                props.boardIdsBySize[size].push(id);

            }();

            components[id] = factory.createComponent({
                type: 'boardDummy',
                boardDummy,
                factory,
                parent: elements.boardSection,
            });
        };

    };

    const initStates = function () {
    
        state.update('boardSizeIndex', 0);
    };

    const init = function () {
    
        createElements();
        createBoards();
        createState();
        initStates();

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