import createElement from "../utils/createElement.mjs";

const PlayerPanel = function ({ playerNumber, gameState }) {
    
    let mainElement;
    const elements = {};
    let nameElement, scoreElement, turnElement, movesElement, holdsElement;
    let player;
    const props = {};

    let mediator;

    const setPlayer = function () {
    
        player = gameState.getPlayer(playerNumber);
    };

    const setProps = function () {
    
        props.id = 'player_panel_' + playerNumber;
        props.number = playerNumber;
        props.name = player.getName();
        props.color = player.getColor();
        props.score = player.getScore();
        props.active = false;
        props.turn = 0;
    };

    const createElements = function () {
    
        const createMain = function () {
        
            mainElement = createElement(
                {
                    type: 'div',
                    classList: 'player-panel ' + props.color,
                    id: props.id,
                    // textContent: player.toString()
                }
            );
        };

        const createName = function () {
        
            elements.name = createElement(
                {
                    type: 'input',
                    classList: 'player-name',
                    value: props.name,
                    parent: mainElement,
                }
            );
        };
        
        const createScore = function () {
        
            elements.score = createElement(
                {
                    type: 'div',
                    classList: 'score',
                    textContent: 'Score: ' + props.score,
                    parent: mainElement,
                }
            );
        };

        const createTurnSection = function () {
        
            elements.turnSection = createElement(
                {
                    type: 'div',
                    classList: 'turn-section',
                    parent: mainElement,
                }
            );
        };

        const createTurn = function () {
        
            elements.turn = createElement(
                {
                    type: 'div',
                    classList: 'turn',
                    textContent: 'Turn: ',
                    parent: elements.turnSection,
                }
            );
        };

        const createMoves = function () {
        
            elements.moves = createElement(
                {
                    type: 'div',
                    classList: 'moves',
                    textContent: 'Moves: ',
                    parent: elements.turnSection,
                }
            );
        };

        const createHolds = function () {
        
            elements.holds = createElement(
                {
                    type: 'div',
                    classList: 'holds',
                    textContent: 'Holds left: ',
                    parent: elements.turnSection,
                }
            );
        };


        createMain();
        createName();
        createScore();
        createTurnSection();
        createTurn();
        createMoves();
        createHolds();
    };

    const init = function () {
    
        setPlayer();
        setProps();
        createElements();
    }();

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };

    const update = function ({ code, object }) {

        const getActive = function () {
        
            const active = (props.number == object.getActiveNumber());
            return active;
        };

        const getMoves = function () {

            return [
                object.getMoves(),
                object.getMovesAmount()
            ];
        };

        const getHolds = function () {

            return object.getMaxHolds() - object.getHolds();
        };

        const updateActive = function () {
        
            if (props.active) {

                mainElement.classList.add('active') ;
            } else {
                
                mainElement.classList.remove('active') ;
            }
        };

        const updateTurnElement = function () {
        
            elements.turn.textContent = 'Turn: ' + props.turn;
        };

        const updateScoreElement = function () {
        
            elements.score.textContent = 'Score: ' + props.score;
        };

        const updateMovesElement = function () {
        
            elements.moves.textContent = 'Moves: ' + props.moves[0] + '/' + props.moves[1];
        };

        const updateHoldsElement = function () {
        
            elements.holds.textContent = 'Holds left: ' + props.holds;
        };

        const updateParamsTable = {
            active: {
                getter: getActive,
                updater: updateActive
            },
            turn: {
                getter: object.getTurnNumber,
                updater: updateTurnElement
            },
            score: {
                getter: player.getScore,
                updater: updateScoreElement
            },
            moves: {
                getter: getMoves,
                updater: updateMovesElement
            },
            holds: {
                getter: getHolds,
                updater: updateHoldsElement
            },


        }
    
        const updateProp = function (propName) {
        
            const dict = updateParamsTable[propName];
            const newProp = dict.getter();

            if (props[propName] != newProp) {
                props[propName] = newProp;
                dict.updater();
            }
        };


        if (props.turn == 0) {

            updateProp('turn');
        }
        
        if (props.turn > 0) {

            updateProp('active');
        }

        if (props.active) {
            
            const propNames = ['turn', 'score', 'moves', 'holds'];

            propNames.forEach(name => {
                updateProp(name);
            });
        }

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