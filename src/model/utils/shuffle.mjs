const shuffle = function(array) {
    array.sort(() => Math.random() - 0.5);
};

export default shuffle;