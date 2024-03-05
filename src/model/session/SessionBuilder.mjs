import Session from './Session.mjs';
import Players from './Players.mjs';
import Scores from './Scores.mjs';
import BoardRepository from './BoardRepository.mjs';
import boardsSpec from '../data/boardsSpec.mjs';

const SessionBuilder = function () {
    
    let session;

    const reset = function () {
        session = Session()
    };

    const setBoardRepository = function () {
    
        const repository = BoardRepository(boardsSpec);
        session.setBoardRepository(repository);
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
            reset,
            setBoardRepository,
            setPlayers,
            setScores,
            getResult,
        }
    );
};

export default SessionBuilder;