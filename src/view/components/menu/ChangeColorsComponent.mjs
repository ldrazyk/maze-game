const ChangeColorsComponent = function ({ playerNumber, gameState, factory, changeColor }) {
    
    const id = 'changeColors' + playerNumber;
    let elements;
    const props = {
        id: 'changeColors' + playerNumber,
        player: gameState.getPlayer(playerNumber),
    };
    const colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'magenta'];
    // let lightIndex, darkIndex;
    let state;
    // const root = document.querySelector(':root');


    let mediator;

    // const initColorIndexes = function () {
    
    //     const initColor = getComputedStyle(root).getPropertyValue('--color-player' + playerNumber);
    //     lightIndex = darkIndex = colors.indexOf(initColor);
    // };

    const createElements = function () {

        
        // const changeColor = function (type, direction=1) {

        //     const changeIndex = function () {

        //         const getOldIndex = function () {
                
        //             let oldIndex;
                    
        //             if (type == 'light') {
        //                 oldIndex = lightIndex;
        //             } else {
        //                 oldIndex = darkIndex;
        //             }
        //             return oldIndex;
        //         };

        //         const getNewIndex = function (oldIndex) {
                
        //             let index = oldIndex + direction;

        //             if (index >= colors.length) {
        //                 index = 0
        //             } else if (index < 0) {
        //                 index = colors.length - 1;
        //             }
        //             return index;
        //         };

        //         const index = getNewIndex(getOldIndex());

        //         if (type == 'light') {
        //             lightIndex = index;
        //         } else {
        //             darkIndex = index;
        //         }

        //         return index;
        //     };
            
        //     const getColorName = function (index) {
            
        //         return colors[index];
        //     };

        //     const changeStyle = function (colorName) {

        //         const name = '--' + type + '-player' + playerNumber;
        //         const value = 'var(--' + colorName + '-' + type + ')';
            
        //         root.style.setProperty(name, value);
        //     };

        //     changeStyle(getColorName(changeIndex()));
        // };

        // const changeBothColors = function (direction=1) {
        
        //     changeColor('light', direction)
        //     changeColor('dark', direction)
        // };

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

    const updatePlayerNameState = function () {

        const getPlayerName = function () {
        
            return props.player.getName();
        };

        state.update('playerName', getPlayerName());
    };

    const init = function () {
    
        // initColorIndexes();
        createElements();
        createState();
        updatePlayerNameState();
    }();

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };

    const update = function ({ code, gameState }) {

        if (code == 'changePlayerName') {

            updatePlayerNameState();
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
            setMediator,
            update,
            getId,
            getMain,
        }
    );
};

export default ChangeColorsComponent;