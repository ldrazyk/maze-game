import App from "./App.mjs";

const runApp = function () {

    let app;

    const createApp = function () {
    
        app = App();
    };

    const createSession = function () {
    
        const playersSpec = [
            {name: 'Walter White', color: 'blue', number: 1}, 
            {name: 'Jessy Pinkman', color: 'pink', number: 2}
        ];
    
        app.createSession(playersSpec);
    };

    const createGame = function () {
    
        const boardId = 'board0702';
        // const boardId = 'board0900';
        // const boardId = 'board1100';
    
        const pawnsSpec1 = [
            {type: 'lion', amount: 1}, 
            {type: 'rooster', amount: 1}, 
            {type: 'snake', amount: 1}
        ];
    
        const pawnsSpec = [pawnsSpec1, pawnsSpec1];
    
        app.createGame({ boardId, pawnsSpec });
    };

    createApp();
    createSession();
    createGame();
}();
