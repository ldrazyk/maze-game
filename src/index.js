import App from "./App.mjs";

const runApp = function () {

    let app;

    const createApp = function () {
    
        app = App();
    };

    const createSession = function () {
    
        const playersSpec = [
            {name: 'Player 1', color: 'blue', number: 1}, 
            {name: 'Player 2', color: 'pink', number: 2}
        ];
    
        app.createSession(playersSpec);
    };

    const createGame = function () {
    
        // const boardId = 'board0701';
        // const boardId = false;
        const boardId = 'board0900';
        // const boardId = 'board1100';

        const boardSpec = {
            // id: 'board0702',
            sizes: [6],
        }
    
        const pawnsSpec1 = [
            {type: 'lion', amount: 1}, 
            {type: 'rooster', amount: 1}, 
            {type: 'snake', amount: 1}
        ];
    
        const pawnsSpec = [pawnsSpec1, pawnsSpec1];
    
        app.createGame({ boardSpec, pawnsSpec });
    };

    createApp();
    createSession();
    createGame();
}();
