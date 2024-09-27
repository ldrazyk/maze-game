import ArraySelector from "./ArraySelector.mjs";

const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
const selector = ArraySelector(planets);

const logSelected = function () {

    console.log(selector.getSelected());
};

const logIndex = function () {

    console.log(selector.getIndex());
};

const selectNext = function (direction) {

    selector.selectNext(direction);
    logSelected();
};

const selectNextForEach = function (directions) {

    console.log('\n');

    logSelected();

    console.log(`Directions : ${directions}`);

    directions.forEach(direction => {
        selectNext(direction);
    });
};

const selectIndex = function (index) {

    selector.selectIndex(index);

    console.log(`\nselectIndex(${index})`);
    logSelected()
};

const selectItem = function (item) {

    selector.selectItem(item);

    console.log(`\nselectItem(${item})`);
    logSelected()
};

const test = function () {
    
    console.log('\nTesting ArraySelector');
    const directionsPlus1 = [1, 1, 1, 1, 1, 1, 1, 1];
    const directionsMinus1 = [-1, -1, -1, -1, -1, -1, -1, -1];
    
    
    logIndex();
    selectNextForEach(directionsPlus1);
    selectIndex(2);
    selectNextForEach(directionsMinus1);
    selectItem('Mars');
    selectItem('Pluto');
    selectIndex(8);
    logIndex();
    selectIndex(-1);
    logIndex();

}();
