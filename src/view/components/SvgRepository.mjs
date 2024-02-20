import svgSpec from "../data/svgSpec.mjs";

const SvgRepository = function () {
    
    const svgs = {};
    let mediator;

    const createSvgs = function () {

        const createSvg = function (spec) {

            const xmlns="http://www.w3.org/2000/svg";
            const elements = {};
        
            const createSvgElement = function () {
            
                const svg = document.createElementNS(xmlns, 'svg');
        
                svg.setAttribute('viewBox', spec.viewBox);
                svg.setAttribute('style', "fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;");
        
                elements['svg'] = svg;
            };
        
            const createElement = function ( id, { type, classList='', attributes=false, parent }) {
            
                const element = document.createElementNS(xmlns, type);
                element.classList = classList;
                if (attributes) {
        
                    for (const [att, value] of Object.entries(attributes)) {
                        element.setAttribute(att, value);
                    }
                }
                elements[parent].appendChild(element);
                elements[id] = element;
            };
        
            const createElements = function () {
            
                for (const [id, elementSpec] of Object.entries(spec.elements)) {
                    createElement(id, elementSpec);
                }
            };
        
            createSvgElement();
            createElements();
        
            return elements['svg'];
        };
    
        for (const [name, spec] of Object.entries(svgSpec)) {

            svgs[name] = createSvg(spec);
        }
    };

    const init = function () {
    
        createSvgs();
    }();

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };

    const getSvgCopy = function (name) {
    
        return svgs[name].cloneNode(true);
    };
    
    return Object.freeze(
        {
            setMediator,
            getSvgCopy,
        }
    );
};

export default SvgRepository;