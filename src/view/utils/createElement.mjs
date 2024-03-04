const createElement = function ({ type, classList=false, id=false, datasets=false, textContent=false, value=false, size=false, order=false, parent=false }) {

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
        element.style.order = order
    }
    
    if (parent) {
        parent.appendChild(element);
    }

    return element;
};

export default createElement;