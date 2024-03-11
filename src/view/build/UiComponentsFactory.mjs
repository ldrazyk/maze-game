import BoardComponent from "../components/BoardComponent.mjs";
import ButtonComponent from "../components/ButtonComponent.mjs";
import ControlPanelComponent from "../components/ControlPanelComponent.mjs";
import FieldComponent from "../components/FieldComponent.mjs";
import InfoPanel from "../components/InfoPanel.mjs";
import PlayerPanel from "../components/PlayerPanel.mjs";
import MenuComponent from "../components/menu/MenuComponent.mjs";
import ColorsPanel from "../components/menu/ColorsPanel.mjs";
import RulesPanel from "../components/menu/RulesPanel.mjs";
import ContainerComponent from "../components/containers/ContainerComponent.mjs"
import HiddenContainer from "../components/containers/HiddenContainer.mjs"
import WindowContainer from "../components/containers/WindowContainer.mjs"

const UiComponentsFactory = function () {
    
    const constructors = {
        board: BoardComponent,
        button: ButtonComponent,
        controlPanel: ControlPanelComponent,
        field: FieldComponent,
        infoPanel: InfoPanel,
        playerPanel: PlayerPanel,
        menu: MenuComponent,
        colorsPanel: ColorsPanel,
        rulesPanel: RulesPanel,
        container: ContainerComponent,
        hiddenContainer: HiddenContainer,
        windowContainer: WindowContainer,
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