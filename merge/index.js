// Mon Mar  4 17:48:37 2024

// CONTROLLER LAYER

const Controller = function(model) {
    let self, view;

    // init

    const setSelf = function (controller) {
        self = controller;
    };

    const setView = function (newView) {
        if (view) {
            model.detach(view);
        }
        view = newView;
        model.attach(view);
        view.setControler(self);
    }

    // settings commands

    const createSession = function(spec) {
        model.createSession(spec);
    };

    const createGame = function(spec) {
        model.createGame(spec);
    };

    const setPlayerName = function (spec) {

        model.setPlayerName(spec);
    };

    // buttons game commands

    const nextTurn = function() {
        console.log('\n>> controller.nextTurn()');  // test
        model.nextTurn();
    };

    const selectNext = function() {
        console.log('\n>> controller.selectNext()');
        model.selectNext();
    };

    const hold = function() {
        model.hold();
    };

    const moveUp = function() {
        model.moveUp();
    };

    const moveDown = function() {
        model.moveDown();
    };

    const moveLeft = function() {
        model.moveLeft();
    };

    const moveRight = function() {
        model.moveRight();
    };

    // mouse game commands

    const select = function(pawnId) {
        model.select(pawnId);
    };

    const move = function(fieldId) {
        model.move(fieldId);
    };

    const click = function (fieldId) {
        console.log('\n>> controller.click( ' + fieldId + ' )');
        model.click(fieldId);
    };

    // history commands

    const undo = function() {
        console.log('\n>> controller.undo()');
        model.undo();
    };

    const redo = function() {
        console.log('\n>> controller.redo()');
        model.redo();
    };

    const addKeydownEvents = function() {
        document.addEventListener('keydown', function(event) {
            switch (event.code) {
                case 'KeyS':
                    selectNext();
                    break;
                case 'Enter':
                    hold();
                    break;
                case 'ArrowUp':
                    moveUp();
                    break;
                case 'ArrowDown':
                    moveDown();
                    break;
                case 'ArrowLeft':
                    moveLeft();
                    break;
                case 'ArrowRight':
                    moveRight();
                    break;
                case 'KeyZ':
                    undo();
                    break;
                case 'KeyY':
                    redo();
                    break;
                case 'KeyT':
                    nextTurn();
                    break;
            }
        });
    }();

    return Object.freeze(
        {
            setSelf,
            setView,

            createSession,
            createGame,
            setPlayerName,

            nextTurn,
            selectNext,
            hold,
            moveUp,
            moveDown,
            moveLeft,
            moveRight,

            select,
            move,
            click,

            undo,
            redo,
        }
    );
};


// VIEW LAYER

const svgSpec = {
    "lion": {
        "name": "Lion Pawn",
        "viewBox": "0 0 1067 1067",
        "elements": {
            "normal": {
                "type": "g",
                "classList": "normal",
                "parent": "svg"
            },
            "wake": {
                "type": "g",
                "classList": "wake",
                "parent": "svg"
            },
            "mane": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M383.798,115.983c86.587,-72.285 212.484,-72.285 299.071,0c61.727,51.532 133.829,111.726 198.515,165.728c47.849,39.946 77.727,97.377 82.971,159.489c5.244,62.111 -14.581,123.738 -55.056,171.142c-156.274,183.028 -375.966,440.33 -375.966,440.33c0,0 -219.691,-257.302 -375.965,-440.33c-40.475,-47.404 -60.3,-109.031 -55.056,-171.142c5.244,-62.112 35.121,-119.543 82.971,-159.489c64.686,-54.002 136.788,-114.196 198.515,-165.728Z"
                },
                "parent": "normal"
            },
            "head": {
                "type": "path",
                "classList": "light",
                "attributes": {
                    "d": "M319.575,338.715l427.517,0c-0,0 -70.936,365.929 -91.354,471.257c-3.157,16.287 -17.418,28.049 -34.008,28.049l-176.793,-0c-16.59,-0 -30.852,-11.762 -34.009,-28.049c-20.418,-105.328 -91.353,-471.257 -91.353,-471.257Z"
                },
                "parent": "normal"
            },
            "ear-r": {
                "type": "path",
                "classList": "light",
                "attributes": {
                    "d": "M253.854,376.258c-20.839,-20.586 -14.139,-61.207 14.952,-90.655c29.091,-29.448 69.627,-36.642 90.466,-16.056c-0,0 73.582,100.052 73.582,100.052l-78.059,79.016c0,-0 -100.941,-72.357 -100.941,-72.357Z"
                },
                "parent": "normal"
            },
            "ear-l": {
                "type": "path",
                "classList": "light",
                "attributes": {
                    "d": "M812.813,376.258c20.838,-20.586 14.139,-61.207 -14.952,-90.655c-29.091,-29.448 -69.627,-36.642 -90.466,-16.056c-0,0 -73.582,100.052 -73.582,100.052l78.058,79.016c0,-0 100.942,-72.357 100.942,-72.357Z"
                },
                "parent": "normal"
            },
            "eye-r": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M401.971,450.521l123.744,-0l-61.872,61.872l-61.872,-61.872Z"
                },
                "parent": "wake"
            },
            "eye-l": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M664.695,450.521l-123.743,-0l61.872,61.872l61.871,-61.872Z"
                },
                "parent": "wake"
            }
        }
    },
    "rooster": {
        "name": "Rooster Pawn",
        "viewBox": "0 0 1067 1067",
        "elements": {
            "normal": {
                "type": "g",
                "classList": "normal",
                "parent": "svg"
            },
            "wake": {
                "type": "g",
                "classList": "wake",
                "parent": "svg"
            },
            "comb": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M724.976,268.235l148.796,-148.796l98.903,197.805l-264.646,264.646l-171.176,-48.557l-418.345,0l343.882,-343.882l56.895,113.79l148.796,-148.796l56.895,113.79Z"
                },
                "parent": "normal"
            },
            "dewlap-path": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M349.999,790.645l-200.591,-80.998l200.602,-201.314l-0.011,282.312Z"
                },
                "parent": "normal"
            },
            "dewlap-circle": {
                "type": "circle",
                "classList": "dark",
                "attributes": {
                    "cx": "233.344",
                    "cy": "790.645",
                    "r": "116.667"
                },
                "parent": "normal"
            },
            "head": {
                "type": "path",
                "classList": "light",
                "attributes": {
                    "d": "M933.333,884.375c0,0 -214.479,-324.388 -267.293,-404.265c-7.27,-10.996 -19.572,-17.61 -32.754,-17.61c-50.487,0 -178.838,0 -244.019,0c-21.686,-0 -39.267,17.58 -39.267,39.267c0,104.698 0,382.608 0,382.608l583.333,0Z"
                },
                "parent": "normal"
            },
            "eye": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M554.672,532.026l-164.991,-0l82.495,82.495l82.496,-82.495Z"
                },
                "parent": "wake"
            }
        }
    },
    "snake": {
        "name": "Snake Pawn",
        "viewBox": "0 0 1067 1067",
        "elements": {
            "normal": {
                "type": "g",
                "classList": "normal",
                "parent": "svg"
            },
            "wake": {
                "type": "g",
                "classList": "wake",
                "parent": "svg"
            },
            "shadow": {
                "type": "path",
                "classList": "light",
                "attributes": {
                    "d": "M721.719,470.387c0,-83.554 -67.835,-151.389 -151.389,-151.389l-302.778,0c-83.553,0 -151.389,67.835 -151.389,151.389l0,305.556c0,83.554 67.836,151.389 151.389,151.389l302.778,-0c83.554,-0 151.389,-67.835 151.389,-151.389l0,-305.556Z"
                },
                "parent": "normal"
            },
            "tail": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M627.795,239.832l-428.211,-0c-31.656,-0 -62.015,12.575 -84.399,34.959c-22.384,22.384 -34.959,52.743 -34.959,84.398c0,107.634 0,264.917 0,371.354c0,63.81 51.728,115.539 115.538,115.539l331.25,-0c26.729,-0 52.363,-10.618 71.263,-29.519c18.9,-18.9 29.518,-44.534 29.518,-71.263c0,-68.845 0,-159.327 0,-226.041c0,-24.197 -9.612,-47.402 -26.721,-64.511c-17.109,-17.11 -40.315,-26.722 -64.511,-26.722c-62.962,0 -145.04,0 -200.695,0c-34.565,0 -62.586,28.021 -62.586,62.587c-0,45.751 -0,106.698 -0,147.561c-0,5.596 3.724,10.508 9.112,12.018c5.389,1.509 11.123,-0.752 14.031,-5.533c27.61,-45.4 70.086,-115.244 70.086,-115.244l127.604,-0l-0,170.833l-272.222,0l-0,-319.444l405.902,-0l0,-140.972Z"
                },
                "parent": "normal"
            },
            "head": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M569.129,369.165l-0,-117.791c-0,-0 59.579,-40.537 83.812,-57.024c6.294,-4.282 14.306,-5.154 21.374,-2.326c32.687,13.08 127.398,50.98 165.577,66.258c9.807,3.924 16.237,13.423 16.237,23.986l-0,56.003c-0,10.563 -6.43,20.061 -16.237,23.986c-38.179,15.278 -132.89,53.177 -165.577,66.257c-7.068,2.829 -15.08,1.957 -21.374,-2.326c-24.233,-16.487 -83.812,-57.023 -83.812,-57.023Z"
                },
                "parent": "normal"
            },
            "tongue": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M1017.24,205.02c1.462,-3.042 0.676,-6.689 -1.909,-8.86c-2.584,-2.171 -6.312,-2.315 -9.056,-0.35c-28.583,20.463 -77.541,55.513 -113.77,81.449c-10.648,7.623 -16.965,19.915 -16.965,33.01c-0,13.096 6.317,25.388 16.965,33.011c36.229,25.936 85.187,60.986 113.77,81.449c2.744,1.965 6.472,1.82 9.056,-0.351c2.585,-2.171 3.371,-5.817 1.909,-8.86c-18.377,-38.262 -50.55,-105.249 -50.55,-105.249c0,0 32.173,-66.987 50.55,-105.249Z"
                },
                "parent": "wake"
            }
        }
    },
    "flag": {
        "name": "Flag Pawn",
        "viewBox": "0 0 1067 1067",
        "elements": {
            "stick": {
                "type": "rect",
                "classList": "dark",
                "attributes": {
                    "x": "195.833",
                    "y": "220.833",
                    "width": "66.667",
                    "height": "741.667"
                },
                "parent": "svg"
            },
            "flag": {
                "type": "path",
                "classList": "light",
                "attributes": {
                    "d": "M262.5,220.833l625,208.334l-625,208.333l0,-416.667Z"
                },
                "parent": "svg"
            }
        }
    },
    "active": {
        "name": "Active Highlight",
        "viewBox": "0 0 256 256",
        "elements": {
            "defs": {
                "type": "defs",
                "parent": "svg"
            },
            "active-pattern": {
                "type": "pattern",
                "hasId": "true",
                "attributes": {
                    "width": "16",
                    "height": "16",
                    "patternUnits": "userSpaceOnUse"
                },
                "parent": "defs"
            },
            "square": {
                "type": "rect",
                "classList": "light",
                "attributes": {
                    "x": "8",
                    "y": "8",
                    "width": "8",
                    "height": "8"
                },
                "parent": "active-pattern"
            },
            "pattern-field": {
                "type": "rect",
                "classList": "pattern-field",
                "attributes": {
                    "width": "100%",
                    "height": "100%",
                    "fill": "url(#active-pattern)"
                },
                "parent": "svg"
            }
        }
    },
    "hover": {
        "name": "Hover Highlight",
        "viewBox": "0 0 256 256",
        "elements": {
            "defs": {
                "type": "defs",
                "parent": "svg"
            },
            "hover-pattern": {
                "type": "pattern",
                "hasId": "true",
                "attributes": {
                    "width": "16",
                    "height": "16",
                    "patternUnits": "userSpaceOnUse"
                },
                "parent": "defs"
            },
            "rectangle-1": {
                "type": "rect",
                "classList": "light",
                "attributes": {
                    "x": "0",
                    "y": "0",
                    "width": "8",
                    "height": "16"
                },
                "parent": "hover-pattern"
            },
            "rectangle-2": {
                "type": "rect",
                "classList": "light",
                "attributes": {
                    "x": "8",
                    "y": "0",
                    "width": "8",
                    "height": "8"
                },
                "parent": "hover-pattern"
            },
            "pattern-field": {
                "type": "rect",
                "classList": "pattern-field",
                "attributes": {
                    "width": "100%",
                    "height": "100%",
                    "fill": "url(#hover-pattern)"
                },
                "parent": "svg"
            }
        }
    },
    "reach": {
        "name": "Reach Highlight",
        "viewBox": "0 0 256 256",
        "elements": {
            "defs": {
                "type": "defs",
                "parent": "svg"
            },
            "reach-pattern": {
                "type": "pattern",
                "hasId": "true",
                "attributes": {
                    "width": "16",
                    "height": "256",
                    "patternUnits": "userSpaceOnUse"
                },
                "parent": "defs"
            },
            "stripe": {
                "type": "rect",
                "classList": "light",
                "attributes": {
                    "x": "0",
                    "y": "0",
                    "width": "8",
                    "height": "256"
                },
                "parent": "reach-pattern"
            },
            "pattern-field": {
                "type": "rect",
                "classList": "pattern-field",
                "attributes": {
                    "width": "100%",
                    "height": "100%",
                    "fill": "url(#reach-pattern)"
                },
                "parent": "svg"
            }
        }
    },
    "select": {
        "name": "Select Button",
        "viewBox": "0 0 1067 1067",
        "elements": {
            "corner-3": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M241.667,533.333l291.666,-291.666l-291.666,-0l-0,291.666Z"
                },
                "parent": "svg"
            },
            "corner-2": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M241.667,533.333l291.666,291.667l-291.666,0l-0,-291.667Z"
                },
                "parent": "svg"
            },
            "corner-1": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M533.333,825l291.667,-291.667l0,291.667l-291.667,0Z"
                },
                "parent": "svg"
            },
            "corner-0": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M533.333,241.667l291.667,291.666l0,-291.666l-291.667,-0Z"
                },
                "parent": "svg"
            }
        }
    },
    "move": {
        "name": "Move Button",
        "viewBox": "0 0 1067 1067",
        "elements": {
            "arrow": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M533.333,220.833l-312.5,625l312.5,-254.166l312.5,254.166l-312.5,-625Z"
                },
                "parent": "svg"
            }
        }
    },
    "turn": {
        "name": "Turn Button",
        "viewBox": "0 0 1067 1067",
        "elements": {
            "hourglass": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M241.667,241.667l583.333,-0l-583.333,583.333l583.333,0l-583.333,-583.333Z"
                },
                "parent": "svg"
            }
        }
    },
    "hold": {
        "name": "Hold Button",
        "viewBox": "0 0 1067 1067",
        "elements": {
            "star": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M216.608,216.608l316.725,186.83l316.725,-186.83l-186.829,316.725l186.829,316.725l-316.725,-186.829l-316.725,186.829l186.83,-316.725l-186.83,-316.725Z"
                },
                "parent": "svg"
            }
        }
    },
    "undo": {
        "name": "Undo Button",
        "viewBox": "0 0 1067 1067",
        "elements": {
            "bend": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M845.833,845.833l0,-255.217c0,-98.073 -38.959,-192.128 -108.306,-261.476c-69.348,-69.348 -163.404,-108.307 -261.476,-108.307l-255.218,0c0,0 134.089,59.101 254.152,112.02c112.7,49.673 185.432,161.214 185.432,284.375c-0,111.961 -0,228.605 -0,228.605l185.416,0Z"
                },
                "parent": "svg"
            }
        }
    },
    "select-negative": {
        "name": "Negative Select Button",
        "viewBox": "0 0 1067 1067",
        "elements": {
            "negative": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M1066.67,0l-1066.67,0l0,1066.67l1066.67,-0l-0,-1066.67Zm-533.334,825l291.667,-291.667l0,291.667l-291.667,0Zm-291.666,-291.667l291.666,291.667l-291.666,-0l-0,-583.333l291.666,-0l-291.666,291.666Zm291.666,-291.666l291.667,291.666l0,-291.666l-291.667,-0Z"
                },
                "parent": "svg"
            }
        }
    },
    "move-negative": {
        "name": "Negative Move Button",
        "viewBox": "0 0 1067 1067",
        "elements": {
            "negative": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M1066.67,0l-1066.67,0l0,1066.67l1066.67,-0l-0,-1066.67Zm-533.334,220.833l-312.5,625l312.5,-254.166l312.5,254.166l-312.5,-625Z"
                },
                "parent": "svg"
            }
        }
    },
    "turn-negative": {
        "name": "Negative Turn Button",
        "viewBox": "0 0 1067 1067",
        "elements": {
            "negative": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M1066.67,0l-1066.67,0l0,1066.67l1066.67,-0l-0,-1066.67Zm-533.334,533.333l291.667,291.667l-583.333,0l291.666,-291.667l-291.666,-291.666l583.333,-0l-291.667,291.666Z"
                },
                "parent": "svg"
            }
        }
    },
    "hold-negative": {
        "name": "Negative Hold Button",
        "viewBox": "0 0 1067 1067",
        "elements": {
            "negative": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M1066.67,-0l-1066.67,-0l0,1066.67l1066.67,-0l-0,-1066.67Zm-850.059,216.608l316.725,186.83l316.725,-186.83l-186.829,316.725l186.829,316.725l-316.725,-186.829l-316.725,186.829l186.83,-316.725l-186.83,-316.725Z"
                },
                "parent": "svg"
            }
        }
    },
    "undo-negative": {
        "name": "Negative Undo Button",
        "viewBox": "0 0 1067 1067",
        "elements": {
            "negative": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M1066.67,0l-1066.67,0l0,1066.67l1066.67,-0l-0,-1066.67Zm-220.834,845.833l0,-255.217c0,-98.073 -38.959,-192.128 -108.306,-261.476c-69.348,-69.348 -163.404,-108.307 -261.476,-108.307l-255.218,0c0,0 134.089,59.101 254.152,112.02c112.7,49.673 185.432,161.214 185.432,284.375c-0,111.961 -0,228.605 -0,228.605l185.416,0Z"
                },
                "parent": "svg"
            }
        }
    }
}


