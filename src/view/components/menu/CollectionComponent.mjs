const CollectionComponent = function ({ factory, id=false, classList=false, title, nextItem, toggleHasItem, active=true }) {
    
    let elements = {};

    

    const createElements = function () {

        const addElements = function (spec) {
            
            const newElements = factory.createElements(spec);

            elements = {...elements, ...newElements};
        };

        const createMain = function () {
        
            addElements({
                main: {
                    type: 'div',
                    id: id,
                    classList: 'collection-panel ' + classList,
                },
            });
        }();

        const createTitle = function () {
        
            addElements({
                title: {
                    type: 'div',
                    classList: 'title',
                    parent: elements.main,
                },
                titleParagraph: {
                    type: 'p',
                    textContent: title,
                    parentKey: 'title',
                },
            });
        }();

        const createCheckbox = function () {
        
            addElements({
                checkbox: {
                    type: 'div',
                    classList: 'checkbox button',
                    onClick: toggleHasItem,
                    parent: elements.main,
                },
                checkboxSvg: {
                    type: 'svg',
                    name: 'close',
                    parentKey: 'checkbox',
                },
            });
        }();

        const createItemPanel = function () {
        
            addElements({
                itemPanel: {
                    type: 'div',
                    classList: 'item-panel',
                    parent: elements.main,
                },
                prevButton: {
                    type: 'div',
                    classList: 'button prev',
                    onClick: () => nextItem(-1),
                    parentKey: 'itemPanel',
                },
                prevSvg: {
                    type: 'svg',
                    name: 'move',
                    parentKey: 'prevButton',
                },
                screen: {
                    type: 'div',
                    classList: 'screen',
                    parentKey: 'itemPanel',
                },
                screenParagraph: {
                    type: 'p',
                    parentKey: 'screen',
                },
                nextButton: {
                    type: 'div',
                    classList: 'button next',
                    onClick: () => nextItem(1),
                    parentKey: 'itemPanel',
                },
                nextSvg: {
                    type: 'svg',
                    name: 'move',
                    parentKey: 'nextButton',
                },
            });
        }();
    };

    const setActive = function (active) {
    
        if (active) {
            elements.main.classList.add('active');
        } else {
            elements.main.classList.remove('active');
        }
    };

    const init = function () {
    
        createElements();
        setActive(active);
    }();

    const setItemOutput = function (itemOutput) {
    
        elements.screenParagraph.textContent = itemOutput;
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

export default CollectionComponent;