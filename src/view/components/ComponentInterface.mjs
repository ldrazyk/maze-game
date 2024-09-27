const ComponentInterface = function ({ onClick, factory }) {
    
    let elements;
    const id = 'basic-component';

    let mediator;

    const createElements = function () {

        elements = factory.createElements(
            {
                main: {
                    type: 'div',
                    id: id,
                    classList: 'component',
                    textContent: 'Component',
                    onClick,
                }
            }
        );
    };

    const init = function () {
    
        createElements();
    }();

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };

    const update = function () {
    
        return ;
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

export default ComponentInterface;