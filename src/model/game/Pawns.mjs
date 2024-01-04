import ArrayIterator from "../utils/ArrayIterator.mjs";
import Pawn from "./Pawn.mjs";

const Pawns = function ({ players, pawnsSpec }) {
    let pawnsArray1d, pawnsPlayersArrays, pawnsDictionary; // [], [[], []], {}
    let activePawns, selectedPosition, selected;

    const init = function () {
        
        // spec = {players: [Player1, Player2], 
        // pawnsSpec: [ [{type: 'lion', amount: 1}, {type: 'snake', amount: 1}], [{type: lion, amount: 1}, {..}] ] }
        pawnsArray1d = [];
        pawnsPlayersArrays = [];
        pawnsDictionary = {};

        for (let n = 0; n < 2; n += 1) {
            pawnsPlayersArrays.push([]);
            const thisPlayer = players.getPlayer(n + 1);
            const thisPawnsSpec = pawnsSpec[n];
            let pawnNumber = 1;
            for (let typeNumber = 0; typeNumber < thisPawnsSpec.length; typeNumber += 1) {
                const thisTypeSpec = thisPawnsSpec[typeNumber];
                for (let count = 0; count < thisTypeSpec.amount; count += 1) {
                    const pawnId = 'p_' + (n + 1) + '_' + pawnNumber;
                    pawnNumber += 1;
                    const pawn = Pawn({player: thisPlayer, id: pawnId, type: thisTypeSpec.type});
                    pawnsArray1d.push(pawn);
                    pawnsPlayersArrays[n].push(pawn);
                    pawnsDictionary[pawnId] = pawn;
                }
            }
        }
        activePawns = false;
        selectedPosition = false;
        selected = false;
    }();

    const setActivePawns = function (number) {
        console.log('Active pawns: ');  // test
        activePawns = [];
        for (const pawn of pawnsPlayersArrays[number - 1]) {
            if (pawn.isAlive()) {
                activePawns.push(pawn);
                pawn.setActive(true);
                console.log('\t' + pawn.toString());    // test
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

    const getIterator = function (spec) {
        let playerNumber, active, iterator;
        if (spec) ({playerNumber, active} = spec);
        if (playerNumber) {
            iterator = ArrayIterator(pawnsPlayersArrays[playerNumber - 1]);
        } else if (active) {
            iterator = ArrayIterator(activePawns);
        } else {
            iterator = ArrayIterator(pawnsArray1d);  
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

    return Object.freeze(
        {
            setActivePawns: setActivePawns,
            hasNext: hasNext,
            selectNext: selectNext,
            select: select,

            getIterator: getIterator,
            getPawn: getPawn,
            getSelected: getSelected,
            getActiveAmount: getActiveAmount,
        }
    );
};

export default Pawns;