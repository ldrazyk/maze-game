const CollectionPreviewComponent = function ({ factory, changeItem, hasCheckbox=false, toggleActive=false, active=true }) {
    
    let elements = {};
    const id = 'change-board-id';

    const setActive = function (active=true) {
    
        if (active) {
            elements.main.classList.add('active');
        } else {
            elements.main.classList.remove('active');
        }
    };

    const createElements = function () {

        let spec = {
            main: {
                type: 'div',
                classList: 'collection-passer',
            },
            prevButton: {
                type: 'div',
                classList: 'button prev',
                onClick: () => changeItem(-1),
                parentKey: 'main',
            },
            prevSvg: {
                type: 'svg',
                name: 'move',
                parentKey: 'prevButton',
            },
            itemOutput: {
                type: 'div',
                classList: 'item-output',
                parentKey: 'main',
            },
            nextButton: {
                type: 'div',
                classList: 'button next',
                onClick: () => changeItem(1),
                parentKey: 'main',
            },
            nextSvg: {
                type: 'svg',
                name: 'move',
                parentKey: 'nextButton',
            },
        };

        const checkboxSpec = {
            checkbox: {
                type: 'div',
                classList: 'checkbox button',
                onClick: toggleActive,
                parentKey: 'main',
            },
            checkboxSvg: {
                type: 'svg',
                name: 'hold',
                parentKey: 'checkbox',
            },
        };

        if (hasCheckbox) {
            spec = { ...spec, ...checkboxSpec }
        };

        elements = factory.createElements(spec);
    };

    const init = function () {
    
        createElements();
        setActive(active);
    }();

    const setItemOutput = function (itemOutput) {
    
        elements.itemOutput.textContent = itemOutput;
    };

    const update = function () {
    
        return ;
    };

    const getId = function () {
        
        return id;
    };
    
    const getMain = function () {
        
        return elements.main;
    };

    
    return Object.freeze(
        {
            setItemOutput,
            setActive,
            update,
            getId,
            getMain,
        }
    );
};

export default CollectionPreviewComponent;