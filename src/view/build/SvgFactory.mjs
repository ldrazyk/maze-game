import svgSpec from "../data/svgSpec.mjs";

const SvgFactory = function () {
    
    const svgs = {};
    let patternIdNumber = 1;

    const createSvgs = function () {

        const createSvg = function ({ name, spec }) {

            const xmlns="http://www.w3.org/2000/svg";
            const elements = {};
        
            const createSvgElement = function () {
            
                const svg = document.createElementNS(xmlns, 'svg');
        
                svg.classList = name;
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

            svgs[name] = createSvg({ name, spec });
        }
    };

    const init = function () {
    
        createSvgs();
    }();

    const getSvgCopy = function (name) {

        const changePatternId = function (svg) {
        
            const pattern = svg.querySelector('pattern');
            if (pattern) {
                
                const newId = pattern.id + '-' + patternIdNumber;
                patternIdNumber += 1;
                pattern.id = newId;
                
                const patternField = svg.querySelector('.pattern-field');
                // console.log(patternField);
                patternField.setAttribute('fill', `url(#${newId})`);
            }
        };

        const svg = svgs[name].cloneNode(true)
        changePatternId(svg);
        
        return svg;
    };
    
    return Object.freeze(
        {
            getSvgCopy,
        }
    );
};

export default SvgFactory;