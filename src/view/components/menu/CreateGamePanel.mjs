import BoardSelector from "./BoardSelector.mjs";

const CreateGamePanel = function ({ factory, gameState, createGame, toggleParent, hideParent }) {
    
    let elements = {};
    const components = {};
    const id = 'create-game-panel';
    
    const boardState = factory.createState();
    let boardSelector;

        
    const createNewGame = function () {

        const create = function () {
        
            const getBoardSpec = function () {

                let boardSpec = {};

                if (boardState.get('hasId')) {
                    boardSpec.id = boardState.get('id');
                } else if (boardState.get('hasSize')) {
                    boardSpec.sizes = [ boardState.get('size') ];
                }

                return boardSpec;
            };

            const getPawnsSpec = function () {

                const pawnsSpec1 = [
                    {type: 'lion', amount: 1}, 
                    {type: 'rooster', amount: 1}, 
                    {type: 'snake', amount: 1}
                ];
            
                const pawnsSpec = [pawnsSpec1, pawnsSpec1];
            
                return pawnsSpec;
            };

            createGame({ 
                boardSpec: getBoardSpec(), 
                pawnsSpec: getPawnsSpec() 
            });
        };

        create();
        hideParent();
    };

    const updateBoardState = function () {
    
        const boardSelectorState = boardSelector.getState();

        // console.log(boardSelectorState);

        for (const [key, value] of Object.entries(boardSelectorState)) {
            boardState.update(key, value);
        }
    };

    const changeBoardSize = function (direction) {
        
        boardSelector.changeSize(direction);
        updateBoardState();
    };

    const changeBoardId = function (direction) {
        
        boardSelector.changeId(direction);
        updateBoardState();
    };

    const toggleHasSize = function () {
        
        boardSelector.toggleHasSize();
        updateBoardState();
    };

    const toggleHasId = function () {
        
        boardSelector.toggleHasId();
        updateBoardState();
    };

    const onSizeChange = function (size) {

        components.boardPanel.updateSize(size);
        
        if (!size) {
            size = 'UNSELECTED';
        }
        components.boardSizePreview.setItemOutput(size);
    };

    const onIdChange = function (id) {

        components.boardPanel.updateId(id);
    
        if (!id) {
            id = 'RANDOM';
        }
        components.boardIdPreview.setItemOutput(id);
    };

    const onNameChange = function (name) {
    

        return ;
    };

    const onHasSizeChange = function (hasSize) {
    
        if (hasSize) {
            elements.hasSizeCheckbox.classList.add('active');
        } else {
            elements.hasSizeCheckbox.classList.remove('active');
        }
    };

    const onHasIdChange = function (hasId) {
    
        if (hasId) {
            elements.hasIdCheckbox.classList.add('active');
        } else {
            elements.hasIdCheckbox.classList.remove('active');
        }
    };

    const updateDom = function () {
    
        onSizeChange();
        onIdChange();
        onNameChange();
        onHasSizeChange();
        onHasIdChange();
    };

    const build = function () {

        const createElements = function () {

            elements = factory.createElements({
                main: {
                    type: 'div',
                    id: id,
                    classList: 'panel ' + id,
                },
                createGameButton: {
                    type: 'div',
                    classList: 'button send',
                    textContent: 'Create Game',
                    onClick: createNewGame,
                    parentKey: 'main',
                },
            });
        };
        
        const createComponents = function () {
            
            const createSizePanel = function () {

                const sizePanelElements = factory.createElements({
                    sizePanel: {
                        type: 'div',
                        classList: 'collection-panel size-panel',
                        parent: elements.main,
                    },
                    sizePanelTitle: {
                        type: 'p',
                        classList: 'title',
                        textContent: 'Board Size',
                        parentKey: 'sizePanel',
                    },
                    hasSizeCheckbox: {
                        type: 'div',
                        classList: 'checkbox button',
                        onClick: toggleHasSize,
                        parentKey: 'sizePanel',
                    },
                    hasSizeSvg: {
                        type: 'svg',
                        name: 'hold',
                        parentKey: 'hasSizeCheckbox',
                    },
                });

                elements = {...elements, ...sizePanelElements};
        
                components.boardSizePreview = factory.createComponent(
                    {
                        type: 'collectionPreview',
                        changeItem: changeBoardSize,
                        active: true,
                        factory,
                        parent: elements.sizePanel,
                    }
                );
            };
        
            const createIdPanel = function () {
        
                const idPanelElements = factory.createElements({
                    idPanel: {
                        type: 'div',
                        classList: 'collection-panel id-panel',
                        parent: elements.main,
                    },
                    idPanelTitle: {
                        type: 'p',
                        classList: 'title',
                        textContent: 'Board',
                        parentKey: 'idPanel',
                    },
                    hasIdCheckbox: {
                        type: 'div',
                        classList: 'checkbox button',
                        onClick: toggleHasId,
                        parentKey: 'idPanel',
                    },
                    hasIdSvg: {
                        type: 'svg',
                        name: 'hold',
                        parentKey: 'hasIdCheckbox',
                    },
                });

                elements = {...elements, ...idPanelElements};
            
                components.boardIdPreview = factory.createComponent(
                    {
                        type: 'collectionPreview',
                        changeItem: changeBoardId,
                        active: true,
                        factory,
                        parent: elements.idPanel,
                    }
                );
            };

            const createBoardPanel = function () {

                const iterator = gameState.getBoardDummyIterator();
        
                components.boardPanel = factory.createComponent(
                    {
                        type: 'boardDummiesPanel',
                        factory,
                        iterator,
                        parent: elements.main,
                    }
                );
            };

            createSizePanel();
            createIdPanel();
            createBoardPanel();
        };
        
        const createStates = function () {
            
            const createBoardState = function () {
        
                boardState.add({
                    name: 'size',
                    value: false,
                    onChange: onSizeChange,
                });
            
                boardState.add({
                    name: 'id',
                    value: false,
                    onChange: onIdChange,
                });
            
                boardState.add({
                    name: 'name',
                    value: false,
                    onChange: onNameChange,
                });
            
                boardState.add({
                    name: 'hasSize',
                    value: false,
                    onChange: onHasSizeChange,
                });
            
                boardState.add({
                    name: 'hasId',
                    value: false,
                    onChange: onHasIdChange,
                });
            }();

        };
                    
        const createBoardSelector = function () {
        
            boardSelector = BoardSelector( { factory, iterator: gameState.getBoardDummyIterator() } );
        };

        createBoardSelector();
        createElements();
        createComponents();
        createStates();
    };
    
    
    const onBoardIdUpdate = function (id) {

        // update id output
    
        console.log('id: ' + id);
        elements.boardOutput.textContent = id;

        // show board and hide old

        if (props.boardComponent) {
            props.boardComponent.show(false);
        }
        props.boardComponent = components[id];
        props.boardComponent.show(true);

    };

    const onBoardSizeUpdate = function (size) {

        // update size output
    
        elements.sizeOutput.textContent = size;
        onBoardIdBySizeIndexUpdate(state.get('boardIdBySizeIndex'));
    };

    const init = function () {
    
        build();
        updateDom();
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