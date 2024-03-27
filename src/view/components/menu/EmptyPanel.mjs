const EmptyPanel = function ({ factory }) {
    
    const elements = {};
    const id = 'empty-panel';

    
    const createMain = function () {

        elements.main = factory.createElement(
            {
                type: 'div',
                id: id,
                classList: 'panel ' + id,
                textContent: 'Empty Panel',
            }
        );
    };

    const init = function () {
    
        createMain();
    }();

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
            update,
            getId,
            getMain,
        }
    );
};

export default EmptyPanel;