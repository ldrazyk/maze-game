const FieldComponent = function({ controler, field }) {
    let type, row, column, id;
    let mainElement;
    let highlightElement, flagElement, pawnElement;

    const setParams = function () {

        type = field.getType();
        row = field.getX();
        column = field.getY();
        id = field.getId();
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

        const updateFlag = function () {
            if (flagElement) {
                flagElement.className = 'flag';
            }
        };

        const oldClassName = pawnElement.className;
        let newClassName = 'pawn';

        const pawn = field.getPawn();
        if (pawn) {
            newClassName += ' ' + 'has_pawn ' + pawn.getType() + ' ' + pawn.getPlayer().getColor();
            updateFlag();
        }

        if (newClassName != oldClassName) {
            pawnElement.className = newClassName;
        }
    };

    const updateHighlight = function (selected) {

        const oldMainClassName = mainElement.className;
        const oldHighlightsClassName = highlightElement.className;
        let newMainClassName = 'field ' + type;
        let newHighlightsClassName = 'highlight';

        const pawn = field.getPawn();
        if (pawn) {
            if (pawn.isActive()) {
                newMainClassName += ' active';
                newHighlightsClassName += ' ' + pawn.getPlayer().getColor();
                if (pawn.getId() == selected.getId()) {
                    newMainClassName += ' selected';
                };
            }
        }

        if (selected) {

            let reachDirection = false;
            const selectedReach = selected.getReach();
            for ( const [direction, reachField] of Object.entries(selectedReach) ) {
                if (reachField === field) {
                    reachDirection = direction;
                    break;
                }
            }
    
            if (reachDirection) {
                
                const color = selected.getPlayer().getColor();
    
                let reachType = 'horizontal';
                if (['up', 'down'].includes(reachDirection)) {
                    reachType = 'vertical';
                }
    
                newMainClassName += ' reach';
                newHighlightsClassName += ' ' + color + ' ' + reachType;
            }
        }

        if (newMainClassName != oldMainClassName) {
            mainElement.className = newMainClassName;
        }
        if (newHighlightsClassName != oldHighlightsClassName) {
            highlightElement.className = newHighlightsClassName;
        }
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
            updatePawn: updatePawn,
            updateHighlight: updateHighlight,
            getRow: getRow,
            getColumn: getColumn,
            getId: getId,
            appendTo: appendTo,
        }
    );
};

export default FieldComponent;