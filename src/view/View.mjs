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

    const buildView = function (gameState) {
        
        const builder = viewBuilder;

        const make = function () {
        
            builder.reset(root);
            builder.setController(controller);
            builder.setColorsManager();

            builder.setContainer({ id: 'header', elementType: 'header', parentId: 'root'});
            builder.setContainer({ id: 'main', elementType: 'main', parentId: 'root' });
            builder.setContainer({ id: 'footer', elementType: 'footer', parentId: 'root'});
            builder.setContainer({ id: 'board-panel', elementType: 'div', classList: 'board-panel', parentId: 'main' });

            builder.setComponent({ id: 'menu', type: 'menu', parentId: 'header', gameState });
            builder.setComponent({ id: 'control-panel', type: 'controlPanel', parentId: 'main' });
            builder.setComponent({ id: 'player-panel-1', type: 'playerPanel', playerNumber: 1, parentId: 'main', gameState });
            builder.setComponent({ id: 'player-panel-2', type: 'playerPanel', playerNumber: 2, parentId: 'main', gameState });
            builder.setComponent({ id: 'info-panel', type: 'infoPanel', parentId: 'main' });

            builder.setAspectRatioTracker({ test: true });

        };

        make();

        mediator = builder.getResult();
    };

    const buildBoardView = function (gameState) {

        const builder = viewBuilder;

        builder.setMediator(mediator);
        builder.setComponent({ id: 'board', type: 'board', parentId: 'board-panel', gameState });

        mediator.test();
    };

    const endGame = function(gameState) {

        const scoreString = gameState.getLastScoreString();
        console.log(scoreString);
    };

    const update = function({ code=false, object=false }) {

        console.log('> view.update("' + code + '")');
        
        if (code == 'createGame') {

            buildBoardView(object);
        } else if (code == 'endGame') {
            
            endGame(object);
        } else if (code == 'createSession') {
            
            buildView(object);
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