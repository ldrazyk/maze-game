const Subject = function(getObject=false) {
    const observers = [];

    const attach = function (observer) {
        observers.push(observer);
    };

    const detach = function (observer) {
        const index = observers.indexOf(observer);
        if (index != -1) {
            observers.splice(index, 1);
        } else {}
    };

    const notify = function(code=false, object=false) {

        if (!object && getObject) {
            object = getObject();
        }

        for (let observer of observers) {
            observer.update({ code, object });
        }
    };

    return Object.freeze(
        {
            attach: attach,
            detach: detach,
            notify: notify,
        }
    );
};

export default Subject;