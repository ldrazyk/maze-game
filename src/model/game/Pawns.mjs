import ArrayIterator from "../utils/ArrayIterator.mjs";
import Pawn from "./Pawn.mjs";

const Pawns = function (pawnsSpec) {
    let pawnsArray, pawnsPlayersArrays, pawnsDictionary; // [], [[], []], {}
    let activePawns, selectedPosition, selected;

    let game;

    const setGame = function (mediator) {
        game = mediator;
    };

    const createPawns = function () {
        // pawnsSpec: [ [{type: 'lion', amount: 1}, {type: 'snake', amount: 1}], [{type: lion, amount: 1}, {..}] ] }
        pawnsArray = [];
        pawnsPlayersArrays = [];
        pawnsDictionary = {};

        for (let n = 0; n < pawnsSpec.length; n += 1) {
            pawnsPlayersArrays.push([]);
            const thisPlayer = game.getPlayer(n + 1);
            const thisPawnsSpec = pawnsSpec[n];
            let pawnNumber = 1;
            for (let typeNumber = 0; typeNumber < thisPawnsSpec.length; typeNumber += 1) {
                const thisTypeSpec = thisPawnsSpec[typeNumber];
                for (let count = 0; count < thisTypeSpec.amount; count += 1) {
                    const pawnId = 'p_' + (n + 1) + '_' + pawnNumber;
                    pawnNumber += 1;
                    const pawn = Pawn({player: thisPlayer, id: pawnId, type: thisTypeSpec.type});
                    pawn.setGame(game);
                    pawnsArray.push(pawn);
                    pawnsPlayersArrays[n].push(pawn);
                    pawnsDictionary[pawnId] = pawn;
                }
            }
        }
    };

    const disactivatePawns = function () {

        if (activePawns) {
            activePawns.forEach(pawn => {
                pawn.setActive(false);
            })
        }
    };

    const reset = function () {
        
        disactivatePawns();
        activePawns = false;
        selectedPosition = false;
        selected = false;
    };

    const init = function () {
        
        createPawns();
        reset();
    };

    const setActivePawns = function (number) {
        
        activePawns = [];
        for (const pawn of pawnsPlayersArrays[number - 1]) {
            if (pawn.isAlive()) {
                activePawns.push(pawn);
                pawn.setActive(true);
            }
        }
        activePawns.sort(function(a, b) {return a.getOrder() - b.getOrder()});
        selectedPosition = -1;
    };

    const hasNext = function () {
        for (const pawn of activePawns) {
            if (pawn.isActive()) {
                return true;
            }
        }
        return false;
    };

    const selectNext = function() {
        // działa tylko jak iterator (z if (.hasNext()) )

        const changeSelectedPosition = function() {
            selectedPosition += 1;
            if (selectedPosition >= activePawns.length) {
                selectedPosition = 0;
            }
        };

        if (hasNext()) {
            changeSelectedPosition();
            selected = activePawns[selectedPosition];
            if (selected.isActive()) {
                console.log('>>> pawns.selectNext(): id = ' + selected.getId());
            } else {
                selectNext();
            }
            return true;
        } else {
            selected = false;
            return false;
        }
    };

    const select = function(id) {
        const newSelected = pawnsDictionary[id];
        if (newSelected.isActive()) {
            selected = newSelected;
            console.log('>>> pawns.select(): id = ' + selected.getId());
            return true;
        } else {
            return false;
        }
    };

    const updateReaches = function() {

        activePawns.forEach(pawn => {
            pawn.updateReach();
        });
    };

    const getIterator = function (spec) {
        let playerNumber, active, iterator;
        if (spec) ({playerNumber, active} = spec);
        if (playerNumber) {
            iterator = ArrayIterator(pawnsPlayersArrays[playerNumber - 1]);
        } else if (active) {
            iterator = ArrayIterator(activePawns);
        } else {
            iterator = ArrayIterator(pawnsArray);  
        }
        return iterator;
    };

    const getPawn = function(id) {
        return pawnsDictionary[id];
    };

    const getSelected = function() {
        return selected;
    };

    const getActiveAmount = function() {
        return activePawns.length;
    };

    const canSelectNext = function () {
        
        return hasNext();
    };

    return Object.freeze(
        {
            setGame: setGame,
            init: init,

            reset: reset,
            setActivePawns: setActivePawns,
            hasNext: hasNext,
            selectNext: selectNext,
            select: select,
            updateReaches: updateReaches,

            getIterator: getIterator,
            getPawn: getPawn,
            getSelected: getSelected,
            getActiveAmount: getActiveAmount,

            canSelectNext: canSelectNext,
        }
    );
};

export default Pawns;