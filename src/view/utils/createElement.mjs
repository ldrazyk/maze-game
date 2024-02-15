const createElement = function ({ type, classList, id=false, textContent=false, value=false, parent=false }) {

    const element = document.createElement(type);
    element.classList = classList;
    if (id) {
        element.id = id;
    }
    if (textContent) {
        element.textContent = textContent;
    }
    if (value) {
        element.value = value;
    }
    if (parent) {
        parent.appendChild(element);
    }

    return element;
};

export default createElement;