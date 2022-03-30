import {Property, Signal} from "@lab1/core";
import {Color} from "../Enums/Color";
import {Typo} from "../Enums/Typo";
import {Size} from "../Enums/Size";
import {Variant} from "../Enums/Variant";
import {Placement} from "../Enums/Placement";
import {Origin} from "../Enums/Origin";
import {OpenTo} from "../Enums/OpenTo";
import {InputType} from "../Enums/InputType";
import {Edge} from "../Enums/Edge";
import {Margin} from "../Enums/Margin";
import {MaterialMouseEvent} from "../Enums/MaterialMouseEvent";
import {PickerVariant} from "../Enums/PickerVariant";
import {Adornment} from "../Enums/Adornment";
import {Orientation} from "../Enums/Orientation";
import {OverflowBehavior} from "../Enums/OverflowBehavior";
import {Text} from "../Components/Typography/Text";
import {TimeEditMode} from "../Enums/TimeEditMode";
import {InputMode} from "../Enums/InputMode";
import {Breakpoint} from "../Enums/Breakpoint";
import {HorizontalAlignment} from "../Enums/HorizontalAlignment";
import {SortDirection} from "../Enums/SortDirection";
import {Position} from "../Enums/Position";
import {TabHeaderPosition} from "../Enums/TabHeaderPosition";
import {MaterialAlign} from "../Enums/MaterialAlign";
import {ListItem} from "../Components/ListView/ListItem";
import {DividerType} from "../Enums/DividerType";
import {Justify} from "../Enums/Justify";
import {Page} from "../Enums/Page";

export type TypeAdornment = Property<Adornment> | Adornment
export type TypeMaterialAlign = Property<MaterialAlign> | MaterialAlign
export type TypeBreakpoint= Property<Breakpoint> | Breakpoint
export type TypeColor = Property<Color> | Color;
export type TypeColorOrUndefined = Property<Color | undefined> | Property<Color> | Color
export type TypeDividerType = Property<DividerType> | DividerType;
export type TypeEdgeOrUndefined = Property<Edge | undefined> | Property<Edge> | Edge
export type TypeTabHeaderPosition = Property<TabHeaderPosition> | TabHeaderPosition
export type TypeHorizontalAlignment= Property<HorizontalAlignment> | HorizontalAlignment
export type TypeInputMode = Property<InputMode> | InputMode
export type TypeInputType = Property<InputType> | InputType
export type TypeJustify = Property<Justify> | Justify
export type TypeMargin = Property<Margin> | Margin
export type TypeMaterialMouseEvent = Property<MaterialMouseEvent> | MaterialMouseEvent
export type TypeMudTextOrUndefined = Property<Text | undefined> | Property<Text> | Text
export type TypeOpenTo = Property<OpenTo> | OpenTo
export type TypeOrientation = Property<Orientation> | Orientation
export type TypeOrigin = Property<Origin> | Origin
export type TypeOverflowBehavior = Property<OverflowBehavior> | OverflowBehavior
export type TypePickerVariant = Property<PickerVariant> | PickerVariant
export type TypePlacement = Property<Placement> | Placement
export type TypePosition = Property<Position> | Position
export type TypeSortDirection=Property<SortDirection> | SortDirection
export type TypeTimeEditMode = Property<TimeEditMode> | TimeEditMode
export type TypeTypo = Property<Typo> | Typo;
export type TypeSize = Property<Size> | Size
export type TypeVariant = Property<Variant> | Variant

//signals types
export type TypeSignal_ListItem = (Signal<(listItem: ListItem) => void>) | ((listItem: ListItem) => void)
export type TypeSignal_Page = (Signal<(page: Page) => void>) | ((page: Page) => void)
