import {Lab1, IComponent} from "@lab1/core";
import {
    AlertProps, AppBarProps, AutoCompleteProps, AvatarProps, BadgeProps, BreadcrumbsProps, ButtonGroupProps, ButtonProps, CardProps, CarouselProps, ChartProps,
    CheckBoxProps, ChipProps, ChipSetProps, CollapseProps, ColorPickerProps, ContainerProps, DataGridProps, DatePickerProps, DividerProps, DrawerProps, ExpansionPanelProps,
    FieldProps, FileUploaderProps, FocusTrapProps, FormProps, GridProps, HiddenProps, HighlighterProps, IconProps, InputControlProps, InputProps, LinkProps, ListViewProps,
    MenuProps, MessageBoxProps, TextProps, NavMenuProps, NumericFieldProps, OverlayProps, PageContentNavigationProps, PaginationProps, PaperProps, PickerProps, PopoverProps,
    ProgressCircularProps, ProgressLinearProps, RadioProps, RatingProps, ScrollToTopProps, SelectProps, SkeletonProps, SliderProps, SnackBarProps, SpacerProps,
    SparklineProps, SwipeAreaProps, SwitchProps, TableProps, SimpleTableProps, TabsProps, TextFieldProps, TimelineProps, TimePickerProps, ToolBarProps, TooltipProps,
    TreeViewProps, VirtualizeProps,
    CheckBox, Button, Alert, AppBar, AutoComplete, Avatar, Badge, Breadcrumbs, ButtonGroup, Card, Carousel, Chart, Chip, ChipSet, Collapse, ColorPicker, Container, DataGrid, DatePicker,
    Divider, Drawer, ExpansionPanel, Field, FileUploader, FocusTrap, Form, Grid, Hidden, Highlighter, Icon, Input, InputControl, Link, ListView, Menu, MessageBox, NavMenu, NumericField, Overlay,
    PageContentNavigation, Pagination, Paper, Picker, Popover, ProgressCircular, ProgressLinear, Radio, Rating, ScrollToTop, Select, Skeleton, Slider, SnackBar, Spacer, Sparkline, SwipeArea, Switch,
    Table, SimpleTable, Tabs, TextField, Timeline, TimePicker, ToolBar, TreeView, Text, Virtualize, PickerToolBar, Tooltip, PickerToolBarProps, PickerContentProps, PickerContent, IconButton,
    FabButton, IconButtonProps, FabButtonProps, RadioGroup, ListItem, GridItem, SelectItem, MenuItem, RadioGroupProps, ListItemProps, GridItemProps, MenuItemProps, SelectItemProps
} from "../MaterialExports";
import { Filled } from "../Icons/Material/Filled";
import { Outlined } from "../Icons/Material/Outlined";
import { Rounded } from "../Icons/Material/Rounded";
import { Sharp } from "../Icons/Material/Sharp";
import { TwoTone } from "../Icons/Material/TwoTone";

export class Icons{
    readonly Filled=new Filled();
    readonly Outlined=new Outlined();
    readonly Rounded=new Rounded();
    readonly Sharp=new Sharp();
    readonly TwoTone=new TwoTone();
}

export class Material {

    static readonly Icons=new Icons();

