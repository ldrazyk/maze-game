const PlayersPanel = function ({ playerNumber }) {
    
    let mainElement;
    const id = 'players_panel_' + playerNumber;

    let mediator;
    
    const createElements = function () {
    
        const createMain = function () {
        
            mainElement = document.createElement('div');
            mainElement.id = id;
            mainElement.textContent = id;
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

export default PlayersPanel;