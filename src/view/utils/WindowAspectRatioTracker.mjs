const WindowAspectRatioTracker = function ({ factory, test=false }) {
    
    const state = factory.createState();
    let root;
    let testElement;
    let mediator;

    const setRoot = function () {
    
        root = mediator.getContainer('root');
    };

    const createTestElement = function () {
    
        testElement = factory.createElement(
            {
                type: 'div',
                classList: 'test',
                parent: root,
            }
        );

        const addTestState = function () {

            const showAspectRatioInTest = function (aspectRatio) {
            
                testElement.textContent = aspectRatio;
            };
        
            state.add({
                name: 'aspectRatio', 
                value: '', 
                onChange: showAspectRatioInTest
            });
        };

        addTestState();
    };

    const addStates = function () {
        
        const updateRootElement = function (aspectRatioClass) {
        
            mediator.updateRootClass(aspectRatioClass);
        };

        state.add({
            name: 'aspectRatioClass', 
            value: '', 
            onChange: updateRootElement
        });
    };

    const onWindowResize = function () {

        const updateAspectRation = function () {
        
            const getWindowAspectRatio = function () {
            
                return window.innerWidth / window.innerHeight;
            };
    
            const getAspectRatioClass = function (aspectRatio) {
    
                let aspectRatioClass;
            
                if (aspectRatio >= 3.28) {
    
                    aspectRatioClass = 'landscape wide very much final';
    
                } else if (aspectRatio >= 2.5) {
    
                    aspectRatioClass = 'landscape wide very much';
    
                } else if (aspectRatio >= 2.3) {
    
                    aspectRatioClass = 'landscape wide very';
    
                } else if (aspectRatio >= 2) {
    
                    aspectRatioClass = 'landscape wide';
    
                } else if (aspectRatio >= 1.5) {
    
                    aspectRatioClass = 'landscape';
                    
                } else if (aspectRatio >= 1) {
    
                    aspectRatioClass = 'landscape narrow square';

                } else if (aspectRatio >= 0.6) {
    
                    aspectRatioClass = 'portrait wide square';

                } else if (aspectRatio >= 0.5) {
    
                    aspectRatioClass = 'portrait';
                    
                } else if (aspectRatio >= 0.45) {

                    aspectRatioClass = 'portrait narrow';
                    
                } else if (aspectRatio >= 0.35) {

                    aspectRatioClass = 'portrait narrow very';

                } else if (aspectRatio >= 0.27) {

                    aspectRatioClass = 'portrait narrow very much';

                } else {

                    aspectRatioClass = 'portrait narrow very much final';
                }
    
                return aspectRatioClass;
            };

            const aspectRatio = getWindowAspectRatio();
            state.update('aspectRatioClass', getAspectRatioClass(aspectRatio));

            if (test) {
                state.update('aspectRatio', aspectRatio);
            }
        };

        updateAspectRation();
    };

    const addWEvents = function () {
    
        window.addEventListener('resize', onWindowResize);
    };



    const init = function () {
    
        setRoot();
        if (test) {
            createTestElement();
        }
        addStates();
        onWindowResize();
        addWEvents();
    };

    const setMediator = function (newMediator) {
    
        mediator = newMediator;
    };
    
    
    return Object.freeze(
        {
            setMediator,
            init,
        }
    );
};

export default WindowAspectRatioTracker;