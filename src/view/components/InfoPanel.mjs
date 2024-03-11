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
        };

        elements = factory.createElements(spec);
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

export default InfoPanel;