import BoardComponent from "./components/BoardComponent.mjs";
import ControlPanelComponent from "./components/ControlPanelComponent.mjs";

const View = function() {
    let controler
    let root, boardComponent, controlPanelComponent;
    const components = [];

    const findRoot = function () {
        root = document.getElementById('root');
    };

    const init = function() {
        
        findRoot();
    }();

    const setControler = function(newControler) {
        controler = newControler;
    };

    // add something

    const createBoardComponent = function(gameState) {

        boardComponent = BoardComponent({ initGameState: gameState, onFieldClick: controler.click });
        boardComponent.appendTo(root);
        components.push(boardComponent);
    };

    const createControlPanel = function() {

        controlPanelComponent = ControlPanelComponent({ controler: controler });
        controlPanelComponent.appendTo(root);
        components.push(controlPanelComponent);
    };

    const createGame = function(gameState) {

        createBoardComponent(gameState);
        createControlPanel();
    };

    const endGame = function(gameState) {

        const score = gameState.getScore();
        console.log(`Game over!\nWinner: ${score.winner.getName()}\nType: ${score.type}`);
    };

    const update = function({ code=false, object=false }) {

        console.log('> view.update("' + code + '")');
        
        if (code == 'createGame') {
            createGame(object);
        } else if (code == 'endGame') {
            endGame(object);
        }

        components.forEach(component => { component.update({ code: code, object: object }) });
    };

    return Object.freeze(
        {
            setControler: setControler,
            update: update,
        }
    );
};

export default View;