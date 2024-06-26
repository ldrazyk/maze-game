const boardSpec = {
    // 6: {
    //     board0600: {
    //         name: "Board 0600 - Empty",
    //         matrix: [
    //             [1, 1, 1, 2, 1, 1],
    //             [1, 0, 0, 0, 0, 1],
    //             [1, 0, 0, 0, 0, 1],
    //             [1, 0, 0, 0, 0, 1],
    //             [1, 0, 0, 0, 0, 1],
    //             [1, 1, 3, 1, 1, 1]
    //         ]
    //     },
    // },
    7: {
        b0700: {
            name: "Board 0700 - Empty",
            matrix: [
                [1, 1, 1, 2, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 3, 1, 1, 1]
            ]
        },
        b0701: {
            name: "Board 0701 - Dots",
            matrix: [
                [1, 1, 1, 2, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 3, 1, 1, 1]
            ]
        },
        b0702: {
            name: "Board 0702 - Cross",
            matrix: [
                [1, 1, 1, 2, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 1],
                [1, 0, 1, 1, 1, 0, 1],
                [1, 0, 0, 1, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 3, 1, 1, 1]
            ]
        },
        b0703: {
            name: "Board 0703",
            matrix: [
                [1, 1, 1, 2, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 0, 0, 1, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 3, 1, 1, 1]
            ]
        },
        b0704: {
            name: "Board 0704",
            matrix: [
                [1, 1, 1, 2, 1, 1, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 1, 1],
                [1, 1, 1, 3, 1, 1, 1]
            ]
        },
        b0705: {
            name: "Board 0700 - Central Dot",
            matrix: [
                [1, 1, 1, 2, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 3, 1, 1, 1]
            ]
        },
    },
    9: {
        // b0900: {
        //     name: "Board 0900 - Empty",
        //     matrix: [
        //         [1, 1, 1, 1, 2, 1, 1, 1, 1],
        //         [1, 0, 0, 0, 0, 0, 0, 0, 1],
        //         [1, 0, 0, 0, 0, 0, 0, 0, 1],
        //         [1, 0, 0, 0, 0, 0, 0, 0, 1],
        //         [1, 0, 0, 0, 0, 0, 0, 0, 1],
        //         [1, 0, 0, 0, 0, 0, 0, 0, 1],
        //         [1, 0, 0, 0, 0, 0, 0, 0, 1],
        //         [1, 0, 0, 0, 0, 0, 0, 0, 1],
        //         [1, 1, 1, 1, 3, 1, 1, 1, 1]
        //     ]
        // },
        b0901: {
            name: "Board 0901",
            matrix: [
                [1, 1, 1, 1, 2, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 0, 0, 1, 0, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 0, 1, 1, 1, 0, 0, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 1],
                [1, 0, 1, 0, 0, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 3, 1, 1, 1, 1]
            ]
        },
        b0902: {
            name: "Board 0902",
            matrix: [
                [1, 1, 1, 1, 2, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 3, 1, 1, 1, 1]
            ]
        },
        b0903: {
            name: "Board 0903",
            matrix: [
                [1, 1, 1, 1, 2, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 3, 1, 1, 1, 1]
            ]
        },
    },
    11: {

        // b1100: {
        //     name: "Board 1100 - Empty",
        //     matrix: [
        //         [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
        //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        //         [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        //         [1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1]
        //     ]
        // },
        b1101: {
            name: "Board 1101",
            matrix: [
                [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1]
            ]
        },
        b1102: {
            name: "Board 1102",
            matrix: [
                [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
                [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1]
            ]
        },
        b1103: {
            name: "Board 1103 - Crosses",
            matrix: [
                [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
                [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
                [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
                [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
                [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1]
            ]
        },
        b1104: {
            name: "Board 1104 - Dots",
            matrix: [
                [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1]
            ]
        },
    },
};

export default boardSpec;