const CreateGamePanel = function ({ factory, createGame }) {
    
    const elements = {};
    const id = 'create-game-panel';



    const newGame = function () {

        const create = function () {
        
            const boardSpec = {
                sizes: [7],
            };
        
            const pawnsSpec1 = [
                {type: 'lion', amount: 1}, 
                {type: 'rooster', amount: 1}, 
                {type: 'snake', amount: 1}
            ];
        
            const pawnsSpec = [pawnsSpec1, pawnsSpec1];
        
            createGame({ boardSpec, pawnsSpec });
        };

        create();
        toggle();
    };

    
    const createMain = function () {

        elements.main = factory.createElement(
            {
                type: 'div',
                id: id,
                classList: 'panel ' + id,
                textContent: 'Create Game Panel',
            }
        );
    };

    const init = function () {
    
        createMain();
    }();

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
            update,
            getId,
            getMain,
        }
    );
};

export default CreateGamePanel;