const SvgRepository = function () {

    const svgs = {};
    let patternIdNumber = 1;
    let mediator;

    const createSvgs = function () {

        const createSvg = function ({ name, spec }) {

            const xmlns="http://www.w3.org/2000/svg";
            const elements = {};

            const createSvgElement = function () {

                const svg = document.createElementNS(xmlns, 'svg');

                svg.classList = name;
                svg.setAttribute('viewBox', spec.viewBox);
                svg.setAttribute('style', "fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;");

                elements['svg'] = svg;
            };

            const createElement = function ( id, { type, classList='', attributes=false, parent }) {

                const element = document.createElementNS(xmlns, type);
                element.classList = classList;
                if (attributes) {

                    for (const [att, value] of Object.entries(attributes)) {
                        element.setAttribute(att, value);
                    }
                }
                elements[parent].appendChild(element);
                elements[id] = element;
            };

            const createElements = function () {

                for (const [id, elementSpec] of Object.entries(spec.elements)) {
                    createElement(id, elementSpec);
                }
            };

            createSvgElement();
            createElements();

            return elements['svg'];
        };

        for (const [name, spec] of Object.entries(svgSpec)) {

            svgs[name] = createSvg({ name, spec });
        }
    };

    const init = function () {

        createSvgs();
    }();

    const setMediator = function (newMediator) {

        mediator = newMediator;
    };

    const getSvgCopy = function (name) {

        const changePatternId = function (svg) {

            const pattern = svg.querySelector('pattern');
            if (pattern) {

                const newId = pattern.id + '-' + patternIdNumber;
                patternIdNumber += 1;
                pattern.id = newId;

                const patternField = svg.querySelector('.pattern-field');
                // console.log(patternField);
                patternField.setAttribute('fill', `url(#${newId})`);
            }
        };

        const svg = svgs[name].cloneNode(true)
        changePatternId(svg);

        return svg;
    };

    return Object.freeze(
        {
            setMediator,
            getSvgCopy,
        }
    );
};

const createElement = function ({ type, classList=false, id=false, datasets=false, textContent=false, value=false, size=false, order=false, parent=false }) {

    const element = document.createElement(type);

    if (classList) {
        element.classList = classList;
    }

    if (id) {
        element.id = id;
    }

    if (datasets) {
        for (const [key, value] of Object.entries(datasets)) {
            element.dataset[key] = value;
        }
    }

    if (textContent) {
        element.textContent = textContent;
    }

    if (value) {
        element.value = value;
    }

    if (size) {
        element.size = size;
    }

    if  (order) {
        element.style.order = order
    }

    if (parent) {
        parent.appendChild(element);
    }

    return element;
};


const InfoPanel = function ({ order=false }) {

    let mainElement;
    let screen;
    const id = 'info-panel';

    let mediator;


    const createElements = function () {

        const createMain = function () {

            mainElement = createElement(
                {
                    type: 'div',
                    classList: 'panel info-panel',
                    order: order,
                }
            );
        };

        const createScreen = function () {

            screen = createElement(
                {
                    type: 'div',
                    classList: 'screen',
                    parent: mainElement,
                }
            );
        };

        createMain();
        createScreen();
    };

    const init = function () {

        createElements();
    }();

    const setMediator = function (newMediator) {

        mediator = newMediator;
    };

    const update = function () {

        return ;
    };

    const getId = function () {

        return id;
    };

    const getMain = function () {

        return mainElement;
    };

    return Object.freeze(
        {
            setMediator,
            update,
            getId,
            getMain,
        }
    );
};


