const EndGamePanel = function ({ factory, gameState, endGame, toggleParent }) {
    
    let elements;

    const props = {
        id: 'end-game-panel',
        player1: gameState.getPlayer(1),
        player2: gameState.getPlayer(2),
    };

    let state;

    const executeEndGame = function (spec) {
    
        endGame(spec);
        toggleParent();
    };

    const createElements = function () {

        elements = factory.createElements(
            {
                main: {
                    type: 'div',
                    id: props.id,
                    classList: 'panel ' + props.id,
                },
                drawButton: {
                    type: 'button',
                    classList: 'button',
                    textContent: 'Draw',
                    onClick: () => executeEndGame({ type: 'draw' }),
                    parentKey: 'main',
                },
                player2WinsButton: {
                    type: 'button',
                    classList: 'button',
                    textContent: 'Player 2 wins',
                    onClick: () => executeEndGame({ type: 'give_up', winnerNumber: 2 }),
                    parentKey: 'main',
                },
                player1WinsButton: {
                    type: 'button',
                    classList: 'button',
                    textContent: 'Player 1 wins',
                    onClick: () => executeEndGame({ type: 'give_up', winnerNumber: 1 }),
                    parentKey: 'main',
                },
            }
        );
    };

    const createState = function () {

        const onPlayerNameChange = function (playerNumber, value) {
        
            elements['player' + playerNumber + 'WinsButton'].textContent = value + ' wins';
        };
    
        state = factory.createState();

        state.add({
            name: 'player1Name',
            value: '',
            onChange: (value) => onPlayerNameChange(1, value),
        });

        state.add({
            name: 'player2Name',
            value: '',
            onChange: (value) => onPlayerNameChange(2, value),
        });


    };

    const updatePlayerNameStates = function () {

        const getPlayerName = function (playerNumber) {
        
            return props['player' + playerNumber].getName();
        };

        [1, 2].forEach(playerNumber => {

            state.update('player' + playerNumber + 'Name', getPlayerName(playerNumber));
        });
    };

    const init = function () {
    
        createElements();
        createState();
        updatePlayerNameStates();
    }();

    const update = function ({ code, gameState }) {

        if (code == 'changePlayerName') {

            updatePlayerNameStates();
        }
    };

    const getId = function () {
        
        return props.id;
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

export default EndGamePanel;