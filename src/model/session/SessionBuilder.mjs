import Session from './Session.mjs';
import Players from './Players.mjs';
import Scores from '../game/Scores.mjs'

const SessionBuilder = function () {
    let session;

    const reset = function () {
        session = Session()
    };

    const setPlayers = function (playersSpec) {
        
        const players = Players(playersSpec);
        session.setPlayers(players);
    };

    const setScores = function () {

        const scores = Scores();
        session.setScores(scores);
    };

    const getResult = function () {
        
        return session;
    };
    
    return Object.freeze(
        {
            reset: reset,
            setPlayers: setPlayers,
            setScores: setScores,
            getResult: getResult,
        }
    );
};

export default SessionBuilder;