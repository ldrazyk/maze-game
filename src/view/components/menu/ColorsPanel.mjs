const ColorsPanel = function ({ factory }) {
    
    let mainElement;
    const components = {};
    const id = 'change-colors-panel';

    const createElements = function () {
    
            mainElement = factory.createElement(
                {
                    type: 'div',
                    id: id,
                    classList: id,
                    textContent: 'Change Colors',
                }
            );
    };

    const init = function () {
    
        createElements();
    }();

    const update = function () {
    
        return ;
    };

    const getId = function () {
        
        return id;
    };
    
    const getMain = function () {
        
        return mainElement;
    };
    
    
    return Object.freeze(
        {
            update,
            getId,
            getMain,
        }
    );
};

export default ColorsPanel;