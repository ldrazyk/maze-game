import DomElementsFactory from './DomElementsFactory.mjs';
import UiComponentsFactory from './UiComponentsFactory.mjs';
import UiState from '../utils/UiState.mjs';

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
    
        return UiState();
    };

    const append = function ({ parent, child }) {
    
        uiComponentsFactory.append({ parent, child });
    };

    
    return Object.freeze(
        {
            createElement,
            createElements,
            createComponent,
            createState,
            append,
        }
    );
};

export default ViewFactory;