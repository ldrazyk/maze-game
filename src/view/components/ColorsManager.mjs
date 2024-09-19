const ColorsManager = function () {
    
    const props = {
        id: 'colorsManager',
        colors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'magenta'],
        index1: false,
        index2: false,
        root: document.querySelector(':root')
    };
    let mediator;


    const init = function () {

        const initIndexes = function () {

            const initIndex = function (playerNumber) {
            
                const getInitialColor = function (playerNumber) {
                
                    return getComputedStyle(props.root).getPropertyValue('--color-player' + playerNumber);
                };
    
                const findIndex = function (color) {
                
                    return props.colors.indexOf(color);
                };
    
                const color = getInitialColor(playerNumber);
                const index = findIndex(color);
                props['index' + playerNumber] = index;
            };


            [1, 2].forEach(number => {
                initIndex(number);
            });
        };

        initIndexes();
    }();

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };

    const changeColor = function ({ number, direction=1 }) {


        const getIndex = function (number) {
        
            return props['index' + number];
        };

        const getOtherNumber = function () {
        
            if (number == 1) {
                return 2;
            } else {
                return 1;
            }
        };
        
        const getNewIndex = function (index, otherIndex) {
        
            const changeToNext = function () {
            
                index += direction;
            };

            const checkEqualsOther = function () {
            
                if (index == otherIndex) {
                    changeToNext();
                }
            };

            const checkIndexNotInColors = function () {
            
                if (index >= props.colors.length) {
                    index = 0;
                    return true;
                } else if (index < 0) {
                    index = props.colors.length - 1;
                    return true;
                } else {
                    return false;
                }
            };
            
            changeToNext();
            checkEqualsOther();
            if (checkIndexNotInColors()) {
                checkEqualsOther();
            }

            return index;
        };

        const setNewIndex = function (index) {
            
            props['index' + number] = index;
        };

        const changeColor = function (index) {

            const changeStyle = function (color, type) {

                const name = '--' + type + '-player' + number;
                const value = 'var(--' + color + '-' + type + ')';
            
                props.root.style.setProperty(name, value);
            };
            
            const color = props.colors[index];
            
            ['dark', 'light'].forEach(type => {

                changeStyle(color, type);
            });
        };
        
        const index = getNewIndex( getIndex(number), getIndex( getOtherNumber() ) );
        setNewIndex(index);
        changeColor(index);
    };


    const getId = function () {
    
        return props.id;
    };
    
    
    return Object.freeze(
        {
            setMediator,

            changeColor,
            getId,
        }
    );
};

export default ColorsManager;