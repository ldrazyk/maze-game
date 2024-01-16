const updateClass = function (element, className) {

    const oldClassName = element.className;

    if (className != oldClassName) {
        element.className = className;
    }
};

export default updateClass;