    static Alert(props: AlertProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Alert, props);}
    static AppBar(props: AppBarProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(AppBar, props);}
    static AutoComplete<T=string>(props: AutoCompleteProps<T>, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(AutoComplete, props);}
    static Avatar(props: AvatarProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Avatar, props);}
    static Badge(props: BadgeProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Badge, props);}
    static Breadcrumbs(props: BreadcrumbsProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Breadcrumbs, props);}
    static Button(props: ButtonProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Button, props);}
    static ButtonGroup(props: ButtonGroupProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(ButtonGroup, props);}
    static CardProps(props: CardProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Card, props);}
    static Carousel(props: CarouselProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Carousel, props);}
    static Chart(props: ChartProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Chart, props);}
    static CheckBox<T>(props: CheckBoxProps<T>, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(CheckBox, props);}
    static Chip(props: ChipProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Chip, props);}
    static ChipSet(props: ChipSetProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(ChipSet, props);}
    static Collapse(props: CollapseProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Collapse, props);}
    static ColorPicker(props: ColorPickerProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(ColorPicker, props);}
    static Container(props: ContainerProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Container, props);}
    static DataGrid(props: DataGridProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(DataGrid, props);}
    static DatePicker(props: DatePickerProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(DatePicker, props);}
    static Divider(props: DividerProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Divider, props);}
    static Drawer(props: DrawerProps, key: string = 'defaultKey'): IComponent{return Lab1.readProperties(Drawer, props);}
    static ExpansionPanel(props: ExpansionPanelProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(ExpansionPanel, props);}
    static FabButton(props: FabButtonProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(FabButton, props);}
    static Field(props: FieldProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Field, props);}
    static FileUploader(props: FileUploaderProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(FileUploader, props);}
    static FocusTrap(props: FocusTrapProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(FocusTrap, props);}
    static Form(props: FormProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Form, props);}
    static Grid(props: GridProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Grid, props);}
    static GridItem(props: GridItemProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(GridItem, props);}
    static Hidden(props: HiddenProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Hidden, props);}
    static Highlighter(props: HighlighterProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Highlighter, props);}
    static Icon(props: IconProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Icon, props);}
    static IconButton(props: IconButtonProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(IconButton, props);}
    static Input<T>(props: InputProps<T>, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Input, props);}
    static InputControl(props: InputControlProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(InputControl, props);}
    static Link(props: LinkProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Link, props);}
    static ListItem(props: ListItemProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(ListItem, props);}
    static ListView(props: ListViewProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(ListView, props);}
    static Menu(props: MenuProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Menu, props);}
    static MenuItem(props: MenuItemProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(MenuItem, props);}
    static MessageBox(props: MessageBoxProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(MessageBox, props);}
    static NavMenu(props: NavMenuProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(NavMenu, props);}
    static NumericField(props: NumericFieldProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(NumericField, props);}
    static Overlay(props: OverlayProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Overlay, props);}
    static PageContentNavigation(props: PageContentNavigationProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(PageContentNavigation, props);}
    static Pagination(props: PaginationProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Pagination, props);}
    static Paper(props: PaperProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Paper, props);}
    static Picker<T>(props: PickerProps<T>, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Picker, props);}
    static PickerContent(props: PickerContentProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(PickerContent, props);}
    static PickerToolBar(props: PickerToolBarProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(PickerToolBar, props);}
    static Popover(props: PopoverProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Popover, props);}
    static ProgressCircular(props: ProgressCircularProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(ProgressCircular, props);}
    static ProgressLinear(props: ProgressLinearProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(ProgressLinear, props);}
    static Radio<T=string>(props: RadioProps<T>, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Radio, props);}
    static RadioGroup<T>(props: RadioGroupProps<T>, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(RadioGroup, props);}
    static Rating(props: RatingProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Rating, props);}
    static ScrollToTop(props: ScrollToTopProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(ScrollToTop, props);}
    static Select<T=string>(props: SelectProps<T>, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Select, props);}
    static SelectItem<T=string>(props: SelectItemProps<T>, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(SelectItem, props);}
    static Skeleton(props: SkeletonProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Skeleton, props);}
    static SimpleTable(props: SimpleTableProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(SimpleTable, props);}
    static Slider(props: SliderProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Slider, props);}
    static SnackBar(props: SnackBarProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(SnackBar, props);}
    static Spacer(props: SpacerProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Spacer, props);}
    static Sparkline(props: SparklineProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Sparkline, props);}
    static SwipeArea(props: SwipeAreaProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(SwipeArea, props);}
    static Switch<T>(props: SwitchProps<T>, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Switch, props);}
    static Table<T>(props: TableProps<T>, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Table, props);}
    static Tabs(props: TabsProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Tabs, props);}
    static Text(props: TextProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Text, props);}
    static TextField<T = string>(props: TextFieldProps<T>, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(TextField, props);}
    static Timeline(props: TimelineProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Timeline, props);}
    static TimePicker(props: TimePickerProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(TimePicker, props);}
    static ToolBar(props: ToolBarProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(ToolBar, props);}
    static Tooltip(props: TooltipProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Tooltip, props);}
    static TreeView<T>(props: TreeViewProps<T>, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(TreeView, props);}
    static MudText(props: TextProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Text, props);}
    static Virtualize(props: VirtualizeProps, key: string = 'defaultKey'): IComponent {return Lab1.readProperties(Virtualize, props);}
}
