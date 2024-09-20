const ChangeColorsComponent = function ({ playerNumber, gameState, factory, changeColor }) {
    
    const id = 'changeColors' + playerNumber;
    let elements;
    let state;
    let mediator;

    const createElements = function () {

        let spec = {
            main: {
                type: 'div',
                classList: 'change-colors player-' + playerNumber,
            },
            playerName: {
                type: 'p',
                classList: 'player-name',
                textContent: '',
                parentKey: 'main',
            },
            // selecteColor
            selecteColorsPanel: {
                type: 'div',
                classList: 'list-preview',
                parentKey: 'main',
            },
            prevColorButton: {
                type: 'div',
                classList: 'button prev',
                onClick: () => changeColor({direction: -1, number: playerNumber}),
                parentKey: 'selecteColorsPanel',
            },
            prevColorSvg: {
                type: 'svg',
                name: 'move',
                parentKey: 'prevColorButton',
            },
            playerIcon: {
                type: 'div',
                classList: 'player-icon',
                parentKey: 'selecteColorsPanel',
            },
            svgPlayer: {
                type: 'svg',
                name: 'rooster',
                parentKey: 'playerIcon',
            },
            nextColorButton: {
                type: 'div',
                classList: 'button next',
                onClick: () => changeColor({direction: 1, number: playerNumber}),
                parentKey: 'selecteColorsPanel',
            },
            nextColorSvg: {
                type: 'svg',
                name: 'move',
                parentKey: 'nextColorButton',
            },
        };

        elements = factory.createElements(spec);
    };

    const createState = function () {

        const onPlayerNameChange = function (value) {
        
            elements.playerName.textContent = value;
        };

        state = factory.createState();
    
        state.add({
            name: 'playerName',
            value: '',
            onChange: onPlayerNameChange,
        });
    };

    const updatePlayerNameState = function (gameState) {

        state.update('playerName', gameState.getPlayerName(playerNumber));
    };

    const init = function () {
    
        createElements();
        createState();
        updatePlayerNameState(gameState);
    }();

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };

    const update = function ({ code, gameState }) {

        if (code == 'changePlayerName') {

            updatePlayerNameState(gameState);
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
            setMediator,
            update,
            getId,
            getMain,
        }
    );
};

export default ChangeColorsComponent;