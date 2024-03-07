import createElement from "../utils/createElement.mjs";

const PlayerPanel = function ({ playerNumber, order=false, gameState }) {
    
    let mainElement;
    const elements = {
        name: false,
        score: false,
        turnSection: false,
        turn: false,
        moves: false,
        holds: false,
    };

    const props = {};
    const state = {};

    let mediator;

    const updateState = function (name, value) {
        
        if (state[name] != value) {
            state[name] = value;
            return true;
        }    
    };

    const initProps = function () {
    
        props.id = 'player-panel-' + playerNumber;
        props.player = gameState.getPlayer(playerNumber);
    };

    const initState = function () {
    
        state.name = props.player.getName();
        state.active = false;
        state.score = props.player.getScore();
        state.turn = 0;
        state.moves = [0, 0];
        state.holds = 0;
    };

    const createElements = function () {
    
        const createMain = function () {
        
            mainElement = createElement(
                {
                    type: 'div',
                    classList: 'panel player-panel player-' + playerNumber,
                    id: props.id,
                    order: order,
                }
            );
        };

        const createName = function () {
        
            elements.name = createElement(
                {
                    type: 'input',
                    classList: 'player-name',
                    value: state.name,
                    size: 1,
                    parent: mainElement,
                }
            );

            const updateName = function () {

                const updateNameState = function () {
                
                    const getNameFromInput = function () {
                    
                        return elements.name.value;
                    };

                    return updateState('name', getNameFromInput());
                };


                const updateModelName = function () {
                
                    mediator.setPlayerName({ playerNumber: playerNumber, name: state.name }) ;
                };

                if (updateNameState()) updateModelName();
            };

            elements.name.addEventListener('blur', updateName);

        };

        const createScore = function () {
        
            elements.score = createElement(
                {
                    type: 'p',
                    classList: 'score',
                    textContent: 'Score: ' + state.score,
                    parent: mainElement,
                }
            );
        };

        const createTurn = function () {
        
            elements.turn = createElement(
                {
                    type: 'p',
                    classList: 'turn when-active',
                    textContent: 'Turn: ',
                    parent: mainElement,
                }
            );
        };

        const createMoves = function () {
        
            elements.moves = createElement(
                {
                    type: 'p',
                    classList: 'moves when-active',
                    textContent: 'Moves: ',
                    parent: mainElement,
                }
            );
        };

        const createHolds = function () {
        
            elements.holds = createElement(
                {
                    type: 'p',
                    classList: 'holds when-active',
                    textContent: 'Holds: ',
                    parent: mainElement,
                }
            );
        };

        createMain();
        createName();
        createScore();
        createTurn();
        createMoves();
        createHolds();
    };

    const init = function () {
    
        initProps();
        initState();
        createElements();
    }();

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };

    const update = function ({ code, object }) {

        const updateActive = function () {
        
            const updateActiveState = function () {
            
                const getActive = function () {
                
                    return playerNumber == object.getActiveNumber();
                };
                
                return updateState('active', getActive());
            };
    
            const updateActiveDom = function () {
            
                if (state.active) {
    
                    mainElement.classList.add('active') ;
                } else {
                    
                    mainElement.classList.remove('active') ;
                }
            };

            if ( updateActiveState() ) updateActiveDom();
        };

        const updateScore = function () {
        
            const updateScoreState = function () {
            
                const getScore = function () {
                
                    return props.player.getScore();
                };
                
                return updateState('score', getScore());
            };
    
            const updateScoreDom = function () {
            
                elements.score.textContent = 'Score: ' + state.score;
            };

            if ( updateScoreState() ) updateScoreDom();
        };

        const updateTurn = function () {
        
            const updateTurnState = function () {
            
                const getTurn = function () {
                
                    return object.getTurnNumber();
                };
                
                return updateState('turn', getTurn());
            };
    
            const updateTurnDom = function () {
            
                elements.turn.textContent = 'Turn: ' + state.turn;
            };

            if ( updateTurnState() ) updateTurnDom();
        };
        
        const updateMoves = function () {
        
            const updateMovesState = function () {
            
                const getMoves = function () {
        
                    return [
                        object.getMoves(),
                        object.getMovesAmount()
                    ];
                };
    
                return updateState('moves', getMoves());
    
            };
    
            const updateMovesDom = function () {
            
                elements.moves.textContent = 'Moves: ' + state.moves[0] + '/' + state.moves[1];
            };

            if (updateMovesState()) updateMovesDom();
        };

        const updateHolds = function () {
        
            const updateHoldsState = function () {
            
                const getHolds = function () {
        
                    return object.getMaxHolds() - object.getHolds();
                };
    
                return updateState('holds', getHolds());
            };
    
            const updateHoldsDom = function () {
            
                elements.holds.textContent = 'Holds: ' + state.holds;
            };

            if ( updateHoldsState() ) updateHoldsDom();
        };

        const exec = function () {
        
            if (state.turn == 0) {
    
                updateTurn();
            }
            
            if (state.turn > 0) {
    
                updateActive();
            }
    
            if (state.active) {
                
                updateTurn();
                updateMoves();
                updateHolds();
            }
    
            if (code == 'endGame') {
    
                updateScore();
            }
        };

        exec();
    };

    const getId = function () {
        
        return props.id;
    };
    
    const getMain = function () {
        
        return mainElement;
    };

    
    return Object.freeze(
        {
            setMediator,
            update,
            getId,
            getMain,
        }
    );
};

export default PlayerPanel;