const PlayerPanel = function ({ playerNumber, order=false, gameState }) {

    let mainElement;
    const elements = {
        name: false,
        score: false,
        turnSection: false,
        turn: false,
        moves: false,
        holds: false,
    };

    const props = {};
    const state = {};

    let mediator;

    const updateState = function (name, value) {

        if (state[name] != value) {
            state[name] = value;
            return true;
        }
    };

    const initProps = function () {

        props.id = 'player-panel-' + playerNumber;
        props.player = gameState.getPlayer(playerNumber);
    };

    const initState = function () {

        state.name = props.player.getName();
        state.active = false;
        state.score = props.player.getScore();
        state.turn = 0;
        state.moves = [0, 0];
        state.holds = 0;
    };

    const createElements = function () {

        const createMain = function () {

            mainElement = createElement(
                {
                    type: 'div',
                    classList: 'panel player-panel player-' + playerNumber,
                    id: props.id,
                    order: order,
                }
            );
        };

        const createName = function () {

            elements.name = createElement(
                {
                    type: 'input',
                    classList: 'player-name',
                    value: state.name,
                    size: 1,
                    parent: mainElement,
                }
            );

            const updateName = function () {

                const updateNameState = function () {

                    const getNameFromInput = function () {

                        return elements.name.value;
                    };

                    return updateState('name', getNameFromInput());
                };


                const updateModelName = function () {

                    mediator.setPlayerName({ playerNumber: playerNumber, name: state.name }) ;
                };

                if (updateNameState()) updateModelName();
            };

            elements.name.addEventListener('blur', updateName);

        };

        const createScore = function () {

            elements.score = createElement(
                {
                    type: 'p',
                    classList: 'score',
                    textContent: 'Score: ' + state.score,
                    parent: mainElement,
                }
            );
        };

        const createTurnSection = function () {

            elements.turnSection = createElement(
                {
                    type: 'div',
                    classList: 'turn-section',
                    parent: mainElement,
                }
            );
        };

        const createTurn = function () {

            elements.turn = createElement(
                {
                    type: 'p',
                    classList: 'turn when-active',
                    textContent: 'Turn: ',
                    parent: mainElement,
                }
            );
        };

        const createMoves = function () {

            elements.moves = createElement(
                {
                    type: 'p',
                    classList: 'moves when-active',
                    textContent: 'Moves: ',
                    parent: mainElement,
                }
            );
        };

        const createHolds = function () {

            elements.holds = createElement(
                {
                    type: 'p',
                    classList: 'holds when-active',
                    textContent: 'Holds: ',
                    parent: mainElement,
                }
            );
        };

        createMain();
        createName();
        createScore();
        // createTurnSection();
        createTurn();
        createMoves();
        createHolds();
    };

    const init = function () {

        initProps();
        initState();
        createElements();
    }();

    const setMediator = function (newMediator) {

        mediator = newMediator;
    };

    const update = function ({ code, object }) {

        const updateActive = function () {

            const updateActiveState = function () {

                const getActive = function () {

                    return playerNumber == object.getActiveNumber();
                };

                return updateState('active', getActive());
            };

            const updateActiveDom = function () {

                if (state.active) {

                    mainElement.classList.add('active') ;
                } else {

                    mainElement.classList.remove('active') ;
                }
            };

            if ( updateActiveState() ) updateActiveDom();
        };

        const updateScore = function () {

            const updateScoreState = function () {

                const getScore = function () {

                    return props.player.getScore();
                };

                return updateState('score', getScore());
            };

            const updateScoreDom = function () {

                elements.score.textContent = 'Score: ' + state.score;
            };

            if ( updateScoreState() ) updateScoreDom();
        };

        const updateTurn = function () {

            const updateTurnState = function () {

                const getTurn = function () {

                    return object.getTurnNumber();
                };

                return updateState('turn', getTurn());
            };

            const updateTurnDom = function () {

                elements.turn.textContent = 'Turn: ' + state.turn;
            };

            if ( updateTurnState() ) updateTurnDom();
        };

        const updateMoves = function () {

            const updateMovesState = function () {

                const getMoves = function () {

                    return [
                        object.getMoves(),
                        object.getMovesAmount()
                    ];
                };

                return updateState('moves', getMoves());

            };

            const updateMovesDom = function () {

                elements.moves.textContent = 'Moves: ' + state.moves[0] + '/' + state.moves[1];
            };

            if (updateMovesState()) updateMovesDom();
        };

        const updateHolds = function () {

            const updateHoldsState = function () {

                const getHolds = function () {

                    return object.getMaxHolds() - object.getHolds();
                };

                return updateState('holds', getHolds());
            };

            const updateHoldsDom = function () {

                elements.holds.textContent = 'Holds: ' + state.holds;
            };

            if ( updateHoldsState() ) updateHoldsDom();
        };

        const exec = function () {

            if (state.turn == 0) {

                updateTurn();
            }

            if (state.turn > 0) {

                updateActive();
            }

            if (state.active) {

                updateTurn();
                updateMoves();
                updateHolds();
            }

            if (code == 'endGame') {

                updateScore();
            }
        };

        exec();
    };

    const getId = function () {

        return props.id;
    };

    const getMain = function () {

        return mainElement;
    };


    return Object.freeze(
        {
            setMediator,
            update,
            getId,
            getMain,
        }
    );
};


const ButtonComponent = function ({ id=false, text=false, onClick, order=false, svgNames, getSvgCopy }) {
    let mainElement;
    let containers = [];

    const createElements = function () {

        let btnId = false;
        if (id) {
            btnId = 'btn-' + id;
        }

        mainElement = createElement(
            {
                type: 'button',
                classList: id,
                id: btnId,
                text: text,
                order: order,
            }
        );

        containers[0] = createElement({ type: 'div', classList: 'container positive', parent: mainElement});
        containers[1] = createElement({ type: 'div', classList: 'container negative', parent: mainElement});

        const addSvgsToContainers = function () {

            [0, 1].forEach(n => {

                const svg = getSvgCopy(svgNames[n]);
                containers[n].appendChild(svg);
            });
        };

        addSvgsToContainers();
    };

    const init = function() {

        createElements();
    }();

    const setActive = function (active=true) {

        if (active) {

            mainElement.addEventListener('click', onClick);
            mainElement.classList.add('active');
        } else {

            mainElement.removeEventListener('click', onClick);
            mainElement.classList.remove('active');
        }
    };

    const getMain = function () {

        return mainElement;
    };

    return Object.freeze(
        {
            setActive,
            getMain,
        }
    );
};


const ControlPanelComponent = function({ order=false }) {

    let mainElement;
    const containers = {};
    const buttonComponents = {};
    const state = {};
    const id = 'control-panel';

    let mediator;

    const createElements = function () {

        const createMainElement = function () {

            mainElement = createElement(
                {
                    type: 'div',
                    classList: 'panel control-panel',
                    id: 'control-panel',
                    order: order,
                }
            );
        };

        const createWrapper = function () {

            containers['wrapper'] = createElement(
                {
                    type: 'div',
                    classList: 'wrapper',
                    parent: mainElement
                }
            );
        };

        const createDummies = function () {

            const createDummy = function (id) {

                containers[id] = createElement(
                    {
                        type: 'div',
                        classList: 'dummy ' + id,
                        parent: containers['wrapper'],
                    }
                );
            };

            ['dummy-1', 'dummy-2'].forEach(id => {
                createDummy(id);
            });
        };


        const createRows = function () {

            [1, 2, 3].forEach(number => {

                const rowContainer = createElement(
                    {
                        type: 'div',
                        classList: 'container row',
                        order: number,
                        parent: mainElement
                    }
                );

                containers[number] = rowContainer;
                mainElement.appendChild(rowContainer);
            });
        };

        const createButtons = function () {

            const getSvgCopy = function (name) {

                return mediator.getSvgCopy(name);
            };

            const svgMoveNames = ['move', 'move-negative'];
            const svgUndoNames = ['undo', 'undo-negative'];

            const buttonsSpec = [
                { id: 'select', svgNames: ['select', 'select-negative'], onClick: () => mediator.selectNext(), row: 1 },
                { id: 'up', svgNames: svgMoveNames, onClick: () => mediator.moveUp(), row: 1 },
                { id: 'turn', svgNames: ['turn', 'turn-negative'], onClick: () => mediator.nextTurn(), row: 1 },
                { id: 'left', svgNames: svgMoveNames, onClick: () => mediator.moveLeft(), row: 2 },
                { id: 'hold', svgNames: ['hold', 'hold-negative'], onClick: () => mediator.hold(), row: 2 },
                { id: 'right', svgNames: svgMoveNames, onClick: () => mediator.moveRight(), row: 2 },
                { id: 'undo', svgNames: svgUndoNames, onClick: () => mediator.undo(), row: 3 },
                { id: 'down', svgNames: svgMoveNames, onClick: () => mediator.moveDown(), row: 3 },
                { id: 'redo', svgNames: svgUndoNames, onClick: () => mediator.redo(), row: 3 },
            ];

            buttonsSpec.forEach(spec => {

                const button = ButtonComponent({ ...spec, getSvgCopy });
                buttonComponents[spec.id] = button;
                // containers[spec.row].appendChild(button.getMain());
                containers['wrapper'].appendChild(button.getMain());
            });
        };

        createMainElement();
        // createRows();
        createWrapper();
        createDummies();
        createButtons();
    };

    const init = function () {

        createElements();
    };

    const setMediator = function (newMediator) {

        mediator = newMediator;
    };

    const update = function ({ code, object }) {

        const gameState = object;

        const disactivateAllButtons = function () {

            Object.values(buttonComponents).forEach(button => {
                button.setActive(false);
            });
        };

        const updateActiveNumber = function () {

            mainElement.classList = 'control-panel player-' + state['activeNumber'];
        };

        const updateButton = function (name) {

            buttonComponents[name].setActive(state[name]);
        };

        const stateUpdateFunctions = {

            activeNumber: {
                getter: gameState.getActiveNumber,
                updater: updateActiveNumber
            },
            turn: {
                getter: gameState.canStartTurn,
            },
            select: {
                getter: gameState.canSelectNext,
            },
            hold: {
                getter: gameState.canHold,
            },
            undo: {
                getter: gameState.canUndo,
            },
            redo: {
                getter: gameState.canRedo,
            },
        };

        const updateState = function (name) {

            const getter = stateUpdateFunctions[name].getter;
            const updater = stateUpdateFunctions[name].updater;

            const newState = getter();

            if (state[name] != newState) {
                state[name] = newState;
                updater();
            }
        };

        const updateButtonState = function (name) {

            const getter = stateUpdateFunctions[name].getter;
            const updater = () => updateButton(name);

            const newState = getter();

            if (state[name] != newState) {
                state[name] = newState;
                updater();
            }
        };

        const updateMoveButtonState = function (name) {

            const getter = () => gameState.canMove(name);
            const updater = () => updateButton(name);

            const newState = getter();

            if (state[name] != newState) {
                state[name] = newState;
                updater();
            }
        };

        const moveButtonNames = ['up', 'down', 'left', 'right'];
        const otherButtonNames = ['select', 'turn', 'hold', 'undo', 'redo'];

        if ( !['createGame', 'endGame'].includes(code) ) {

            moveButtonNames.forEach(name => {
                updateMoveButtonState(name);
            });

            otherButtonNames.forEach(name => {
                updateButtonState(name);
            });

            if (code == 'nextTurn') {
                updateState('activeNumber');
            }

        } else if (code == 'createGame') {

            buttonComponents['turn'].setActive(true);
        } else {

            disactivateAllButtons();
        }
    };

    const getId = function () {

        return id;
    };

    const getMain = function () {

        return mainElement;
    };

    return Object.freeze(
        {
            setMediator,
            init,
            update,
            getId,
            getMain,
        }
    );
};

const updateClass = function (element, className) {

    const oldClassName = element.className;

    if (className != oldClassName) {
        element.className = className;
    }
};


