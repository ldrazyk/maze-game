import Model from './model/Model.mjs';
import View from './view/View.mjs';
import Controller from './controller/Controller.mjs';

let model, view, controller;

const createMVC = function() {
    model = Model();
    view = View();
    controller = Controller(model);
    controller.setSelf(controller);
    controller.setView(view);
};

const createTestSession = function() {
    controller.createSession({playersSpec: [{name: 'Walter White', color: 'blue', number: 1}, {name: 'Jessy Pinkman', color: 'pink', number: 2}]});
};

const createTestGame = function() {
    const pawnsSpec1 = [{type: 'lion', amount: 1}, {type: 'rooster', amount: 1}, {type: 'snake', amount: 1}];

    const matrixSpec08 = {
        name: "matrix08",
        matrix: [
            [1, 1, 1, 3, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 2, 1, 1, 1]
            ]
    };

    const matrixSpec00 = {
        name: "matrix00",
        matrix: [
            [1, 1, 1, 3, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 2, 1, 1, 1]
            ]
    };

    const matrixSpec01 = {
        name: "matrixSmall",
        matrix: [
            [1, 1, 3, 1, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 1, 2, 1, 1]
            ]
    };

    controller.createGame({matrixSpec: matrixSpec00, pawnsSpec: [pawnsSpec1, pawnsSpec1]});
};

const app = function() {
    createMVC();
    createTestSession();
    createTestGame();
}();
