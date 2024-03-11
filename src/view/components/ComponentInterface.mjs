const ComponentInterface = function ({ factory }) {
    
    let mainElement;
    const id = 'component';

    let mediator;

    const createElements = function () {
    
        const createMain = function () {
        
            mainElement = factory.createElement(
                {
                    type: 'div',
                    classList: 'component',
                }
            );
        };

        createMain();
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
        
        return mainElement;
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