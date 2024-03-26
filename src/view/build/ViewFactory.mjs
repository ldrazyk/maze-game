import DomElementsFactory from './DomElementsFactory.mjs';
import UiComponentsFactory from './UiComponentsFactory.mjs';
import State from '../utils/State.mjs';

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

    const createState = function () {
    
        return State();
    };

    const append = function ({ parent, child }) {
    
        uiComponentsFactory.append({ parent, child });
    };

    const remove = function (component) {
    
        uiComponentsFactory.remove(component);
    };

    
    return Object.freeze(
        {
            createElement,
            createElements,
            createComponent,
            createState,
            append,
            remove,
        }
    );
};

export default ViewFactory;