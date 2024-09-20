const ButtonCreateGame = function ({ onClick, factory }) {
    
    const id = 'create-game-button';
    let elements;

    const createElements = function () {
    
        elements = factory.createElements(
            {
                main: {
                    type: 'div',
                    id: id,
                    classList: 'button',
                    textContent: 'Create',
                    onClick,
                }
            }
        );
    };

    const init = function () {
    
        createElements();
    }();

    const getId = function () {
        
        return id;
    };
    
    const getMain = function () {
        
        return elements.main;
    };
    
    return Object.freeze(
        {
            getId,
            getMain,
        }
    );
};

export default ButtonCreateGame;