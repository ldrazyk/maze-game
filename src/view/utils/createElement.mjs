const createElement = function ({ type, classList=false, id=false, textContent=false, value=false, order=false, parent=false }) {

    const element = document.createElement(type);

    if (classList) {
        element.classList = classList;
    }

    if (id) {
        element.id = id;
    }

    if (textContent) {
        element.textContent = textContent;
    }

    if (value) {
        element.value = value;
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