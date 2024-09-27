import BoardComponent from "../components/BoardComponent.mjs";
import ButtonComponent from "../components/ButtonComponent.mjs";
import ControlPanelComponent from "../components/ControlPanelComponent.mjs";
import FieldComponent from "../components/FieldComponent.mjs";
import InfoPanel from "../components/InfoPanel.mjs";
import PlayerPanel from "../components/PlayerPanel.mjs";
import MenuComponent from "../components/menu/MenuComponent.mjs";
import ColorsPanel from "../components/menu/ColorsPanel.mjs";
import ChangeColorsComponent from "../components/menu/ChangeColorsComponent.mjs";
import EndGamePanel from "../components/menu/EndGamePanel.mjs";
import CreateGamePanel from "../components/create_game/CreateGamePanel.mjs";
import BoardSetupPanel from "../components/create_game/BoardSetupPanel.mjs";
import PawnsSetupPanel from "../components/create_game/PawnsSetupPanel.mjs";
import PawnAmountComponent from "../components/create_game/PawnAmountComponent.mjs";
import ButtonCreateGame from "../components/create_game/ButtonCreateGame.mjs";
import CollectionComponent from "../components/create_game/CollectionComponent.mjs";
import BoardPreviewPanel from "../components/create_game/BoardPreviewPanel.mjs";
import BoardDummyComponent from "../components/menu/BoardDummyComponent.mjs";
import GridDummyComponent from "../components/menu/GridDummyComponent.mjs";
import RulesPanel from "../components/menu/RulesPanel.mjs";
import EmptyPanel from "../components/menu/EmptyPanel.mjs";
import ContainerComponent from "../components/containers/ContainerComponent.mjs"
import DropdownContainer from "../components/containers/DropdownContainer.mjs"
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
        changeColors: ChangeColorsComponent,
        rulesPanel: RulesPanel,
        endGamePanel: EndGamePanel,
        createGamePanel: CreateGamePanel,
        boardSetupPanel: BoardSetupPanel,
        pawnsSetupPanel: PawnsSetupPanel,
        pawnAmountComponent: PawnAmountComponent,
        buttonCreateGame: ButtonCreateGame,
        collectionComponent: CollectionComponent,
        boardPreviewPanel: BoardPreviewPanel,
        boardDummy: BoardDummyComponent,
        gridDummy: GridDummyComponent,
        emptyPanel: EmptyPanel,
        container: ContainerComponent,
        dropdownContainer: DropdownContainer,
        windowContainer: WindowContainer,
    };
    
    const append = function ({ parent, child }) {

        if (child instanceof Element) {

            parent.appendChild(child);
        } else {

            parent.appendChild(child.getMain());
        }
    };

    const remove = function (component) {

        let element;

        if (component instanceof Element) {

            element = component;
        } else {
            
            element = component.getMain();
        }

        console.log('Element removed: ');
        console.log(element);
        element.remove();
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
            remove,
        }
    );
};

export default UiComponentsFactory;