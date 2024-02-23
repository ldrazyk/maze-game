import ViewBuilder from "./components/ViewBuilder.mjs";
import SvgRepository from "./components/SvgRepository.mjs";

const View = function() {
    
    let root; 
    let controller;
    let viewBuilder;
    let mediator;
    let svgRepository;

    const findRoot = function () {
        
        root = document.getElementById('root');
    };

    const createViewBuilder = function () {
        
        viewBuilder = ViewBuilder();
    };

    const createSvgRepository = function () {
    
        svgRepository = SvgRepository();
    };

    const init = function() {
        
        findRoot();
        createViewBuilder();
        createSvgRepository();
    }();

    const setController = function(newController) {
        
        controller = newController;
    };


    const buildGameView = function (gameState) {
        
        const builder = viewBuilder;

        const make = function () {
        
            builder.reset(root);
            builder.setController(controller);
            builder.setSvgRepository(svgRepository);
    
            builder.setContainer({ id: 'main', type: 'div', parentId: 'root' });
    
            builder.setContainer({ id: 'section1', type: 'section', parentId: 'main' });
    
            builder.setBoard({ parentId: 'section1', gameState: gameState });
            builder.setInfoPanel({ parentId: 'section1' });
    
            builder.setContainer({ id: 'section2', type: 'section', parentId: 'main' });
    
            builder.setControlPanel({ parentId: 'section2' });
            builder.setPlayerPanel({ playerNumber: 1, parentId: 'section2', gameState: gameState });
            builder.setPlayerPanel({ playerNumber: 2, parentId: 'section2', gameState: gameState });
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