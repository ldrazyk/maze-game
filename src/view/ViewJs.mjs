import ViewBuilder from "./components/ViewBuilder.mjs";

const View = function() {
    
    let root; 
    let controller;
    let viewBuilder;
    let mediator;

    const findRoot = function () {
        
        root = document.getElementById('root');
    };

    const createViewBuilder = function () {
        
        viewBuilder = ViewBuilder();
    };

    const init = function() {
        
        findRoot();
        createViewBuilder();
    }();

    const setController = function(newController) {
        
        controller = newController;
    };


    const buildGameView = function (gameState) {
        
        const builder = viewBuilder;

        builder.reset(root);
        builder.setController(controller);

        builder.setContainer({ id: 'main', type: 'div', parentId: 'root' });

        builder.setContainer({ id: 'section_1', type: 'section', parentId: 'main', order: 1 });

        builder.setBoard({ parentId: 'section_1', order: 1, gameState: gameState });
        builder.setInfoPanel({ parentId: 'section_1', order: 2 });

        builder.setContainer({ id: 'section_2', type: 'section', parentId: 'main', order: 2 });

        builder.setControlPanel({ parentId: 'section_2', order: 2 });
        builder.setPlayersPanel({ playersNumber: 1, parentId: 'section_2', order: 1, gameState: gameState });
        builder.setPlayersPanel({ playersNumber: 2, parentId: 'section_2', order: 3, gameState: gameState });

        mediator = builder.getResult();
    };

    const endGame = function(gameState) {

        const scoreString = gameState.getLastScoreString();
        console.log(scoreString);
    };

    const update = function({ code=false, object=false }) {

        console.log('> view.update("' + code + '")');
        
        if (code == 'createGame') {

            buildGameView(object)
        } else if (code == 'endGame') {

            endGame(object);
        } 
        
        if (mediator) {

            mediator.update({ code, object });
        }
    };

    return Object.freeze(
        {
            setControler: setController,
            update: update,
        }
    );
};

export default View;