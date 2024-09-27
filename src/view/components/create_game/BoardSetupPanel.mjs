import BoardSelector from "./BoardSelector.mjs";

const BoardSetupPanel = function ({ gameState, factory }) {
    
    const id = 'board-setup-panel';
    const components = {};
    let elements;
    let state;
    let boardSelector;

    const createElements = function () {
    
        elements = factory.createElements(
            {
                main: {
                    type: 'section',
                    id: id,
                    classList: 'board-section',
                }
            }
        );
    };

    const updateAllStates = function () {
    
        state.update('size', boardSelector.getSize());
        state.update('id', boardSelector.getId());
    };

    const nextSize = function (direction) {
    
        boardSelector.nextSize(direction);
        updateAllStates();
    };

    const nextId = function (direction) {
    
        boardSelector.nextId(direction);
        updateAllStates();
    };

    const toggleSize = function () {
    
        boardSelector.toggleSize();
        updateAllStates();
    };

    const toggleId = function () {
    
        boardSelector.toggleId();
        updateAllStates();
    };

    const activateSize = function (active=true) {
    
        boardSelector.activateSize(active);
        updateAllStates();
    };

    const activateId = function (active=true) {
    
        boardSelector.activateId(active);
        updateAllStates();
    };

    const createComponents = function () {
    
        components.sizePanel = factory.createComponent(
            {
                type: 'collectionComponent',
                classList: 'size-panel',
                id: 'size-panel',
                title: 'Size',
                nextItem: nextSize,
                toggleActive: toggleSize,
                activate: activateSize,
                active: false,
                factory,
                parent: elements.main,
            }
        );

        components.idPanel = factory.createComponent(
            {
                type: 'collectionComponent',
                classList: 'id-panel',
                id: 'id-panel',
                title: 'Board',
                nextItem: nextId,
                toggleActive: toggleId,
                activate: activateId,
                active: false,
                factory,
                parent: elements.main,
            }
        );

        components.previewPanel = factory.createComponent(
            {
                type: 'boardPreviewPanel',
                factory,
                iterator: gameState.getBoardDummyIterator(),
                parent: elements.main,
            }
        );

        boardSelector = BoardSelector( { factory, iterator: gameState.getBoardDummyIterator() } );
    };

    const createState = function () {

        const onIdChange = function (id) {
        
            const updateIdPanel = function () {
            
                components.idPanel.setItem(id);
            };

            const updatePreviewPanel = function () {
            
                components.previewPanel.setId(id);
            };

            updateIdPanel();
            updatePreviewPanel();
        };

        const onSizeChange = function (size) {
        
            const updateSizePanel = function () {
            
                components.sizePanel.setItem(size);
            };

            const updatePreviewPanel = function () {
            
                components.previewPanel.setSize(size);
            };

            updateSizePanel();
            updatePreviewPanel();
        };
    
        state = factory.createState();

        state.add({
            name: 'id',
            value: '',
            onChange: onIdChange,
        });

        state.add({
            name: 'size',
            value: 0,
            onChange: onSizeChange,
        });
    };

    const init = function () {
    
        createElements();
        createComponents();
        createState();
    }();
    
    const getBoardSize = function () {
    
        return boardSelector.getSize();
    };

    const getBoardId = function () {
    
        return boardSelector.getId();
    };

    const getId = function () {
        
        return id;
    };
    
    const getMain = function () {
        
        return elements.main;
    };

    
    return Object.freeze(
        {
            
            getBoardSize,
            getBoardId,

            getId,
            getMain,
        }
    );
};

export default BoardSetupPanel;