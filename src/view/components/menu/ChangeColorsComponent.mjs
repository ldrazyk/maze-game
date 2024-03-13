const ChangeColorsComponent = function ({ playerNumber, gameState, factory }) {
    
    let elements;
    const props = {
        id: 'changeColors' + playerNumber,
        player: gameState.getPlayer(playerNumber),
    };
    const colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'magenta'];
    let lightIndex, darkIndex;
    let state;
    const root = document.querySelector(':root');


    let mediator;

    const initColorIndexes = function () {
    
        const initColor = getComputedStyle(root).getPropertyValue('--color-player' + playerNumber);
        lightIndex = darkIndex = colors.indexOf(initColor);
    };

    const createElements = function () {

        
        const changeColor = function (type, direction=1) {

            const changeIndex = function () {

                const getOldIndex = function () {
                
                    let oldIndex;
                    
                    if (type == 'light') {
                        oldIndex = lightIndex;
                    } else {
                        oldIndex = darkIndex;
                    }
                    return oldIndex;
                };

                const getNewIndex = function (oldIndex) {
                
                    let index = oldIndex + direction;

                    if (index >= colors.length) {
                        index = 0
                    } else if (index < 0) {
                        index = colors.length - 1;
                    }
                    return index;
                };

                const index = getNewIndex(getOldIndex());

                if (type == 'light') {
                    lightIndex = index;
                } else {
                    darkIndex = index;
                }

                return index;
            };
            
            const getColorName = function (index) {
            
                return colors[index];
            };

            const changeStyle = function (colorName) {

                const name = '--' + type + '-player' + playerNumber;
                const value = 'var(--' + colorName + '-' + type + ')';
            
                root.style.setProperty(name, value);
            };

            changeStyle(getColorName(changeIndex()));
        };

        const changeBothColors = function (direction=1) {
        
            changeColor('light', direction)
            changeColor('dark', direction)
        };

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
            // both
            bothColorsPrev: {
                type: 'div',
                classList: 'button prev',
                onClick: () => changeBothColors(-1),
                parentKey: 'main',
            },
            bothColorsPrevSvg: {
                type: 'svg',
                name: 'move',
                parentKey: 'bothColorsPrev',
            },
            playerIcon: {
                type: 'div',
                classList: 'player-icon',
                parentKey: 'main',
            },
            svgPlayer: {
                type: 'svg',
                name: 'rooster',
                parentKey: 'playerIcon',
            },
            bothColorsNext: {
                type: 'div',
                classList: 'button next',
                onClick: () => changeBothColors(1),
                parentKey: 'main',
            },
            bothColorsNextSvg: {
                type: 'svg',
                name: 'move',
                parentKey: 'bothColorsNext',
            },
        };

        const singleColorsSpec = {
            // ligth
            lightColorPrev: {
                type: 'div',
                classList: 'button prev',
                onClick: () => changeColor('light', -1),
                parentKey: 'main',
            },
            lightColorPrevSvg: {
                type: 'svg',
                name: 'move',
                parentKey: 'lightColorPrev',
            },
            lightColorSample: {
                type: 'div',
                classList: 'color-sample light',
                parentKey: 'main',
            },
            lightColorNext: {
                type: 'div',
                classList: 'button next',
                onClick: () => changeColor('light', 1),
                parentKey: 'main',
            },
            lightColorNextSvg: {
                type: 'svg',
                name: 'move',
                parentKey: 'lightColorNext',
            },
            // dark
            darkColorPrev: {
                type: 'div',
                classList: 'button prev',
                onClick: () => changeColor('dark', -1),
                parentKey: 'main',
            },
            darkColorPrevSvg: {
                type: 'svg',
                name: 'move',
                parentKey: 'darkColorPrev',
            },
            darkColorSample: {
                type: 'div',
                classList: 'color-sample dark',
                parentKey: 'main',
            },
            darkColorNext: {
                type: 'div',
                classList: 'button next',
                onClick: () => changeColor('dark', 1),
                parentKey: 'main',
            },
            darkColorNextSvg: {
                type: 'svg',
                name: 'move',
                parentKey: 'darkColorNext',
            },
        }
    
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

    const updatePlayerName = function () {

        const getPlayerName = function () {
        
            return props.player.getName();
        };

        state.update('playerName', getPlayerName());
    };

    const updateState = function () {
    
        updatePlayerName();
    };

    const init = function () {
    
        initColorIndexes();
        createElements();
        createState();
        updateState();
    }();

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };

    const update = function ({ code, gameState }) {

        if (code == 'changePlayerName') {

            updatePlayerName();
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