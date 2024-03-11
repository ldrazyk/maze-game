import ButtonComponent from "./ButtonComponent.mjs";
import BoardComponent from "./BoardComponent.mjs";
import FieldComponent from "./FieldComponent.mjs";

const UiComponentsFactory = function () {
    
    const constructors = {
        button: ButtonComponent,
        board: BoardComponent,
        field: FieldComponent,
    };
    
    const append = function ({ parent, child }) {

        if (child instanceof Element) {

            parent.appendChild(child);
        } else {
            
            parent.appendChild(child.getMain());
        }
        return ;
    };

    const createComponent = function (spec) {

        const component = constructors[spec.type](spec);

        if (spec.parent) {

            append({ parent: spec.parent, child: component });
        }
    
        return component;
    };
    
    return Object.freeze(
        {
            createComponent,
            append,
        }
    );
};

export default UiComponentsFactory;