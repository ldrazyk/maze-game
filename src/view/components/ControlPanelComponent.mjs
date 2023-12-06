import ButtonComponent from "./ButtonComponent.mjs"

const ControlPanelComponent = function(controler) {
    let mainElement;
    const buttonComponents = {};


    const createElements = function () {

        const createMainElement = function () {

            mainElement = document.createElement('section');
            mainElement.classList.add('control_panel');
            mainElement.id = 'control_panel';
        };

        const createButtonElements = function () {

            const buttonsSpec = [
                { id: 'btn_select_next', text: 'Select', onClick: controler.selectNext, order: 1 },
                { id: 'btn_up', text: '^', onClick: controler.moveUp, order: 2 },
                { id: 'btn_next_turn', text: 'Next Turn', onClick: controler.nextTurn, order: 3 },
                { id: 'btn_left', text: '<-', onClick: controler.moveLeft, order: 4 },
                { id: 'btn_hold', text: 'x', onClick: controler.hold, order: 5 },
                { id: 'btn_right', text: '->', onClick: controler.moveRight, order: 6 },
                { id: 'btn_undo', text: 'Undo', onClick: controler.undo, order: 7 },
                { id: 'btn_down', text: 'v', onClick: controler.moveDown, order: 8 },
                { id: 'btn_redo', text: 'Redo', onClick: controler.redo, order: 9 },
            ];

            buttonsSpec.forEach(spec => {
                
                const button = ButtonComponent(spec);
                button.appendTo(mainElement);
                buttonComponents[spec.id] = button;
            });
        };

        createMainElement();
        createButtonElements();
    };

    const init = function () {
        
        createElements();
    }();

    
    const appendTo = function (container) {
        
        container.appendChild(mainElement);
    };

    const update = function (code) {

        console.log('>> ControlPanelComponent.update("' + code + '")');
        
        if (code == 'createGame') {
            buttonComponents.btn_next_turn.activate();
        }
    };

    return Object.freeze(
        {
            appendTo: appendTo,
            update: update,
        }
    );
};

export default ControlPanelComponent;