import BoardComponent from "./components/BoardComponent.mjs";
import ControlPanelComponent from "./components/ControlPanelComponent.mjs";

const View = function() {
    let model, controler
    let root, boardComponent, controlPanelComponent;
    const components = [];

    const findRoot = function () {
        root = document.getElementById('root');
    };

    const init = function() {
        
        findRoot();
    }();

    const setModel = function(newModel) {
        model = newModel;
    };

    const setControler = function(newControler) {
        controler = newControler;
    };

    const createBoardComponent = function() {

        boardComponent = BoardComponent({model: model, controler: controler});
        boardComponent.appendTo(root);
        components.push(boardComponent);
    };

    const createControlPanel = function() {

        controlPanelComponent = ControlPanelComponent(controler);
        controlPanelComponent.appendTo(root);
        components.push(controlPanelComponent);
    };

    const createGame = function() {

        createBoardComponent();
        createControlPanel();
    };

    const endGame = function() {

        const updateFlags = function() {
            const flagElements = Array.from(document.querySelectorAll('.flag'));
            for (let element of flagElements) {
                if (element.firstChild.classList.contains('has_pawn')) {
                    element.className = 'flag';
                    break;
                }
            }
        };

        const result = model.getResult();
        console.log(`Game over!\nWinner: ${result.winner.getName()}\nType: ${result.type}`);
        if (result.type == 'exit') {
            updateFlags();
        }
        
    };

    const update = function(code) {

        console.log('> view.update("' + code + '")');
        
        if (code == 'createGame') {
            createGame();
        } else if (code == 'endGame') {
            endGame();
        }

        components.forEach(component => { component.update(code) });
    };

    return Object.freeze(
        {
            setModel: setModel,
            setControler: setControler,
            update: update,
        }
    );
};

export default View;