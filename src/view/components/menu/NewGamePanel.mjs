const NewGamePanel = function ({ factory, gameState, createGame }) {
    
    let elements;

    const props = {
        id: 'new-game-panel',
        player1: gameState.getPlayer(1),
        player2: gameState.getPlayer(2),
    };

    let state;

    let toggle = () => {console.log('toggle')};

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
                    onClick: () => newGame(),
                    parentKey: 'main',
                },
                player2WinsButton: {
                    type: 'button',
                    classList: 'button',
                    textContent: 'Player 1 Wins',
                    onClick: () => newGame(),
                    parentKey: 'main',
                },
                player1WinsButton: {
                    type: 'button',
                    classList: 'button',
                    textContent: 'Player 1 Wins',
                    onClick: () => newGame(),
                    parentKey: 'main',
                },
            }
        );
    };

    const createState = function () {

        const onPlayerNameChange = function (playerNumber, value) {
        
            elements['player' + playerNumber + 'WinsButton'].textContent = value + ' Wins';
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

    const setToggle = function (toggleParent) {
    
        toggle = toggleParent;
    };

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
            setToggle,
            update,
            getId,
            getMain,
        }
    );
};

export default NewGamePanel;