const FieldComponent = function({ field, onClick, getSvgCopy }) {

    const props = {
        id: field.getId(),
        type: field.getType(),
        row: field.getX(),
        column: field.getY(),
    };
    const state = {
        pawn: {
            pawn: false,
            type: false,
            playerNumber: false,
        },
        pawnMode: false,
        reach: {
            direction: false,
            playerNumber: false
        },
        exitNumber: false
    };

    let mainElement;
    const containers = {
        highlight: false,
        flag: false,
        pawn: false,
    };

    const createElements = function () {

        const createMain = function() {

            mainElement = createElement(
                {
                    type: 'div',
                    classList: 'field ' + props.type,
                    id: props.id,
                    datasets: { row: props.row, column: props.column },
                    order: props.column,
            });
        };

        const createHighlight = function() {

            containers.highlight = createElement(
                {
                    type: 'div',
                    classList: 'container highlight',
                    parent: mainElement
                }
            );

            ['active', 'reach', 'hover'].forEach(name => {
                containers.highlight.appendChild(getSvgCopy(name));
            });
        };

        const createFlag = function() {

            state.exitNumber = field.getExitNumber();

            containers.flag = createElement(
                {
                    type: 'div',
                    classList: 'container flag ' + 'player-' + state.exitNumber,
                    parent: mainElement
                }
            );

            containers.flag.appendChild(getSvgCopy('flag'));
        };

        const createPawn = function() {

            containers.pawn = createElement(
                {
                    type: 'div',
                    classList: 'container pawn',
                    parent: mainElement
                }
            );

            ['lion', 'rooster', 'snake'].forEach(name => {
                containers.pawn.appendChild(getSvgCopy(name));
            });
        };

        const addEvents = function() {

            mainElement.addEventListener('click', () => { onClick(props.id) });
        };


        createMain();
        if (props.type != 'wall') {
            createHighlight();
            if (props.type == 'exit') createFlag();
            createPawn();
            addEvents();
        }
    };

    const init = function() {

        createElements();
    }();

    const updateFlag = function () {

        if (state.exitNumber && state.pawn.pawn) {

            containers.flag.classList.add('hidden');
        }
    };

    const updatePawn = function () {

        const updatePawnState = function () {

            const newPawn = field.getPawn();

            if (newPawn != state.pawn.pawn) {

                state.pawn.pawn = newPawn;

                if (newPawn) {
                    state.pawn.type = newPawn.getType();
                    state.pawn.playerNumber = newPawn.getPlayerNumber();
                } else {
                    state.pawn.type = false;
                    state.pawn.playerNumber = false;
                }

                return true;
            }
        };

        const updateContainer = function () {

            const getNewClassList = function () {

                let newClassList = 'container pawn';
                if (state.pawn.pawn) {
                    newClassList += ' ' + state.pawn.type + ' player-' + state.pawn.playerNumber;
                }
                return newClassList;
            };

            containers.pawn.classList = getNewClassList();
        };

        const updateDom = function () {

            updateContainer();
            // changeSvg();
            updateFlag();
        };

        if ( updatePawnState() ) updateDom();
    };

    const updateHighlight = function (gameState) {

        const updatePawnModeState = function () {

            const getNewMode = function () {

                let newMode = false;

                const pawn = state.pawn.pawn;

                if (pawn) {

                    if (gameState.getSelected() === pawn) {
                        newMode = 'selected';
                    } else if (pawn.isActive()) {
                        newMode = 'active';
                    }
                }

                return newMode;
            };

            const newMode = getNewMode();

            if (state.pawnMode != newMode) {
                state.pawnMode = newMode;
                return true;
            }
        };

        const updateReachState = function () {

            const getNewReach = function () {

                const newReach = {
                    direction: false,
                    playerNumber: false
                };

                if (gameState.getSelected()) {

                    newReach.direction = gameState.isInReach(field);

                    if (newReach.direction) {

                        newReach.playerNumber = gameState.getActiveNumber();
                    }
                }
                return newReach;
            };

            const newReach = getNewReach();

            if (state.reach != newReach) {
                state.reach = newReach;
                return true;
            }
        };

        const updateState = function () {

            let changed = false;

            if (updatePawnModeState()) {
                changed = true;
            }
            if (updateReachState()) {
                changed = true;
            }

            return changed;
        };

        const updateMain = function () {

            const getNewClassList = function () {

                let newClassList = 'field ' + props.type;
                if (state.pawnMode) {
                    newClassList += ' ' + state.pawnMode;
                } else if (state.reach.direction) {
                    newClassList += ' in-reach';
                }
                return newClassList;
            };

            mainElement.classList = getNewClassList();
        };

        const updateContainer = function () {

            const getNewClassList = function () {

                let newClassList = 'container highlight';
                if (state.pawnMode) {
                    newClassList += ' player-' + state.pawn.playerNumber;
                } else if (state.reach.direction) {
                    newClassList += ' player-' + state.reach.playerNumber + ' ' + state.reach.direction;
                }
                return newClassList;
            };

            containers.highlight.classList = getNewClassList();
        };

        const updateDom = function () {

            updateMain();
            updateContainer();
        };

        if ( updateState() ) updateDom();

    };

    const getRow = function () {
        return props.row;
    };

    const getColumn = function () {
        return props.column;
    };

    const getId = function () {
        return props.id;
    };

    const getType = function () {
        return props.type;
    };

    const getMain = function () {

        return mainElement;
    };

    return Object.freeze(
        {
            updatePawn,
            updateHighlight,
            getRow,
            getColumn,
            getId,
            getType,
            getMain,
        }
    );
};


const BoardComponent = function({ gameState }) {

    let mainElement;
    const id = 'board';
    const rowElements = [];
    const pathComponents = {};
    let name, rows, columns;

    let mediator;

    const setProps = function () {

        name = gameState.getBoardName();
        rows = gameState.getBoardRows();
        columns = gameState.getBoardColumns();
    };

    const createElements = function () {

        const createMainElement = function () {

            const getFieldSizeClass = function () {

                let size;

                if (rows < 8) {
                    size = 'large';
                } else if (rows < 10) {
                    size = 'medium';
                } else {
                    size = 'small';
                }

                return size + '-fields';
            };

            mainElement = createElement(
                {
                    type: 'div',
                    classList: 'board ' + getFieldSizeClass(),
                    datasets: { name, rows, columns },
                }
            );
        };

        const createRowElements = function () {

            const createRow = function (number) {

                const rowElement = createElement(
                    {
                        type: 'div',
                        classList: 'row',
                        id: 'row_' + number,
                        order: number,
                        parent: mainElement,
                    }
                );

                rowElements.push(rowElement);
            };

            for (let n = 0; n < rows; n += 1) {

                createRow(n + 1);
            }
        };

        const createFieldComponents = function () {

            const getSvgCopy = function (name) {

                return mediator.getSvgCopy(name);
            };

            const iterator = gameState.getBoardIterator();

            while (iterator.hasNext()) {

                const field = iterator.next();

                const component = FieldComponent(
                    {
                        field: field,
                        onClick: (id) => mediator.click(id),
                        getSvgCopy: getSvgCopy,
                    }
                );

                if (component.getType() != 'wall') {
                    pathComponents[component.getId()] = component;
                }

                rowElements[component.getRow() - 1].appendChild(component.getMain());
            }
        };

        createMainElement();
        createRowElements();
        createFieldComponents();
    };

    const init = function() {

        setProps();
        createElements();
    };

    const setMediator = function (newMediator) {

        mediator = newMediator;
    };

    const update = function ({ code, object }) {

        const updatePawns = function () {

            Object.values(pathComponents).forEach(component => {
                component.updatePawn();
            });
        };

        const updateHighlights = function () {

            Object.values(pathComponents).forEach(component => {
                component.updateHighlight(object);
            });
        };


        if (['createGame', 'move'].includes(code)) {
            updatePawns();
        }
        if ( ['select', 'move', 'hold', 'nextTurn', 'endGame'].includes(code) ) {
            updateHighlights();
        }
    };

    const getId = function () {

        return id;
    };

    const getMain = function () {

        return mainElement;
    };

    return Object.freeze(
        {
            setMediator,
            init,
            update,
            getId,
            getMain,
        }
    );
};


const ContainerComponent = function ({ id, type='div', classList=false }) {

    let mainElement;

    const createMainElement = function () {

        mainElement = createElement(
            {
                type: type,
                classList: classList,
                id: id,
            }
        );
    };

    const init = function () {

        createMainElement();
    }();

    const add = function (component) {

        mainElement.appendChild(component.getMain());
    };

    const remove = function (component) {

        mainElement.remove(component);
    };

    const getId = function () {

        return id;
    };

    const getMain = function () {

        return mainElement;
    };

    return Object.freeze(
        {
            add: add,
            remove: remove,
            getId: getId,
            getMain: getMain,
        }
    );
};

const ViewMediator = function (root) {

    let controller;
    let svgRepository;
    const containers = {};
    const components = {};


    const setController = function (newController) {

        controller = newController;
    };

    const setSvgRepository = function (component) {

        svgRepository = component;
    };

    const append = function ({ component, parentId }) {

        if (parentId == 'root') {

            root.appendChild(component.getMain());
        } else {

            containers[parentId].add(component);
        }
    };

    const addContainer = function ({ container, parentId }) {

        containers[container.getId()] = container;

        append({ component: container, parentId: parentId });
    };


    const addComponent = function ({ component, parentId }) {

        components[component.getId()] = component;

        append({ component: component, parentId: parentId });

    };

    const update = function (spec) {

        for (let component of Object.values(components)) {
            component.update(spec);
        }
    };

    // mediator

    const getSvgCopy = function (name) {

        return svgRepository.getSvgCopy(name);
    };

    // controller

    const click = function (id) {

        controller.click(id);
    };

    const nextTurn = function () {

        controller.nextTurn() ;
    };

    const selectNext = function () {

        controller.selectNext() ;
    };

    const moveUp = function () {

        controller.moveUp() ;
    };

    const moveDown = function () {

        controller.moveDown() ;
    };

    const moveLeft = function () {

        controller.moveLeft() ;
    };

    const moveRight = function () {

        controller.moveRight() ;
    };

    const hold = function () {

        controller.hold() ;
    };

    const undo = function () {

        controller.undo() ;
    };

    const redo = function () {

        controller.redo() ;
    };

    const setPlayerName = function (spec) {

        controller.setPlayerName(spec);
    };


    return Object.freeze(
        {
            setController,
            setSvgRepository,
            addContainer,
            addComponent,
            update,
            // mediator
            getSvgCopy,
            // controller
            click,
            nextTurn,
            selectNext,
            moveUp,
            moveDown,
            moveLeft,
            moveRight,
            hold,
            undo,
            redo,
            setPlayerName,
        }
    );
};


const ViewBuilder = function () {

    let mediator

    const reset = function (root) {

        mediator = ViewMediator(root);
    };

    const setController = function (controller) {

        mediator.setController(controller);
    };

    const setSvgRepository = function (component) {

        mediator.setSvgRepository(component);
    };

    const setContainer = function (spec) {

        const container = ContainerComponent(spec);

        mediator.addContainer({ ...spec, container });
    };

    const addComponent = function ({ creator, spec, init=false }) {

        const component = creator(spec);

        component.setMediator(mediator);
        if (init) {
            component.init();
        }
        mediator.addComponent({ ...spec, component });
    };

    const setBoard = function (spec) {

        addComponent({ creator: BoardComponent, spec: spec, init: true });
    };

    const setControlPanel = function (spec) {

        addComponent({ creator: ControlPanelComponent, spec: spec, init: true });
    };

    const setPlayerPanel = function (spec) {

        addComponent({ creator: PlayerPanel, spec: spec});
    };

    const setInfoPanel = function (spec) {

        addComponent({ creator: InfoPanel, spec: spec });
    };


    const getResult = function () {

        return mediator;
    };

    return Object.freeze(
        {
            reset,
            setController,
            setSvgRepository,
            setContainer,
            setBoard,
            setControlPanel,
            setPlayerPanel,
            setInfoPanel,
            getResult,
        }
    );
};


