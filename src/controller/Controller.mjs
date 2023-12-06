const Controller = function(model) {
    let self, view;

    // init

    const setSelf = function (controler) {
        self = controler;
    };

    const setView = function (newView) {
        if (view) {
            model.detach(view);
        }
        view = newView;
        model.attach(view);
        view.setModel(model);
        view.setControler(self);
    }

    // settings commands

    const createSession = function(spec) {
        model.createSession(spec);
    };

    const createGame = function(spec) {
        model.createGame(spec);
    };

    // buttons game commands

    const nextTurn = function(spec) {
        console.log('\n>> controler.nextTurn()');  // test
        model.nextTurn();
    };

    const selectNext = function() {
        console.log('\n>> controler.selectNext()');
        model.selectNext();
    };

    const hold = function() {
        model.hold();
    };

    const moveUp = function() {
        model.moveUp();
    };

    const moveDown = function() {
        model.moveDown();
    };

    const moveLeft = function() {
        model.moveLeft();
    };

    const moveRight = function() {
        model.moveRight();
    };

    // mouse game commands

    const select = function(pawnId) {
        model.select(pawnId);
    };

    const move = function(fieldId) {
        model.move(fieldId);
    }; 

    const click = function (fieldId) {
        console.log('\n>> controler.click( ' + fieldId + ' )');
        model.click(fieldId);
    }; 

    // history commands

    const undo = function() {
        console.log('\n>> controler.undo()');
        model.undo();
    };

    const redo = function() {
        console.log('\n>> controler.redo()');
        model.redo();
    };

    const addKeydownEvents = function() {
        document.addEventListener('keydown', function(event) {
            switch (event.code) {
                case 'KeyS':
                    selectNext();
                    break;
                case 'Enter':
                    hold();
                    break;
                case 'ArrowUp':
                    moveUp();
                    break;
                case 'ArrowDown':
                    moveDown();
                    break;
                case 'ArrowLeft':
                    moveLeft();
                    break;
                case 'ArrowRight':
                    moveRight();
                    break;
                case 'KeyZ':
                    undo();
                    break;
                case 'KeyY':
                    redo();
                    break;
                case 'KeyT':
                    nextTurn();
                    break;
            }
        });
    }();

    return Object.freeze(
        {
            setSelf: setSelf,
            setView: setView,

            createSession: createSession,
            createGame: createGame,

            nextTurn: nextTurn,
            selectNext: selectNext,
            hold: hold,
            moveUp: moveUp,
            moveDown: moveDown,
            moveLeft: moveLeft,
            moveRight: moveRight,

            select: select,
            move: move,
            click: click,

            undo: undo,
            redo: redo,
        }
    );
};

export default Controller;