const ButtonCreateGame = function ({ onClick, factory }) {
    
    const id = 'create-game-button';
    let elements;

    const createElements = function () {
    
        elements = factory.createElements(
            {
                main: {
                    type: 'div',
                    id: id,
                    classList: 'button send',
                    onClick,
                },
                paragraphWrapper: {
                    type: 'div',
                    classList: 'wrapper',
                    parentKey: 'main',
                },
                paragraph: {
                    type: 'p',
                    textContent: 'CREATE',
                    parentKey: 'paragraphWrapper',
                },
                paragraphWrapper2: {
                    type: 'div',
                    classList: 'wrapper',
                    parentKey: 'main',
                },
                paragraph1: {
                    type: 'p',
                    textContent: 'CR',
                    parentKey: 'paragraphWrapper2',
                },
                paragraph2: {
                    type: 'p',
                    textContent: 'EA',
                    parentKey: 'paragraphWrapper2',
                },
                paragraph3: {
                    type: 'p',
                    textContent: 'TE',
                    parentKey: 'paragraphWrapper2',
                },
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