const View = function() {

    let root;
    let controller;
    let viewBuilder;
    let mediator;
    let svgRepository;

    const findRoot = function () {

        root = document.getElementById('root');
    };

    const createViewBuilder = function () {

        viewBuilder = ViewBuilder();
    };

    const createSvgRepository = function () {

        svgRepository = SvgRepository();
    };

    const init = function() {

        findRoot();
        createViewBuilder();
        createSvgRepository();
    }();

    const setController = function(newController) {

        controller = newController;
    };


    const buildGameView = function (gameState) {

        const builder = viewBuilder;

        const make = function () {

            builder.reset(root);
            builder.setController(controller);
            builder.setSvgRepository(svgRepository);

            builder.setContainer({ id: 'header', type: 'header', parentId: 'root'});

            builder.setContainer({ id: 'main', type: 'main', parentId: 'root' });

            builder.setContainer({ id: 'board-section', type: 'section', classList: 'board-section', parentId: 'main' });
            builder.setBoard({ parentId: 'board-section', gameState: gameState });

            builder.setContainer({ id: 'panels-section', type: 'section', classList: 'panels-section', parentId: 'main' });
            builder.setControlPanel({ parentId: 'panels-section' });
            builder.setPlayerPanel({ playerNumber: 1, parentId: 'panels-section', gameState: gameState });
            builder.setPlayerPanel({ playerNumber: 2, parentId: 'panels-section', gameState: gameState });
            builder.setInfoPanel({ parentId: 'panels-section' });

            builder.setContainer({ id: 'footer', type: 'footer', parentId: 'root'});
        };

        make();

        mediator = builder.getResult();
    };

    const endGame = function(gameState) {

        const scoreString = gameState.getLastScoreString();
        console.log(scoreString);
    };

    const update = function({ code=false, object=false }) {

        console.log('> view.update("' + code + '")');

        if (code == 'createGame') {

            buildGameView(object)
        } else if (code == 'endGame') {

            endGame(object);
        }

        if (mediator) {

            mediator.update({ code, object });
        }
    };

    return Object.freeze(
        {
            setControler: setController,
            update: update,
        }
    );
};


// MODEL LAYER

const GameOperatorEmpty = function () {

    let game;

    const setGame = function (mediator) {
        game = mediator;
    };

    const emptyOperation = function () {
        console.log('Game has ended!');
    };

    const nextTurn = function() {
        emptyOperation();
    };

    const selectNext = function() {
        emptyOperation();
    };

    const hold = function () {
        emptyOperation();
    };

    const moveUp = function () {
        emptyOperation();
    };

    const moveDown = function () {
        emptyOperation();
    };

    const moveLeft = function () {
        emptyOperation();
    };

    const moveRight = function () {
        emptyOperation();
    };

    const click = function (fieldId) {
        emptyOperation();
    };

    const undo = function () {
        emptyOperation();
    };

    const redo = function () {
        emptyOperation();
    };

    return Object.freeze(
        {
            setGame: setGame,

            // UI
            nextTurn: nextTurn,
            selectNext: selectNext,
            hold: hold,
            moveUp: moveUp,
            moveDown: moveDown,
            moveLeft: moveLeft,
            moveRight: moveRight,
            click: click,
            undo: undo,
            redo: redo,
        }
    );
};

const GameOperator = function () {

    let game;

    const setGame = function (mediator) {
        game = mediator;
    };

    const nextTurn = function() {
        game.nextTurn();
    };

    const selectNext = function() {
        game.selectNext();
    };

    const hold = function () {
        game.hold();
    };

    const moveUp = function () {
        game.moveInDirection('up');
    };

    const moveDown = function () {
        game.moveInDirection('down');
    };

    const moveLeft = function () {
        game.moveInDirection('left');
    };

    const moveRight = function () {
        game.moveInDirection('right');
    };

    const click = function (fieldId) {
        game.click(fieldId);
    };

    const undo = function () {
        game.undo();
    };

    const redo = function () {
        game.redo();
    };

    return Object.freeze(
        {
            setGame: setGame,

            // UI
            nextTurn: nextTurn,
            selectNext: selectNext,
            hold: hold,
            moveUp: moveUp,
            moveDown: moveDown,
            moveLeft: moveLeft,
            moveRight: moveRight,
            click: click,
            undo: undo,
            redo: redo,
        }
    );
};

const GameState = function () {

    let game;
    let players;
    let board, pawns;
    let turnCounter, movesCounter, scores;
    let commands;

    // setters


    const setGame = function (mediator) {
        game = mediator;
    };

    const setPlayers = function (component) {
        players = component;
    };

    const setBoard = function (component) {
        board = component;
    };

    const setPawns = function (component) {
        pawns = component;
    };

    const setTurnCounter = function (component) {
        turnCounter = component;
    };

    const setMovesCounter = function (component) {
        movesCounter = component;
    };

    const setScores = function (component) {
        scores = component;
    };

    const setCommands = function(component) {
        commands = component;
    };

    // game state interface

    const canStartTurn = function () {
        return game.canStartTurn();
    };

    const canSelectNext = function () {
        return movesCounter.canSelectNext();
    };

    const canMove = function (direction) {
        return pawns.canMoveSelected(direction);
    };

    const canHold = function () {
        return movesCounter.canHold();
    };

    const getMoves = function() {

        return movesCounter.getMoves();
    };

    const getMovesAmount = function() {

        return movesCounter.getMovesAmount();
    };

    const getHolds = function() {

        return movesCounter.getHolds();
    };

    const getMaxHolds = function() {

        return movesCounter.getMaxHolds();
    };

    const canUndo = function () {
        return commands.canUndo();
    };

    const canRedo = function () {
        return commands.canRedo();
    };

    const isInReach = function (field) {

        return pawns.isInReach(field);
    };

    // get players

    const getPlayer = function (number) {

        return players.getPlayer(number);
    };

    const getActiveNumber = function (active=true) {

        return players.getActiveNumber(active);
    };

    const getActiveColor = function (active=true) {

        return players.getActiveColor(active);
    };

    // get game

    const getGameNumber = function() {
        return game.getNumber();
    };

    const getTurnNumber = function () {
        return turnCounter.getTurn();
    };

    const getLastScoreString = function() {
        return scores.getLastScoreString();
    };

    // get board

    const getBoardIterator = function() {
        return board.getIterator();
    };

    const getBoardName = function() {
        return board.getName();
    };

    const getBoardRows = function() {
        return board.getRows();
    };

    const getBoardColumns = function() {
        return board.getColumns();
    };

    // get pawns

    const getSelected = function() {
        return pawns.getSelected();
    };


    return Object.freeze(
        {
            // setters
            setGame,
            setPlayers,
            setBoard,
            setPawns,
            setTurnCounter,
            setMovesCounter,
            setScores,
            setCommands,
            // game state interface
            canStartTurn,
            canSelectNext,
            canMove,
            canHold,
            getMoves,
            getMovesAmount,
            getHolds,
            getMaxHolds,
            canUndo,
            canRedo,
            isInReach,
            // get players
            getPlayer,
            getActiveNumber,
            getActiveColor,
            // get game
            getGameNumber,   // will be used
            getTurnNumber,   // will be used
            getLastScoreString, // used in ViewJs
            // get board
            getBoardIterator, // used in BoardComponent
            getBoardName, // used in BoardComponent
            getBoardRows, // used in BoardComponent
            getBoardColumns,   // used in BoardComponent
            // get pawns
            getSelected,   // used in BoardComponent
        }
    );
};


const DisactivateCommand = function({ game, pawn, type }) {
    // type = 'move' or 'hold'

    const execute = function() {
        game.cleanAfterMove({pawn: pawn, type: type, undo: false});
    };

    const unexecute = function() {
        game.cleanAfterMove({pawn: pawn, type: type, undo: true});
    };

    return Object.freeze(
        {
            execute: execute,
            unexecute: unexecute,
        }
    );
};


const HoldCommand = function({ pawn, game }) {
    let disactivateCommand;

    const init = function() {

        disactivateCommand = DisactivateCommand({game: game, pawn: pawn, type: 'hold'});
    }();

    const execute = function() {
        disactivateCommand.execute();
    };

    const unexecute = function() {
        disactivateCommand.unexecute();
    };

    const toString = function() {
        let string = `HoldCommand ={pawn: ${pawn.toString()}, position: ${pawn.getPosition().toString()} }`;
        return string;
    };

    return Object.freeze(
        {
            execute: execute,
            unexecute: unexecute,

            toString: toString,
        }
    );
};

const KillCommand = function(position) {
    let pawn;

    const init = function() {
        pawn = position.getPawn();
    }();

    const execute = function() {
        if (pawn) {
            pawn.move(false);
            pawn.setAlive(false);
            position.free();
        }
    };

    const unexecute = function() {
        if (pawn) {
            pawn.move(position);
            pawn.setAlive(true);
            position.take(pawn);
        }
    };

    return Object.freeze(
        {
            execute: execute,
            unexecute: unexecute,
        }
    );
};


const MoveCommand = function({ pawn, position, game }) {
    let oldPosition, killCommand, disactivateCommand;

    const init = function() {

        oldPosition = pawn.getPosition();
        killCommand = KillCommand(position);
        disactivateCommand = DisactivateCommand({game: game, pawn: pawn, type: 'move'});
    }();

    const execute = function() {
        killCommand.execute();  // if no pawn nothing happens
        game.movePawn({pawn: pawn, position: position});
        disactivateCommand.execute();
    };

    const unexecute = function() {
        game.movePawn({pawn: pawn, position: oldPosition});
        killCommand.unexecute();
        disactivateCommand.unexecute();
    };

    const toString = function() {
        let string = `MoveCommand ={pawn: ${pawn.toString()}, position: ${position.toString()} }`;
        return string;
    };

    return Object.freeze(
        {
            execute: execute,
            unexecute: unexecute,

            toString: toString,
        }
    );
};

const CommandsHistory = function () {
    let position, history;

    const resetHistory = function() {
        history = [];
        position = 0;
    };

    const init = function() {
        resetHistory();
    }();

    const logPosition = function (log=true) {
        if (log) {
            console.log(`>>>CommandsHistory.position : ${position}`);
        }
    };

    const execute = function (command) {

        if (position < history.length) {
            history = history.slice(0, position);
        }
        history.push(command);
        position += 1;

        command.execute();

        logPosition(false);
    };

    const undo = function () {

        if (position > 0) {
            position -= 1;
            history[position].unexecute();
        }
        logPosition(false);
    };

    const redo = function () {

        if (position < history.length) {
            position += 1;
            history[position - 1].execute();
        }
        logPosition(false);
    };

    const canUndo = function () {

        if (position > 0) {
            return true;
        } else {
            return false;
        }
    };

    const canRedo = function () {

        if (position < history.length) {
            return true;
        } else {
            return false;
        }
    };

    return Object.freeze(
        {
            reset: resetHistory,
            execute: execute,
            undo: undo,
            redo: redo,

            canUndo: canUndo,
            canRedo: canRedo,
        }
    );

};


