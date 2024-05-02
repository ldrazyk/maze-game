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



    const build = function () {

        const nextBoardSize = function (direction=1) {
        
            boardSelector.changeSize(direction);
            updateBoardState();
        };
    
        const nextBoardId = function (direction=1) {
            
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

        const createBoardSelector = function () {
        
            boardSelector = BoardSelector( { factory, iterator: gameState.getBoardDummyIterator() } );
        };

        const createElements = function () {
        

            const addElements = function (spec) {
            
                const newElements = factory.createElements(spec);
    
                elements = {...elements, ...newElements};
            };
    
    
            const createMain = function () {
    
                addElements({
                    main: {
                        type: 'div',
                        id: id,
                        classList: 'panel ' + id,
                    },
                });
            }();
    
            const createBoardSection = function () {
            
                addElements({
                    boardSection: {
                        type: 'section',
                        classList: 'board-section',
                        parent: elements.main,
                    },
                    boardSectionTitle: {
                        type: 'p',
                        classList: 'title',
                        textContent: 'Board',
                        parentKey: 'boardSection',
                    },
                });
    
                const createSizePanel = function () {
    
                    components.sizePanel = factory.createComponent(
                        {
                            type: 'collectionComponent',
                            classList: 'size-panel',
                            id: 'size-panel',
                            title: 'Size',
                            nextItem: nextBoardSize,
                            toggleHasItem: toggleHasSize,
                            active: true,
                            factory,
                            parent: elements.boardSection,
                        }
                    );
                }();
            
                const createIdPanel = function () {
            
                    components.idPanel = factory.createComponent(
                        {
                            type: 'collectionComponent',
                            classList: 'id-panel',
                            id: 'id-panel',
                            title: 'Id',
                            nextItem: nextBoardId,
                            toggleHasItem: toggleHasId,
                            active: true,
                            factory,
                            parent: elements.boardSection,
                        }
                    );
                }();
    
                const createPreviewPanel = function () {
    
                    const iterator = gameState.getBoardDummyIterator();
            
                    components.boardPanel = factory.createComponent(
                        {
                            type: 'boardPreviewPanel',
                            factory,
                            iterator,
                            parent: elements.boardSection,
                        }
                    );
                }();
    
            }();
    
            const createPawnsSection = function () {
            
                addElements({
                    pawnsSection: {
                        type: 'section',
                        classList: 'pawns-section',
                        parent: elements.main,
                    },
                    pawnsSectionTitle: {
                        type: 'p',
                        classList: 'title',
                        textContent: 'Pawns',
                        parentKey: 'pawnsSection',
                    },
                });


                components.lionAmount = factory.createComponent({
                    type: 'pawnAmountPanel',
                    pawnType: 'lion',
                    factory,
                    parent: elements.pawnsSection,
                });

                components.roosterAmount = factory.createComponent({
                    type: 'pawnAmountPanel',
                    pawnType: 'rooster',
                    factory,
                    parent: elements.pawnsSection,
                });

                components.snakeAmount = factory.createComponent({
                    type: 'pawnAmountPanel',
                    pawnType: 'snake',
                    factory,
                    parent: elements.pawnsSection,
                });

            }();
    
            const createCommitSection = function () {
            
                addElements({
                    commitSection: {
                        type: 'section',
                        classList: 'commit-section',
                        parent: elements.main,
                    },
                    createGameButton: {
                        type: 'div',
                        classList: 'button send',
                        onClick: createNewGame,
                        parentKey: 'commitSection',
                    },
                    createGameButtonParagraph: {
                        type: 'p',
                        textContent: 'Create',
                        parentKey: 'createGameButton',
                    }
                });
            }();
        };

        
        const createStates = function () {


            const onSizeChange = function (size) {

                components.boardPanel.updateSize(size);
                
                if (!size) {
                    size = '?';
                }
                components.sizePanel.setItemOutput(size);
            };
        
            const onIdChange = function (id) {
        
                components.boardPanel.updateId(id);
            
                if (!id) {
                    id = '?';
                }
                components.idPanel.setItemOutput(id);
            };
        
            const onNameChange = function (name) {
            
        
                return ;
            };
        
            const onHasSizeChange = function (hasSize) {

                components.sizePanel.setActive(hasSize);
                
            };
        
            const onHasIdChange = function (hasId) {

                components.idPanel.setActive(hasId);
            
            };
            
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

            const initStateUpdate = function () {
    
                onSizeChange(false);
                onIdChange(false);
                onNameChange(false);
                onHasSizeChange(false);
                onHasIdChange(false);
            }();

        };
        

        createBoardSelector();
        createElements();
        createStates();
    };

    
    
    const init = function () {
    
        build();
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