const Subject = function() {
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

    const notify = function(code=false) {
        for (let observer of observers) {
            observer.update(code);
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