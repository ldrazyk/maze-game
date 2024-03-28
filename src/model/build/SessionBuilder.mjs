import Session from '../session/Session.mjs';
import SessionState from '../session/SessionState.mjs';
import Players from '../session/Players.mjs';
import Scores from '../session/Scores.mjs';
import BoardFactory from './BoardFactory.mjs';
import BoardDummyRepository from './BoardDummyRepository.mjs';
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

    const setBoardFactory = function () {
    
        const factory = BoardFactory(boardsSpec);

        mediators.forEach(mediator => {
            mediator.setBoardFactory(factory);
        });
    };

    const setBoardDummyRepository = function () {
    
        const repository = BoardDummyRepository();

        mediators.forEach(mediator => {
            mediator.setBoardDummyRepository(repository);
        });
        repository.setMediator(session);
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
            setBoardFactory,
            setBoardDummyRepository,
            setPlayers,
            setScores,
            getResult,
        }
    );
};

export default SessionBuilder;