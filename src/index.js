import App from "./App.mjs";

const runApp = function (spec) {

    const { playersSpec, boardSpec, pawnsSpec } = spec;

    const app = App();
    app.createSession(playersSpec);
    app.createGame({ boardSpec, pawnsSpec });
};

const pawnsSpec1 = [
    {type: 'lion', amount: 1}, 
    {type: 'rooster', amount: 1}, 
    {type: 'snake', amount: 1}
];

const appStartSpec = {

    playersSpec: [
        {name: 'Player 1', color: 'blue', number: 1}, 
        {name: 'Player 2', color: 'pink', number: 2}
    ],
    boardSpec: {
        id : false,
        sizes: [7],
    },
    pawnsSpec: [
        pawnsSpec1,
        pawnsSpec1
    ]
};

runApp(appStartSpec);
