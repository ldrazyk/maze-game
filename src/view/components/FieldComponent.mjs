const FieldComponent = function({ field, onClick, factory }) {
    
    const props = {
        id: field.getId(),
        type: field.getType(),
        row: field.getX(),
        column: field.getY(),
    };

    const state = {
        pawn: {
            pawn: false,
            type: false,
            playerNumber: false,
        },
        pawnMode: false,
        reach: {
            direction: false,
            playerNumber: false
        },
        exitNumber: false
    };

    let elements;


    const createElements = function () {

        const getElementsSpec = function () {

            let elementsSpec = {};

            const addMain = function () {
            
                elementsSpec.main = {
                    type: 'div',
                    classList: 'field ' + props.type,
                    id: props.id,
                    datasets: { row: props.row, column: props.column },
                    order: props.column,
                };
            };

            const addOnClick = function () {

                elementsSpec.main.onClick = () => { onClick(props.id) };
            };

            const addPathElements = function () {
            
                const pathElementsSpec = {
                    highlight: {
                        type: 'div',
                        classList: 'container highlight',
                        parentKey: 'main'
                    },
                    pawn: {
                        type: 'div',
                        classList: 'container pawn',
                        parentKey: 'main'
                    },
                    svgActive: {
                        type: 'svg',
                        name: 'active',
                        parentKey: 'highlight'
                    },
                    svgReach: {
                        type: 'svg',
                        name: 'reach',
                        parentKey: 'highlight'
                    },
                    svgHover: {
                        type: 'svg',
                        name: 'hover',
                        parentKey: 'highlight'
                    },
                    svgLion: {
                        type: 'svg',
                        name: 'lion',
                        parentKey: 'pawn'
                    },
                    svgRooster: {
                        type: 'svg',
                        name: 'rooster',
                        parentKey: 'pawn'
                    },
                    svgSnake: {
                        type: 'svg',
                        name: 'snake',
                        parentKey: 'pawn'
                    },
                };
                
                elementsSpec = {...elementsSpec, ...pathElementsSpec};
            };

            const addFlagElements = function () {
            
                const flagElementsSpec = {
                    flag: {
                        type: 'div',
                        classList: 'container flag ' + 'player-' + state.exitNumber,
                        parentKey: 'main'
                    },
                    svgFlag: {
                        type: 'svg',
                        name: 'flag',
                        parentKey: 'flag'
                    }
                }

                elementsSpec = {...elementsSpec, ...flagElementsSpec};
            };


            addMain();
            if (props.type != 'wall') {
                addOnClick();
                addPathElements();
                if (props.type == 'exit') {
                    state.exitNumber = field.getExitNumber();
                    addFlagElements();
                }
            }
        
            return elementsSpec;
        };

        elements = factory.createElements(getElementsSpec());
    };

    const init = function() {
        
        createElements();
    }();

    const updateFlagElement = function () {

        if (state.exitNumber && state.pawn.pawn) {

            elements.flag.classList.add('hidden');
        }
    };

    const updatePawn = function () {

        const updatePawnState = function () {
        
            const newPawn = field.getPawn();

            if (newPawn != state.pawn.pawn) {

                state.pawn.pawn = newPawn;

                if (newPawn) {
                    state.pawn.type = newPawn.getType();
                    state.pawn.playerNumber = newPawn.getPlayerNumber();
                } else {
                    state.pawn.type = false;
                    state.pawn.playerNumber = false;
                }

                return true;
            }
        };
        
        const updatePawnElement = function () {
        
            const getNewClassList = function () {
            
                let newClassList = 'container pawn';
                if (state.pawn.pawn) {
                    newClassList += ' ' + state.pawn.type + ' player-' + state.pawn.playerNumber;
                }
                return newClassList;
            };

            elements.pawn.classList = getNewClassList();
        };

        const updateDom = function () {
        
            updatePawnElement();
            updateFlagElement();
        };

        if ( updatePawnState() ) updateDom();
    };

    const updateHighlight = function (gameState) {

        const updatePawnModeState = function () {
        
            const getNewMode = function () {
            
                let newMode = false;
                
                const pawn = state.pawn.pawn;

                if (pawn) {
    
                    if (gameState.getSelected() === pawn) {
                        newMode = 'selected';
                    } else if (pawn.isActive()) {
                        newMode = 'active';
                    }
                }

                return newMode;
            };

            const newMode = getNewMode();

            if (state.pawnMode != newMode) {
                state.pawnMode = newMode;
                return true;
            }
        };
        
        const updateReachState = function () {
        
            const getNewReach = function () {

                const newReach = {
                    direction: false,
                    playerNumber: false
                };
            
                if (gameState.getSelected()) {

                    newReach.direction = gameState.isInReach(field);

                    if (newReach.direction) {

                        newReach.playerNumber = gameState.getActiveNumber();
                    }
                }
                return newReach;
            };

            const newReach = getNewReach();

            if (state.reach != newReach) {
                state.reach = newReach;
                return true;
            }
        };

        const updateState = function () {
        
            let changed = false;
    
            if (updatePawnModeState()) {
                changed = true;
            }
            if (updateReachState()) {
                changed = true;
            }

            return changed;
        };

        const updateMainElement = function () {
        
            const getNewClassList = function () {
            
                let newClassList = 'field ' + props.type;
                if (state.pawnMode) {
                    newClassList += ' ' + state.pawnMode;
                } else if (state.reach.direction) {
                    newClassList += ' in-reach';
                }
                return newClassList;
            };

            elements.main.classList = getNewClassList();
        };

        const updateHighlightElement = function () {
        
            const getNewClassList = function () {
            
                let newClassList = 'container highlight';
                if (state.pawnMode) {
                    newClassList += ' player-' + state.pawn.playerNumber;
                } else if (state.reach.direction) {
                    newClassList += ' player-' + state.reach.playerNumber + ' ' + state.reach.direction;
                }
                return newClassList;
            };

            elements.highlight.classList = getNewClassList();
        };

        const updateDom = function () {
        
            updateMainElement();
            updateHighlightElement();
        };
    
        if ( updateState() ) updateDom();
        
    };

    const getRow = function () {
        return props.row;
    };

    const getColumn = function () {
        return props.column;
    };

    const getId = function () {
        return props.id;
    };

    const getType = function () {
        return props.type;
    };

    const getMain = function () {
    
        return elements.main;
    };

    return Object.freeze(
        {
            updatePawn,
            updateHighlight,
            getRow,
            getColumn,
            getId,
            getType,
            getMain,
        }
    );
};

export default FieldComponent;