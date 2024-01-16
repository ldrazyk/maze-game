import updateClass from "../utils/updateClass.mjs";

const FieldComponent = function({ controler, field }) {
    let type, row, column, id, pawn;
    let mainElement;
    let highlightElement, flagElement, pawnElement;

    const setParams = function () {

        type = field.getType();
        row = field.getX();
        column = field.getY();
        id = field.getId();
        pawn = field.getPawn();
    };

    const createElements = function () {

        const createFieldElement = function() {

            mainElement = document.createElement('div');
            mainElement.className = 'field ' + type;
            mainElement.dataset.row = row;
            mainElement.dataset.column = column;
            mainElement.style.order = column;
            mainElement.id = id;
        };
    
        const createHighlightElement = function() {

            highlightElement = document.createElement('div');
            highlightElement.classList.add('highlight');
            mainElement.appendChild(highlightElement);
        };
    
        const createFlagElement = function() {

            if (type == 'exit') {
                flagElement = document.createElement('div');
                flagElement.classList.add(field.getPlayer().getColor(), 'flag');
                highlightElement.appendChild(flagElement);
            }
        };
    
        const createPawnElement = function() {
            
            pawnElement = document.createElement('div');
            pawnElement.className = 'pawn';
            
            if (flagElement) {
                flagElement.appendChild(pawnElement);
            } else {
                highlightElement.appendChild(pawnElement);
            }
        };

        const addEvents = function() {

            pawnElement.addEventListener('click', () => { controler.click(id) });
        };

        createFieldElement();
        if (type != 'wall') {
            createHighlightElement();
            createFlagElement();
            createPawnElement();
            addEvents(); 
        }
    };

    const init = function() {
        
        setParams();
        createElements();
    }();

    const updatePawn = function () {
        pawn = field.getPawn();
    };

    const hideFlag = function () {
        if (flagElement && pawn) {
            flagElement.className = 'flag';
        }
    };

    const updatePawnElement = function () {

        const findPawnClass = function () {
            let newClassName = 'pawn';
            if (pawn) {
                newClassName += ' ' + 'has_pawn ' + pawn.getType() + ' ' + pawn.getPlayer().getColor();
            }
            return newClassName;
        };
        
        updatePawn();
        hideFlag();
        updateClass(pawnElement, findPawnClass());
    };

    const updateHighlight = function (selected) {

        const findMainAndHiglightClass = function () {

            let mainClass = 'field ' + type;
            let highlightClass = 'highlight';
    
            const addActive = function () {
                mainClass += ' active';
                highlightClass += ' ' + pawn.getPlayer().getColor();
            };

            const addSelected = function () {
                mainClass += ' selected';
            };

            const getReachDirection = function () {

                let reachDirection = false;
                for ( const [direction, reachField] of Object.entries(selected.getReach()) ) {
                    if (reachField === field) {
                        reachDirection = direction;
                        break;
                    }
                }
                return reachDirection;
            };

            const addReach = function (reachDirection) {
                
                const getReachType = function (reachDirection) {

                    let reachType;
                    if (['up', 'down'].includes(reachDirection)) {
                        reachType = 'vertical';
                    } else {
                        reachType = 'horizontal';
                    }
                    return reachType;
                };
    
                mainClass += ' reach';
                highlightClass += ' ' + selected.getPlayer().getColor() + ' ' + getReachType(reachDirection);
            };
            

            if (pawn && pawn.isActive()) {

                addActive();

                if (selected && pawn === selected) {
                    addSelected();
                };

            } else if (selected) {
    
                const reachDirection = getReachDirection();
                if (reachDirection) {
                    addReach(reachDirection);
                }
            }

            return { mainClass, highlightClass };
        };

        updatePawn();
        const {mainClass, highlightClass} = findMainAndHiglightClass();
        updateClass(mainElement, mainClass);
        updateClass(highlightElement, highlightClass);
    };

    const getRow = function () {
        
        return row;
    };

    const getColumn = function () {
        
        return column;
    };

    const getId = function () {
        
        return id;
    };

    const appendTo = function (container) {
        
        container.appendChild(mainElement);
    };

    return Object.freeze(
        {
            updatePawn: updatePawnElement,
            updateHighlight: updateHighlight,
            getRow: getRow,
            getColumn: getColumn,
            getId: getId,
            appendTo: appendTo,
        }
    );
};

export default FieldComponent;