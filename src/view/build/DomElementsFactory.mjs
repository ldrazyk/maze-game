import SvgRepository from "./SvgRepository.mjs";

const DomElementsFactory = function () {

    const svgRepository = SvgRepository();

    const createHtmlElement = function ({ type, classList=false, id=false, datasets=false, textContent=false, value=false, size=false, order=false, onClick=false, parent=false }) {

        const element = document.createElement(type);
    
        if (classList) {
            element.classList = classList;
        }
    
        if (id) {
            element.id = id;
        }
    
        if (datasets) {
            for (const [key, value] of Object.entries(datasets)) {
                element.dataset[key] = value;
            }
        }
    
        if (textContent) {
            element.textContent = textContent;
        }
    
        if (value) {
            element.value = value;
        }
    
        if (size) {
            element.size = size;
        }
    
        if  (order) {
            element.style.order = order;
        }
    
        if (onClick) {
            element.addEventListener('click', onClick);
        }
        
        if (parent) {
            parent.appendChild(element);
        }
    
        return element;
    };

    const createSvg = function ({ name, parent=false }) {

        const svg = svgRepository.getSvgCopy(name);

        if (parent) {
            parent.appendChild(svg);
        }
    
        return svg;
    };

    const createElement = function (spec) {
    
        let element;
    
        if (spec.type == 'svg') {
            element = createSvg(spec);
        } else {
            element = createHtmlElement(spec);
        }

        return element;
    };
    
    const createElements = function (elementsSpec) {

        const create = function () {
        
            const elements = {};
        
            for (const [key, spec] of Object.entries(elementsSpec)) {
                
                elements[key] = createElement(spec);
            }

            return elements;
        };

        const appendToKey = function (elements) {
        
            for (const [key, spec] of Object.entries(elementsSpec)) {
                
                if (spec.parentKey) {

                    const element = elements[key];
                    const parent = elements[spec.parentKey];
                    parent.appendChild(element);
                }
            }
        };

        const elements = create();
        appendToKey(elements);

        return elements;
    };
    
    return Object.freeze(
        {
            createElement,
            createElements,
        }
    );
};

export default DomElementsFactory;