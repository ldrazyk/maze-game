const BoardSetupPanel = function ({ factory }) {
    
    const id = 'board-setup-panel';
    let elements;
    let boardId = false;
    let boardSize = 9;

    const createElements = function () {
    
        elements = factory.createElements(
            {
                main: {
                    type: 'div',
                    id: id,
                    classList: 'panel ' + id,
                    textContent: 'Board Setup Panel',
                }
            }
        );
    };

    const init = function () {
    
        createElements();
    }();
    
    const getBoardSize = function () {
    
        return boardSize;
    };

    const getBoardId = function () {
    
        return boardId;
    };

    const getId = function () {
        
        return id;
    };
    
    const getMain = function () {
        
        return elements.main;
    };

    
    return Object.freeze(
        {
            
            getBoardSize,
            getBoardId,

            getId,
            getMain,
        }
    );
};

export default BoardSetupPanel;