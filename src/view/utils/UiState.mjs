const UiState = function () {

    const state = {};
    
    const add = function ({ name, value=false, onChange=(value) => {} }) {
    
        state[name] = {
            value,
            onChange,
        }
    };

    const get = function (name) {
    
        return state[name].value;
    };

    const update = function (name, value) {
    
        if (state[name].value != value) {
            state[name].value = value;
            state[name].onChange(value);
        };
    };
    
    return Object.freeze(
        {
            add,
            get,
            update,
        }
    );
};

export default UiState;