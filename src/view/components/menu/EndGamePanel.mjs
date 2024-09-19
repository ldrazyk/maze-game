const EndGamePanel = function ({ factory, gameState, endGame, toggleParent, toggleNext }) {
    
    const id = 'end-game-panel';
    let elements;
    let state;

    const createElements = function () {

        const executeEndGame = function (spec) {
    
            endGame(spec);
            toggleParent();
            toggleNext();
        };

        elements = factory.createElements(
            {
                main: {
                    type: 'div',
                    id: id,
                    classList: 'panel ' + id,
                },
                drawButton: {
                    type: 'button',
                    classList: 'button',
                    textContent: 'Draw',
                    onClick: () => executeEndGame({ type: 'draw' }),
                    parentKey: 'main',
                },
                player1WinsButton: {
                    type: 'button',
                    classList: 'button',
                    textContent: 'Player 1 wins',
                    onClick: () => executeEndGame({ type: 'give_up', winnerNumber: 1 }),
                    parentKey: 'main',
                },
                player2WinsButton: {
                    type: 'button',
                    classList: 'button',
                    textContent: 'Player 2 wins',
                    onClick: () => executeEndGame({ type: 'give_up', winnerNumber: 2 }),
                    parentKey: 'main',
                },
            }
        );
    };

    const createState = function () {

        const onPlayerNameChange = function (playerNumber, value) {
        
            const changeNameInPlayerWinsButton = function () {
            
                const button = elements['player' + playerNumber + 'WinsButton'];
                const newText = value + ' wins';

                button.textContent = newText;
            };

            changeNameInPlayerWinsButton();
        };
    
        state = factory.createState();

        [1, 2].forEach(number => {

            state.add({
                name: 'player' + number + 'Name',
                value: '',
                onChange: (value) => onPlayerNameChange(number, value),
            });
        });
    };

    const updatePlayerNameStates = function (gameState) {

        [1, 2].forEach(number => {

            const name = 'player' + number + 'Name';
            const value = gameState.getPlayerName(number);

            state.update(name, value);
        });
    };

    const init = function () {
    
        createElements();
        createState();
        updatePlayerNameStates(gameState);
    }();

    const update = function ({ code, gameState }) {

        if (code == 'changePlayerName') {

            updatePlayerNameStates(gameState);
        }
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

export default EndGamePanel;