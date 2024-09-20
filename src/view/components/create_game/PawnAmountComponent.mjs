const PawnAmountComponent = function ({ type }) {
    
    const id = "pawns-amount-component";
    let amount;

    const getType = function () {
    
        return type;
    };

    const getAmount = function () {
    
        return amount;
    };
    
    return Object.freeze(
        {
            getType,
            getAmount,
        }
    );
};

export default PawnAmountComponent;