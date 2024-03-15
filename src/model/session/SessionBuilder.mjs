import Session from './Session.mjs';
import SessionState from './SessionState.mjs';
import Players from './Players.mjs';
import Scores from './Scores.mjs';
import BoardRepository from './BoardRepository.mjs';
import boardsSpec from '../data/boardsSpec.mjs';

const SessionBuilder = function () {
    
    const mediators = [];
    let session;

    const reset = function () {

        session = Session();
        mediators.push(session);
    };

    const setState = function () {

        const state = SessionState();
        mediators.push(state);

        session.setState(state);
        state.setSession(session);
    };

    const setBoardRepository = function () {
    
        const repository = BoardRepository(boardsSpec);

        mediators.forEach(mediator => {
            mediator.setBoardRepository(repository);
        });
    };

    const setPlayers = function (playersSpec) {
        
        const players = Players(playersSpec);

        mediators.forEach(mediator => {
            mediator.setPlayers(players);
        });
    };

    const setScores = function () {

        const scores = Scores();

        mediators.forEach(mediator => {
            mediator.setScores(scores);
        });
    };

    const getResult = function () {
        
        return session;
    };
    
    return Object.freeze(
        {
            reset,
            setState,
            setBoardRepository,
            setPlayers,
            setScores,
            getResult,
        }
    );
};

export default SessionBuilder;