import Model from './model/Model.mjs';
import View from './view/View.mjs';
import Controller from './controller/Controller.mjs';

const App = function () {
    
    let model, view, controller;

    const createMVC = function() {

        model = Model();
        view = View();
        controller = Controller(model);
        controller.setSelf(controller);
        controller.setView(view);
    };

    const init = function () {
    
        createMVC();
    }();

    const createSession = function( playersSpec ) {

        controller.createSession({ playersSpec });
    };

    const createGame = function({ boardId, pawnsSpec }) {

        controller.createGame({ boardId, pawnsSpec });
    };
    
    
    return Object.freeze(
        {
            createSession,
            createGame,
        }
    );
};

export default App;