const Commands = function() {
    let commandsHistory;
    let game;

    const createHistory = function () {
        commandsHistory = CommandsHistory();
    };

    const init = function() {
        createHistory();
    }();

    const setGame = function (mediator) {
        game = mediator;
    };


    const resetHistory = function() {
        commandsHistory.reset();
    };

    const execute = function (command) {
        commandsHistory.execute(command);
    };

    const undo = function () {
        commandsHistory.undo();
    };

    const redo = function () {
        commandsHistory.redo();
    };

    const hold = function () {

        const command = HoldCommand({ pawn: game.getSelected(), game: game });
        execute(command);
    };

    const move = function (field) {

        const command = MoveCommand({ pawn: game.getSelected(), position: field, game: game });
        execute(command);
    };

    const canUndo = function () {

        return commandsHistory.canUndo();
    };

    const canRedo = function () {

        return commandsHistory.canRedo();
    };

    return Object.freeze(
        {
            setGame: setGame,

            resetHistory: resetHistory,
            undo: undo,
            redo: redo,

            hold: hold,
            move: move,

            canUndo: canUndo,
            canRedo: canRedo,
        }
    );
};

const MovesCounter = function() {
    let movesAmount, maxHolds;
    let moves, holds;

    const reset = function (newMovesAmount) {

        movesAmount = newMovesAmount;
        maxHolds = parseInt(movesAmount / 2);
        moves = 0;
        holds = 0;
    };

    const init = function() {

        reset(0);
    }();

    const canMove = function() {
        if (moves < movesAmount) {
            return true;
        } else {
            return false;
        }
    };

    const canHold = function() {
        if (holds < maxHolds && canMove()) {
            return true;
        }
        else {
            return false;
        }
    };

    const add = function(type) {    // type = 'hold' or 'move'
        moves += 1;
        if (type == 'hold') {
            holds += 1;
        }
    };

    const remove = function(type) {
        moves -= 1;
        if (type == 'hold') {
            holds -= 1;
        }
    };

    const getMoves = function() {
        return moves;
    };

    const getMovesAmount = function() {
        return movesAmount;
    };

    const getHolds = function() {
        return holds;
    };

    const getMaxHolds = function() {
        return maxHolds;
    };

    const canSelectNext = function () {
        if (movesAmount - moves > 1) {
            return true;
        } else {
            return false;
        }
    };

    return Object.freeze(
        {
            reset,

            canHold,
            canMove,
            add,
            remove,
            getMoves,
            getMovesAmount,
            getHolds,
            getMaxHolds,
            canSelectNext,
        }
    );
};

const TurnCounter = function () {
    let turnCounter = 0;
    let turnNumber = 0;

    const next = function() {

        turnCounter += 1;

        if (turnCounter % 2 == 1) {
            turnNumber += 1;
        }

        console.log('Turn number: ' + turnNumber);  // test
    };

    const getTurn = function () {
        return turnNumber;
    };

    return Object.freeze(
        {
            next: next,
            getTurn: getTurn,
        }
    );
};

function ArrayIterator(array) {
    let position = 0;

    const hasNext = function() {
        if (position < array.length) {
            return true;
        } else return false;
    };

    const next = function() {
        let element = array[position];
        position += 1;
        return element;
    };

    const getItems = function() {
        return array.length;
    };

    return Object.freeze(
        {
            hasNext: hasNext,
            next: next,
            getItems: getItems,
        }
    );
};


const Pawn = function ({ id, type, player }) {
    let kills;
    let position, reach, alive, active, order;
    let game;

    const setKills = function () {

        const killsTable = {
            'lion': 'rooster',
            'rooster': 'snake',
            'snake': 'lion'
        }

        kills = killsTable[type];
    };

    const init = function() {

        setKills();

        position = false;
        reach = { up: false, down: false, left: false, right: false };
        alive = true;
        active = false;
        order = false;

    }();

    const setGame = function (mediator) {
        game = mediator;
    };

    const isAlive = function() {
        return alive;
    };

    const isActive = function() {
        return active;
    };

    const move = function (newPosition) {

        position = newPosition;

        const log = function () {
            let positionId;
            if (newPosition) {
                positionId = newPosition.getId();
            } else {
                positionId = 'false';
            }
            console.log(`>> ${id} moved to ${positionId}`);
        };

        // log();
    };

    const updateReach = function () {

        Object.keys(reach).forEach(direction => {

            reach[direction] = game.isMoveLegal(
                {
                    pawnSpec: { pawnId: id },
                    fieldSpec: { field: position, direction: direction }
                }
            );
        });
    };

    const isInReach = function (field) {

        let direction = false;

        for (const [reachDirection, reachField] of Object.entries(reach)) {
            if (reachField == field) {
                direction = reachDirection;
                break;
            }
        }

        return direction;
    };

    const setAlive = function(bool) {
        alive = bool;
    };

    const setActive = function(bool) {
        active = bool;
    };

    const setOrder = function(newOrder) {
        order = newOrder; // number 0+
    };

    // get

    const getPosition = function() {
        return position;
    };

    const getReach = function(direction=false) {

        if (direction) {
            return reach[direction];
        } else {
            return reach;
        }
    };

    const getReachIterator = function() {
        return ArrayIterator(Object.values(reach));
    };

    const getOrder = function() {
        return order;
    };

    const getId = function() {
        return id;
    };

    const getType = function() {
        return type;
    };

    const getKills = function() {
        return kills;
    };

    const getPlayerNumber = function() {
        return player.getNumber();
    };

    const getColor = function() {
        return player.getColor();
    };

    const toString = function() {
        let string = '';

        let playerString = '-';
        if (player) playerString = player.getName();

        let positionString = '-';
        if (position) positionString = position.getId();

        string += `Pawn ={ id: ${id}, type: ${type}, player: ${playerString}, position.id: ${positionString} }`;

        return string;
    };

    return Object.freeze(
        {
            setGame: setGame,

            isAlive: isAlive,
            isActive: isActive,
            move: move,
            setAlive: setAlive,
            setActive: setActive,
            setOrder: setOrder,
            updateReach: updateReach,
            isInReach: isInReach,

            getPosition: getPosition,
            getReach: getReach,
            getReachIterator: getReachIterator,
            getOrder: getOrder,
            getId: getId,
            getType: getType,
            getKills: getKills,
            getPlayerNumber: getPlayerNumber,
            getColor: getColor,
            toString: toString,
        }
    );
};



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
            selectedPosition = activePawns.indexOf(selected)
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

    const isInReach = function (field) {

        return selected.isInReach(field);
    };

    const getActiveAmount = function() {
        return activePawns.length;
    };

    const canMoveSelected = function (direction) {

        if (selected && selected.getReach(direction)) {
            return true;
        } else {
            return false;
        }
    };

    return Object.freeze(
        {
            setGame,
            init,

            reset,
            setActivePawns,
            hasNext,
            selectNext,
            select,
            updateReaches,

            getIterator,
            getPawn,
            getSelected,
            isInReach,
            getActiveAmount,

            canMoveSelected,
        }
    );
};

const Game = function () {
    let notify, gameNumber;
    let gameState, gameOperator, emptyGameOperator;
    let players, board, pawns;
    let turnCounter, movesCounter, scores;
    let commands;

    const placePawns = function (startZoneSize=1) {

        for (let n = 0; n < players.getAmount(); n += 1) {

            const playerNumber = n + 1;
            const pawnsIterator = pawns.getIterator({ playerNumber });
            board.placePawns({ playerNumber, pawnsIterator, startZoneSize });
        }
    };

    const init = function() {

        placePawns(2);
    };

    // PRIVATE & PUBLIC

    const canStartTurn = function() {

        return !movesCounter.canMove();
    };

    // PRIVATE

    const endGame = function(code) {

        scores.add(code);
        pawns.reset();
        gameOperator = emptyGameOperator;
        notify('endGame');
    };

    const updateReaches = function() {
        pawns.updateReaches();
    };

    const select = function (id) {
        const isSelected = pawns.select(id);
        if (isSelected) {
            notify('select');
        }
    };

    const moveToPosition = function (position) {

        commands.move(position)
    };

    // PUBLIC

    // for operator

    const nextTurn = function() {

        const changeTurnNumber = function() {
            turnCounter.next();
        };

        const changeActivePlayer = function() {
            players.changeActive();
        };

        const changeActivePawns = function () {
            pawns.setActivePawns(players.getActive().getNumber());
        };

        const resetMovesCounter = function() {
            movesCounter.reset(pawns.getActiveAmount());
        };

        const resetCommandsHistory = function() {
            commands.resetHistory();
        };

        const selectNextOrEndGame = function () {

            if (pawns.hasNext()) {
                pawns.selectNext();
                notify('nextTurn');
            } else {
                endGame('no_pawns');
            }
        };


        if (canStartTurn()) {

            changeTurnNumber();
            changeActivePlayer();
            changeActivePawns();
            updateReaches();
            resetMovesCounter();
            resetCommandsHistory();
            selectNextOrEndGame();
        } else {
            console.log("Can't end turn! You still have active pawns!");
        }
    };

    const selectNext = function() {
        const isSelected = pawns.selectNext();
        if (isSelected) {
            notify('select');
        }
    };

    const hold = function () {

        if (movesCounter.canHold()) {
            commands.hold();
        } else {
            console.log("Can't hold this many pawns!");
        }
    };

    const moveInDirection = function (direction) {

        const position = pawns.getSelected().getReach(direction);
        if (position) {
            commands.move(position);
        }
    };

    const click = function (fieldId) {

        const clickedField = board.getField({id: fieldId});
        const clickedPawn = clickedField.getPawn();
        const selectedPawn = pawns.getSelected();

        const tryMove = function() {

            if (selectedPawn.isInReach(clickedField)) {
                moveToPosition(clickedField);
            }
        };

        const trySelect = function() {

            if (clickedPawn && clickedPawn.isActive()) {
                select(clickedPawn.getId());
            } else {
                tryMove();
            }
        };

        const tryHold = function () {

            if (clickedPawn === selectedPawn) {
                hold();
            } else {
                trySelect();
            }
        };

        if (selectedPawn) tryHold();
    };

    const undo = function () {
        commands.undo();
    };

    const redo = function () {
        commands.redo();
    };

    // mediator interface

    const movePawn = function({ pawn, position }) {

        const oldPosition = pawn.getPosition();
        if (oldPosition) {
            oldPosition.free();
        }
        pawn.move(position);
        position.take(pawn);
    };

    const cleanAfterMove = function({ pawn, type, undo }) {

        const updateMovesCounter = function() {
            if (!undo) {
                movesCounter.add(type);
            } else {
                movesCounter.remove(type);
            }
        };

        const updatePawnsOrder = function() {
            pawn.setOrder(movesCounter.getMoves());
        };

        const disactivatePawn = function() {
            pawn.setActive(undo);
        };


        const maybeUpdateReaches = function() {
            if (type == 'move') {
                updateReaches();
            }
        };

        const selectNextAfterMove = function() {
            pawns.selectNext();
        };

        const checkExitWin = function() {
            if (pawn.getPosition().getType() == 'exit') {
                endGame('exit');
            }
        };

        updateMovesCounter();
        updatePawnsOrder();
        disactivatePawn();

        maybeUpdateReaches();
        selectNextAfterMove();

        notify(type);

        checkExitWin();
    };

    const isMoveLegal = function ({ pawnSpec, fieldSpec }) {

        const getPawnFromSpec = function () {
            let { pawn, pawnId } = pawnSpec;

            if (!pawn) {
                pawn = pawns.getPawn(pawnId);
            }
            return pawn;
        };

        const getFieldFromSpec = function () {
            let { id, x, y, field, direction } = fieldSpec;

            let resultField;

            if (id || x || direction) {
                resultField = board.getField(fieldSpec);
            } else {
                resultField = field;
            }

            return resultField;
        };

        const couldPawnMoveToField = function (pawn, field) {
            let result = false;

            if (field.getType() == 'path') {

                result = true;

                const otherPawn = field.getPawn();
                if ( otherPawn && ( pawn.getPlayerNumber() == otherPawn.getPlayerNumber() || pawn.getKills() != otherPawn.getType() )) {
                    result = false;
                }

            } else if (field.getType() == 'exit' & pawn.getPlayerNumber() != field.getExitNumber()) {
                result = true;
            }
            return result;
        };

        let result = false;
        const pawn = getPawnFromSpec();
        const field = getFieldFromSpec();
        if (field && couldPawnMoveToField(pawn, field)) {
            result = field;
        }

        return result;
    };

    const getPlayer = function(number) {
        return players.getPlayer(number);
    };

    const getActivePlayer = function(active=true) {
        return players.getActive(active);
    };

    const getSelected = function() {
        return pawns.getSelected();
    };

    const getNumber = function() {
        return gameNumber;
    };

    // getters for model

    const getGameState = function () {
        return gameState;
    };

    const getGameOperator = function () {
        return gameOperator;
    };

    // mediator setters

    const setNotify = function (notifyFunction) {
        notify = notifyFunction;
    };

    const setNumber = function (newNumber) {
        gameNumber = newNumber;
    };

    const setGameState = function (colleague) {
        gameState = colleague;
    };

    const setGameOperator = function (colleague) {
        gameOperator = colleague;
    };

    const setEmptyGameOperator = function (colleague) {
        emptyGameOperator = colleague;
    };

    const setPlayers = function (colleague) {
        players = colleague;
    };

    const setBoard = function (colleague) {
        board = colleague;
    };

    const setPawns = function (colleague) {
        pawns = colleague;
    };

    const setTurnCounter = function (colleague) {
        turnCounter = colleague;
    };

    const setMovesCounter = function (colleague) {
        movesCounter = colleague;
    };

    const setScores = function (colleague) {
        scores = colleague;
    };

    const setCommands = function(colleague) {
        commands = colleague;
    };

    return Object.freeze(
        {
            init: init,

            // used in GameOperator
            nextTurn: nextTurn,
            selectNext: selectNext,
            hold: hold,
            moveInDirection: moveInDirection,
            click: click,
            undo: undo,
            redo: redo,

            // mediator interface
            canStartTurn: canStartTurn, // used privately and in GameState
            movePawn: movePawn, // used in Board, MoveCommand
            cleanAfterMove: cleanAfterMove, // used in DisactivateCommand
            isMoveLegal: isMoveLegal,   // used in Pawn
            getPlayer: getPlayer, // used in Board, Pawns
            getActivePlayer: getActivePlayer,   // used in Scores
            getSelected: getSelected,   // used in Commands
            getNumber: getNumber,   // used in Scores

            // getters for model
            getGameState: getGameState, // used in Model
            getGameOperator: getGameOperator,   // used in Model

            // mediator setters
            setNotify: setNotify,
            setNumber: setNumber,
            setGameState: setGameState,
            setGameOperator: setGameOperator,
            setEmptyGameOperator: setEmptyGameOperator,
            setPlayers: setPlayers,
            setBoard: setBoard,
            setPawns: setPawns,
            setTurnCounter: setTurnCounter,
            setMovesCounter: setMovesCounter,
            setScores: setScores,
            setCommands: setCommands,
        }
    );
};


