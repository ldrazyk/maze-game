import ViewBuilder from "./build/ViewBuilder.mjs";

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

        const make = function () {
        
            builder.reset(root);
            builder.setController(controller);

            builder.setContainer({ id: 'header', elementType: 'header', parentId: 'root'});
            builder.setContainer({ id: 'main', elementType: 'main', parentId: 'root' });
            builder.setContainer({ id: 'footer', elementType: 'footer', parentId: 'root'});
            builder.setContainer({ id: 'board-section', elementType: 'section', classList: 'board-section', parentId: 'main' });
            builder.setContainer({ id: 'panels-section', elementType: 'section', classList: 'panels-section', parentId: 'main' });

            builder.setComponent({ id: 'menu', type: 'menu', parentId: 'header' });
            builder.setComponent({ id: 'board', type: 'board', parentId: 'board-section', gameState: gameState });
            builder.setComponent({ id: 'control-panel', type: 'controlPanel', parentId: 'panels-section' });
            builder.setComponent({ id: 'player-panel-1', type: 'playerPanel', playerNumber: 1, parentId: 'panels-section', gameState: gameState });
            builder.setComponent({ id: 'player-panel-2', type: 'playerPanel', playerNumber: 2, parentId: 'panels-section', gameState: gameState });
            builder.setComponent({ id: 'info-panel', type: 'infoPanel', parentId: 'panels-section' });
        };

        make();

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