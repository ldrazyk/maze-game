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

        const make = function () {
        
            builder.reset(root);
            builder.setController(controller);

            builder.setContainer({ id: 'header', type: 'header', parentId: 'root'});
            builder.setContainer({ id: 'main', type: 'main', parentId: 'root' });
            builder.setContainer({ id: 'footer', type: 'footer', parentId: 'root'});
            builder.setContainer({ id: 'board-section', type: 'section', classList: 'board-section', parentId: 'main' });
            builder.setContainer({ id: 'panels-section', type: 'section', classList: 'panels-section', parentId: 'main' });

            builder.setMenu({ id: 'menu', parentId: 'header' });
            builder.setBoard({ parentId: 'board-section', gameState: gameState });
            builder.setControlPanel({ parentId: 'panels-section' });
            builder.setPlayerPanel({ playerNumber: 1, parentId: 'panels-section', gameState: gameState });
            builder.setPlayerPanel({ playerNumber: 2, parentId: 'panels-section', gameState: gameState });
            builder.setInfoPanel({ parentId: 'panels-section' });
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