const GameBuilder = function () {
    let game, gameState;
    let mediators;

    const reset = function () {

        game = Game();
        mediators = [game];
    };

    const setState = function () {

        gameState = GameState();
        mediators.push(gameState);

        game.setGameState(gameState);
        gameState.setGame(game);
    };

    const setOperator = function () {

        const gameOperator = GameOperator();

        game.setGameOperator(gameOperator);
        gameOperator.setGame(game);
    };

    const setEmptyOperator = function () {

        const gameOperatorEmpty = GameOperatorEmpty();

        game.setEmptyGameOperator(gameOperatorEmpty);
        gameOperatorEmpty.setGame(game);
    };

    const setNotify = function (notifyFunction) {

        game.setNotify(notifyFunction);
    };

    const setNumber = function (newNumber) {

        game.setNumber(newNumber);
    };

    const setPlayers = function (players) {

        mediators.forEach(mediator => mediator.setPlayers(players));
    };

    const setBoard = function (board) {

        mediators.forEach(mediator => mediator.setBoard(board));
        board.setGame(game);

        board.init();
    };

    const setPawns = function (pawnsSpec) {

        const pawns = Pawns(pawnsSpec);

        mediators.forEach(mediator => mediator.setPawns(pawns));
        pawns.setGame(game);

        pawns.init();
    };

    const setTurnCounter = function () {

        const turnCounter = TurnCounter();

        mediators.forEach(mediator => mediator.setTurnCounter(turnCounter));
    };

    const setMovesCounter = function () {

        const movesCounter = MovesCounter();

        mediators.forEach(mediator => mediator.setMovesCounter(movesCounter));
    };

    const setScores = function (scores) {

        scores.reset();
        mediators.forEach(mediator => mediator.setScores(scores));
        scores.setGame(game);
    };

    const setCommands = function () {

        const commands = Commands();

        mediators.forEach(mediator => mediator.setCommands(commands));
        commands.setGame(game);
    };

    const getResult = function () {

        game.init();

        return game;
    };

    return Object.freeze(
        {
            reset: reset,
            setState: setState,
            setOperator: setOperator,
            setEmptyOperator: setEmptyOperator,
            setNotify: setNotify,
            setNumber: setNumber,
            setPlayers: setPlayers,
            setBoard: setBoard,
            setPawns: setPawns,
            setTurnCounter: setTurnCounter,
            setMovesCounter: setMovesCounter,
            setScores: setScores,
            setCommands: setCommands,
            getResult: getResult
        }
    );
};

const boardSpec = {

    board0500: {
        name: "Board 0500 - Empty",
        matrix: [
            [1, 1, 3, 1, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 1, 2, 1, 1]
        ]
    },
    board0700: {
        name: "Board 0700 - Empty",
        matrix: [
            [1, 1, 1, 3, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 2, 1, 1, 1]
        ]
    },
    board0701: {
        name: "Board 0701",
        matrix: [
            [1, 1, 1, 3, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 1, 0, 0, 0, 1, 1],
            [1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 2, 1, 1, 1]
        ]
    },
    board0702: {
        name: "Board 0702",
        matrix: [
            [1, 1, 1, 3, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 2, 1, 1, 1]
        ]
    },
    board0900: {
        name: "Board 0900 - Empty",
        matrix: [
            [1, 1, 1, 1, 3, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 2, 1, 1, 1, 1]
        ]
    },
    board1100: {
        name: "Board 1100 - Empty",
        matrix: [
            [1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1]
        ]
    },
};

const shuffle = function(array) {
    array.sort(() => Math.random() - 0.5);
};

const Field = function ({ id, type, x, y, exitNumber=false, player=false }) {
    let pawn;

    const init = function() {

        pawn = false;
    }();


    const isFree = function() {
        if (pawn) return false;
        else return true;
    };

    const take = function(newPawn) {
        pawn = newPawn;

        const log = function () {
            console.log(`>> ${id} took ${newPawn.getId()}`);
        };
        // log();
    };

    const free = function() {
        pawn = false;

        const log = function () {
            console.log(`>> ${id} freed`);
        };
        // log();
    };

    const getPawn = function() {
        return pawn;
    };

    const getId = function() {
        return id;
    };

    const getType = function() {
        return type;
    };

    const getX = function() {
        return x;
    };

    const getY = function() {
        return y;
    };

    const getExitNumber = function() {
        return exitNumber;
    };

    const getFlagColor = function () {

        if (player) {
            return player.getColor();
        } else {
            return false;
        }
    };

    const toString = function() {
        let string = '';

        let pawnString = '-';
        if (pawn) pawnString = pawn.getId();

        let exitNumberString = '-';
        if (exitNumber) exitNumberString = exitNumber;

        string += `Field ={ id: ${id}, type: ${type}, x: ${x}, y: ${y}, exitNumber: ${exitNumberString}, pawn.id: ${pawnString} }`;

        return string;
    };


    return Object.freeze(
        {
            isFree: isFree,
            take: take,
            free: free,
            getPawn: getPawn,

            getId: getId,
            getType: getType,
            getX: getX,
            getY: getY,
            getExitNumber: getExitNumber,
            getFlagColor: getFlagColor,
            toString: toString,
        }
    );
};


const Board = function ({ id=false, name, matrix }) {

    const size = { rows: 0, columns: 0};

    const fieldsArray = [];
    const fieldsMatrix = [];
    const fieldsDictionary = {};
    const paths = [];
    const exits = [];
    const walls = [];

    let game;

    const setGame = function (mediator) {
        game = mediator;
    };

    const setSize = function () {

        size.rows = matrix.length;
        size.columns = matrix[0].length;
    };

    const createFields = function () {

        const createField = function (row, column) {

            let type, specificArray;
            let exitNumber = false;
            let player = false;

            const typeCode = matrix[row][column];

            if (typeCode == 0) {
                type = 'path';
                specificArray = paths;
            }
            else if (typeCode == 1) {
                type = 'wall';
                specificArray = walls;
            }
            else {
                type = 'exit';
                specificArray = exits;

                exitNumber = typeCode - 1;

                player = game.getPlayer(exitNumber);
            }

            const id = `f_${row + 1}_${column + 1}`;

            const field = Field({x: row + 1, y: column + 1, id: id, type: type, exitNumber: exitNumber, player: player});

            fieldsArray.push(field);
            fieldsMatrix[row].push(field);
            fieldsDictionary[id] = field;
            specificArray.push(field);
        };

        for (let row = 0; row < size.rows; row += 1) {

            fieldsMatrix.push([]);

            for (let column = 0; column < size.columns; column += 1) {

                createField(row, column);
            }
        }
    };

    const init = function() {

        setSize();
        createFields();
    };

    const getIterator = function (type=false) {

        if (type == 'paths') {
            return ArrayIterator(paths);
        } else if (type == 'exits') {
            return ArrayIterator(exits);
        } else {
            return ArrayIterator(fieldsArray);
        }
    };

    const getField = function({ id=false, x=false, y=false, field=false, direction=false }) {

        const getFieldByCoordinates = function (x, y) {
            try {
                return fieldsMatrix[x-1][y-1];
            } catch {
                return false;
            }
        };

        const getFieldInDirection = function (field, direction) {
            let x = field.getX();
            let y = field.getY();
            if (direction == 'up') x = x - 1;
            else if (direction == 'down') x = x + 1;
            else if (direction == 'left') y = y - 1;
            else if (direction == 'right') y = y + 1;

            return getFieldByCoordinates(x, y);
        };

        if (id) {
            field = fieldsDictionary[id];
        } else if (x) {
            field = getFieldByCoordinates(x, y);
        }

        if (direction) {
            field = getFieldInDirection(field, direction);
        }

        return field;
    };

    const placePawns = function ({ playerNumber, pawnsIterator, startZoneSize }) {

        const getExit = function (playerNumber) {
            let exit;

            for (let n = 0; n < exits.length; n += 1) {
                exit = exits[n];
                if (playerNumber == exit.getExitNumber()) {
                    break;
                }
            }
            return exit;
        };

        const findStartZone = function (exit) {
            const startZone = [];

            const exitsX = exit.getX();
            const exitsY = exit.getY();

            let direction = -1;
            if (exitsX == 1) direction = 1;
            for (let xDistance = 1; xDistance <= startZoneSize; xDistance += 1) {
                for (let yDistance = -startZoneSize; yDistance <= startZoneSize; yDistance += 1) {
                    const field = getField({x: exitsX + direction * xDistance, y: exitsY + yDistance});
                    if (field && field.getType() == 'path') {
                        startZone.push(field);
                    }
                }
            }
            return startZone;
        };

        const place = function ({ pawnsIterator, startZone }) {

            shuffle(startZone);

            let n = 0;
            while (pawnsIterator.hasNext()) {
                const field = startZone[n];
                const pawn = pawnsIterator.next();
                game.movePawn({pawn: pawn, position: field});
                n += 1;
            }
        };

        const exit = getExit(playerNumber);
        const startZone = findStartZone(exit);
        place({ pawnsIterator, startZone })
    };

    const getId = function () {

        return id;
    };

    const getName = function() {
        return name;
    };

    const getRows = function() {
        return size.rows;
    };

    const getColumns = function() {
        return size.columns;
    };


    return Object.freeze(
        {
            setGame: setGame,
            init: init,

            placePawns: placePawns,
            getIterator: getIterator,
            getField: getField,
            getName: getName,
            getRows: getRows,
            getColumns: getColumns,
        }
    );
};


