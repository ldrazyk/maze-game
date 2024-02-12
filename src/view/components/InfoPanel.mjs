const InfoPanel = function () {
    
    let mainElement;
    const id = 'info_panel';

    let mediator;


    const createElements = function () {
    
        const createMain = function () {
        
            mainElement = document.createElement('div');
            mainElement.id = id;
            mainElement.textContent = 'Info Panel';
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

export default InfoPanel;