const ButtonComponent = function ({ id=false, textContent=false, onClick, svgName=false, factory }) {
    
    let elements;
    let activeState = false;

    const createElements = function () {

        let btnId = false;
        if (id) {
            btnId = 'btn-' + id;
        }

        const onClickIfActive = function () {
        
            if (activeState) {
                onClick();
            };
        };

        let spec = {
            main: {
                type: 'button',
                classList: id,
                id: btnId, 
                onClick: onClickIfActive,
            },
            container: {
                type: 'div', 
                classList: 'container',
                textContent: textContent,
                parentKey: 'main',
            },
        };

        if (svgName) {

            const svgElementsSpec = {
                svg: {
                    type: 'svg',
                    name: svgName,
                    parentKey: 'container',
                }
            };

            spec = {...spec, ...svgElementsSpec};
        }

        elements = factory.createElements(spec);
    };

    const init = function() {
        
        createElements();
    }();

    const setActive = function (active=true) {

        activeState = active;

        if (active) {

            elements.main.classList.add('active');
        } else {

            elements.main.classList.remove('active');
        }
    };

    const getMain = function () {
    
        return elements.main;
    };

    return Object.freeze(
        {
            setActive,
            getMain,
        }
    );
};

export default ButtonComponent;