const BoardRepository = function (boardSpec) {

    const boards = {};
    let hasAllBoards = false;

    const createBoard = function (id) {

        const spec = boardSpec[id];

        return Board({ id, ...spec});
    };

    const createAllBoards = function () {

        for (const id of Object.keys(boardSpec)) {

            boards[id] = createBoard(id);
        }
    };

    const checkHasAllBoards = function () {

        if (!hasAllBoards) {

            createAllBoards();
            hasAllBoards = true;
        }
    };

    const getBoard = function (id) {

        checkHasAllBoards();

        return boards[id];
    };

    return Object.freeze(
        {
            createBoard,
            getBoard,
        }
    );
};

const Score = function ({ gameNumber, type, activePlayer, passivePlayer }) {
    let winner, looser, tied;

    const init = function () {

        if (type == 'exit') {
            winner = activePlayer;
            looser = passivePlayer;
        } else if (['no_pawns', 'give_up'].includes(type)) {
            winner = passivePlayer;
            looser = activePlayer;
        } else if (type == 'draw') {
            tied = [activePlayer, passivePlayer];
        }

        if (winner) {
            winner.addWin();
        } else {
            tied.forEach(player => player.addDraw());
        }
    }();

    const getGameNumber = function () {
        return gameNumber;
    };

    const getType = function () {
        return type;
    };

    const getWinner = function () {
        return winner;
    };

    const getLooser = function () {
        return looser;
    };

    const toString = function () {

        const scoreString = `Game over!\nWinner: ${winner.getName()}\nType: ${type}`;
        return scoreString;
    };

    return Object.freeze(
        {
            getGameNumber: getGameNumber,
            getType: getType,
            getWinner: getWinner,
            getLooser: getLooser,
            toString: toString
        }
    );
};


const Scores = function () {
    let game;
    let ended;
    const scores = [];

    const setGame = function (mediator) {
        game = mediator;
    };

    const reset = function () {
        ended = false;
    };

    const add = function (code) {

        ended = true;

        const score = Score(
            {
                type: code,
                gameNumber: game.getNumber(),
                activePlayer: game.getActivePlayer(),
                passivePlayer: game.getActivePlayer(false)
            }
        );

        scores.push(score);
    };

    const gameEnded = function () {
        return ended;
    };

    const getLastScoreString = function () {
        return scores[scores.length - 1].toString();
    };

    const getScoresIterator = function () {
        return ArrayIterator(scores);
    };


    return Object.freeze(
        {
            setGame: setGame,

            reset: reset,
            add: add,
            ended: gameEnded,
            getLastScoreString: getLastScoreString,
            getScoresIterator: getScoresIterator
        }
    )
};

const Player = function ({ name, color, number }) {
    let score;

    const init = function() {

        score = 0;
    }();

    const addWin = function() {
        score += 1;
    };

    const setName = function (newName) {

        name = newName;
    };

    const getName = function() {
        return name;
    };

    const getColor = function() {
        return color;
    };

    const getNumber = function() {
        return number;
    };

    const getScore = function () {

        return score;
    };

    const toString = function() {
        let string = '';
        string += `Player ={ number: ${number}, name: ${name}, color: ${color}, score: ${score} }`;
        return string;
    };

    return Object.freeze(
        {
            addWin,
            setName,

            getName,
            getColor,
            getNumber,
            getScore,
            toString,
        }
    );
};


const Players = function (playersSpec) {
    const players = [];
    let activePosition;
    let passivePosition;

    const createPlayers = function () {
        for (const spec of playersSpec) {
            players.push(Player(spec));
        };
    };

    const initActivePosition = function () {

        passivePosition = 0;
        activePosition = 1;
    };

    const init = function () {

        createPlayers();
        initActivePosition();
    }();

    const changeActive = function () {
        if (activePosition == 0) {
            activePosition = 1;
            passivePosition = 0;
        } else {
            activePosition = 0;
            passivePosition = 1;
        }
        console.log('Active players number: ' + players[activePosition].getNumber());  // test
    };

    const getActive = function (active=true) {

        if (active) {
            return players[activePosition];
        } else {
            return players[passivePosition];
        }
    };

    const getActiveNumber = function (active=true) {

        return getActive(active).getNumber();
    };

    const getActiveColor = function (active=true) {

        return getActive(active).getColor();
    };

    const getPlayer = function (number) {
        return players[number - 1];
    };

    const getPlayersIterator = function () {
        return ArrayIterator(players);
    };

    const getAmount = function () {
        return players.length;
    };

    const setPlayerName = function ({ playerNumber, name }) {

        getPlayer(playerNumber).setName(name);
    };

    return Object.freeze(
        {
            changeActive,

            getActive,
            getActiveNumber,
            getActiveColor,
            getPlayer,
            getPlayersIterator,
            getAmount,

            setPlayerName,
        }
    );
};

const Session = function () {

    let players, scores, boardRepository;
    let gameNumber;

    const init = function () {

        gameNumber = 0;
    }();

    const setBoardRepository = function (repository) {

        boardRepository = repository;
    };

    const setPlayers = function (newPlayers) {
        players = newPlayers;
    };

    const setScores = function (newScores) {
        scores = newScores;
    };

    const setPlayerName = function (spec) {

        players.setPlayerName(spec);
    };

    const createBoard = function (id) {

        return boardRepository.createBoard(id);
    };

    const getPlayers = function () {
        return players;
    };

    const getPlayer = function(number) {
        return players.getPlayer(number);
    };

    const getPlayersIterator = function() {
        return players.getPlayersIterator();
    };

    const getScores = function () {
        return scores;
    };

    const getIncreasedGameNumber = function() {
        gameNumber += 1;
        return gameNumber;
    };

    return Object.freeze(
        {
            setBoardRepository,
            setPlayers,
            setScores,

            setPlayerName,

            createBoard,

            getPlayers,
            getPlayer,
            getPlayersIterator,
            getScores,
            getIncreasedGameNumber,
        }
    );
};


const SessionBuilder = function () {

    let session;

    const reset = function () {
        session = Session()
    };

    const setBoardRepository = function () {

        const repository = BoardRepository(boardSpec);
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

const Subject = function(getObject=false) {
    const observers = [];

    const attach = function (observer) {
        observers.push(observer);
    };

    const detach = function (observer) {
        const index = observers.indexOf(observer);
        if (index != -1) {
            observers.splice(index, 1);
        } else {}
    };

    const notify = function(code=false, object=false) {

        if (!object && getObject) {
            object = getObject();
        }

        for (let observer of observers) {
            observer.update({ code, object });
        }
    };

    return Object.freeze(
        {
            attach: attach,
            detach: detach,
            notify: notify,
        }
    );
};


const Model = function() {
    let subject, gameBuilder, sessionBuilder;
    let session, game;

    const getGameState = function () {

        if (game) {
            return game.getGameState();
        }
    };

    const createSubject = function () {

        subject = Subject(getGameState);
    };

    const createSessionBuilder = function () {

        sessionBuilder = SessionBuilder();
    };

    const createGameBuilder = function () {

        gameBuilder = GameBuilder();
    };

    const init = function () {

        createSubject();
        createSessionBuilder();
        createGameBuilder();
    }();

    const notify = function (code) {

        subject.notify(code);
    };

    const attach = function (observer) {

        subject.attach(observer);
    };

    const detach = function (observer) {

        subject.detach(observer);
    };

    const createSession = function({ playersSpec }) {

        const builder = sessionBuilder;

        const make = function () {
            builder.reset();
            builder.setBoardRepository();
            builder.setPlayers(playersSpec);
            builder.setScores();
        };

        make();
        session = builder.getResult();

        notify('createSession');
    };

    const createGame = function({ boardId, pawnsSpec }) {

        const builder = gameBuilder;

        const make = function () {
            builder.reset();
            builder.setState();
            builder.setOperator();
            builder.setEmptyOperator();
            builder.setNotify(notify);
            builder.setNumber(session.getIncreasedGameNumber());
            builder.setPlayers(session.getPlayers());
            builder.setBoard(session.createBoard(boardId));
            builder.setPawns(pawnsSpec);
            builder.setTurnCounter();
            builder.setMovesCounter();
            builder.setScores(session.getScores());
            builder.setCommands();
        };

        make();
        game = builder.getResult();

        notify('createGame');
    };

    const setPlayerName = function (spec) {

        session.setPlayerName(spec);
    };

    // game operations

    const nextTurn = function() {
        game.getGameOperator().nextTurn();
    };

    const selectNext = function () {
        game.getGameOperator().selectNext();
    };

    const hold = function () {
        game.getGameOperator().hold();
    };

    const moveUp = function () {
        game.getGameOperator().moveUp();
    };

    const moveDown = function () {
        game.getGameOperator().moveDown();
    };

    const moveLeft = function () {
        game.getGameOperator().moveLeft();
    };

    const moveRight = function () {
        game.getGameOperator().moveRight();
    };

    const click = function (fieldId) {
        game.getGameOperator().click(fieldId);
    };

    const undo = function () {
        game.getGameOperator().undo();
    };

    const redo = function () {
        game.getGameOperator().redo();
    };

    // state

    const getPlayer = function (number) {
        return session.getPlayer(number);
    };

    const getPlayersIterator = function() {
        return session.getPlayersIterator();
    };

    return Object.freeze(
        {
            attach,
            detach,

            createSession,
            createGame,
            setPlayerName,

            // game operations
            nextTurn,
            selectNext,
            hold,
            moveUp,
            moveDown,
            moveLeft,
            moveRight,
            click,
            undo,
            redo,

            // model state
            getPlayer,
            getPlayersIterator,
        }
    );
};


// APP LAYER


const App = function () {

    let model, view, controller;

    const createMVC = function() {

        model = Model();
        view = View();
        controller = Controller(model);
        controller.setSelf(controller);
        controller.setView(view);
    };

    const init = function () {

        createMVC();
    }();

    const createSession = function( playersSpec ) {

        controller.createSession({ playersSpec });
    };

    const createGame = function({ boardId, pawnsSpec }) {

        controller.createGame({ boardId, pawnsSpec });
    };


    return Object.freeze(
        {
            createSession,
            createGame,
        }
    );
};


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

        const boardId = 'board0701';
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