const InfoPanel = function ({ factory }) {
    
    let elements;
    const id = 'info-panel';

    let mediator;


    const createElements = function () {

        const spec = {
            main: {
                type: 'div',
                classList: 'panel info-panel',
            },
            screen: {
                type: 'div',
                classList: 'screen',
                parentKey: 'main',
            },
            gameStateFirstLine: {
                type: 'p',
                classList: '',
                parentKey: 'screen',
            },
            gameStateSecondLine: {
                type: 'p',
                classList: '',
                parentKey: 'screen',
            },
            
        };

        elements = factory.createElements(spec);
    };

    const init = function () {
    
        createElements();
    }();

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };

    const update = function ({code, object}) {

        const updateGameStateLines = function () {


            const isPlaying = object.isPlaying();
            let gameNumber, turnNumber, gameScoreType, winnerName;

            if (isPlaying) {

                gameNumber = object.getGameNumber();
                turnNumber = object.getTurnNumber();
            } else {

                gameScoreType = object.getLastScoreType();
                winnerName = object.getLastScoreWinnerName();
            }

            const updateFirstLine = function () {
            
                const getText = function () {
    
                    let text = '';
                
                    if (isPlaying) {
    
                        text += 'Game ' + gameNumber + ' , Turn ' + turnNumber + '';
                    } else {
    
                        text += 'Game Over !';
                    }
    
                    return text;
                    
                };
    
                const updateDom = function (text) {
                
                    elements.gameStateFirstLine.textContent = text;
                };
    
                updateDom(getText());
            };

            const updateSecondLine = function () {
            
                const getText = function () {
    
                    let text = '';
                
                    if (isPlaying) {
    
                        
                    } else {
                        
                        text += 'Score Type: ' + gameScoreType;

                        if (winnerName) {

                            text += ', Winner: ' + winnerName;
                        }
                    }
    
                    return text;
                    
                };
    
                const updateDom = function (text) {
                
                    elements.gameStateSecondLine.textContent = text;
                };
    
                updateDom(getText(object));
            };

            updateFirstLine();
            updateSecondLine();
        };


    
        console.log(code);

        if (['nextTurn', 'endGame'].includes(code)) {

            updateGameStateLines();

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

export default InfoPanel;