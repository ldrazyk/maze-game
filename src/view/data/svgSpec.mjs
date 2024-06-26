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
    "burger": {
        "name": "Burger Button",
        "viewBox": "0 0 256 256",
        "elements": {
            "rect1": {
                "type": "rect",
                "classList": "dark",
                "attributes": {
                    "x": "38",
                    "y": "46",
                    "width": "180",
                    "height": "36"
                },
                "parent": "svg"
            },
            "rect2": {
                "type": "rect",
                "classList": "dark",
                "attributes": {
                    "x": "38",
                    "y": "110",
                    "width": "180",
                    "height": "36"
                },
                "parent": "svg"
            },
            "rect3": {
                "type": "rect",
                "classList": "dark",
                "attributes": {
                    "x": "38",
                    "y": "174",
                    "width": "180",
                    "height": "36"
                },
                "parent": "svg"
            },
        }
    },
    "close": {
        "name": "Close Button",
        "viewBox": "0 0 1067 1067",
        "elements": {
            "line1": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M297.631,179.78l-117.851,117.851l589.256,589.256l117.851,-117.851l-589.256,-589.256Z"
                },
                "parent": "svg"
            },
            "line2": {
                "type": "path",
                "classList": "dark",
                "attributes": {
                    "d": "M886.887,297.631l-117.851,-117.851l-589.256,589.256l117.851,117.851l589.256,-589.256Z"
                },
                "parent": "svg"
            }
        }
    },
}

export default svgSpec;