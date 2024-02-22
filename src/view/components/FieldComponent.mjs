import updateClass from "../utils/updateClass.mjs";
import createElement from "../utils/createElement.mjs";

const FieldComponent = function({ field, onClick, getSvgCopy }) {
    
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

    let mainElement;
    const containers = {
        highlight: false,
        flag: false,
        pawn: false,
    };

    const createElements = function () {

        const createMain = function() {

            mainElement = createElement(
                {
                    type: 'div',
                    classList: 'field ' + props.type,
                    id: props.id,
                    datasets: { row: props.row, column: props.column },
                    order: props.column,
            });
        };
    
        const createHighlight = function() {

            containers.highlight = createElement(
                {
                    type: 'div',
                    classList: 'container highlight',
                    parent: mainElement
                }
            );

            ['active', 'reach', 'hover'].forEach(name => {
                containers.highlight.appendChild(getSvgCopy(name));
            });
        };
    
        const createFlag = function() {

            state.exitNumber = field.getExitNumber();

            containers.flag = createElement(
                {
                    type: 'div',
                    classList: 'container flag ' + 'player-' + state.exitNumber,
                    parent: mainElement
                }
            );

            containers.flag.appendChild(getSvgCopy('flag'));
        };
    
        const createPawn = function() {
            
            containers.pawn = createElement(
                {
                    type: 'div',
                    classList: 'container pawn',
                    parent: mainElement
                }
            );

            ['lion', 'rooster', 'snake'].forEach(name => {
                containers.pawn.appendChild(getSvgCopy(name));
            });
        };

        const addEvents = function() {

            mainElement.addEventListener('click', () => { onClick(props.id) });
        };


        createMain();
        if (props.type != 'wall') {
            createHighlight();
            if (props.type == 'exit') createFlag();
            createPawn();
            addEvents(); 
        }
    };

    const init = function() {
        
        createElements();
    }();

    const updateFlag = function () {

        if (state.exitNumber && state.pawn.pawn) {

            containers.flag.classList.add('hidden');
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
        
        const updateContainer = function () {
        
            const getNewClassList = function () {
            
                let newClassList = 'container pawn';
                if (state.pawn.pawn) {
                    newClassList += ' ' + state.pawn.type + ' player-' + state.pawn.playerNumber;
                }
                return newClassList;
            };

            containers.pawn.classList = getNewClassList();
        };

        const updateDom = function () {
        
            updateContainer();
            // changeSvg();
            updateFlag();
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

        const updateMain = function () {
        
            const getNewClassList = function () {
            
                let newClassList = 'field ' + props.type;
                if (state.pawnMode) {
                    newClassList += ' ' + state.pawnMode;
                } else if (state.reach.direction) {
                    newClassList += ' in-reach';
                }
                return newClassList;
            };

            mainElement.classList = getNewClassList();
        };

        const updateContainer = function () {
        
            const getNewClassList = function () {
            
                let newClassList = 'container highlight';
                if (state.pawnMode) {
                    newClassList += ' player-' + state.pawn.playerNumber;
                } else if (state.reach.direction) {
                    newClassList += ' player-' + state.reach.playerNumber + ' ' + state.reach.direction;
                }
                return newClassList;
            };

            containers.highlight.classList = getNewClassList();
        };

        const updateDom = function () {
        
            updateMain();
            updateContainer();
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
    
        return mainElement;
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