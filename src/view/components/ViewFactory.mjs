import DomElementsFactory from './DomElementsFactory.mjs';
import UiComponentsFactory from './UiComponentsFactory.mjs';

const ViewFactory = function () {
    
    let domElementsFactory;
    let uiComponentsFactory;

    const createFactories = function () {
    
        domElementsFactory = DomElementsFactory();
        uiComponentsFactory = UiComponentsFactory();
    };

    const init = function () {
    
        createFactories();
    }();

    const createElement = function (spec) {
    
        return domElementsFactory.createElement(spec);
    };

    const createElements = function (spec) {
    
        return domElementsFactory.createElements(spec);
    };

    const createComponent = function (spec) {
    
        return uiComponentsFactory.createComponent(spec);
    };

    const append = function ({ parent, child }) {
    
        uiComponentsFactory.append({ parent, child });
    };

    
    return Object.freeze(
        {
            createElement,
            createElements,
            createComponent,
            append,
        }
    );
};

export default ViewFactory;