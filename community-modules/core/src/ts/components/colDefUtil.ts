export class ColDefUtil {
    public static STRING_PROPERTIES = [
        'headerName',
        'columnGroupShow',
        'headerClass',
        'toolPanelClass',
        'headerValueGetter',
        'pivotKeys',
        'groupId',
        'colId',
        'sort',
        'initialSort',
        'field',
        'type',
        'tooltipComponent',
        'tooltipField',
        'headerTooltip',
        'cellClass',
        'showRowGroup',
        'filter',
        'initialAggFunc',
        'defaultAggFunc',
        'aggFunc',
        'pinned',
        'initialPinned',
        'chartDataType',
        'cellEditorPopupPosition'
    ];

    public static OBJECT_PROPERTIES = [
        'headerGroupComponent',
        'headerGroupComponentFramework',
        'headerGroupComponentParams',
        'cellStyle',
        'cellRenderer',
        'cellRendererParams',
        'cellRendererFramework',
        'cellEditor',
        'cellEditorFramework',
        'cellEditorParams',
        'pinnedRowCellRendererFramework',
        'pinnedRowCellRendererParams',
        'filterFramework',
        'filterParams',
        'pivotValueColumn',
        'headerComponent',
        'headerComponentFramework',
        'headerComponentParams',
        'floatingFilterComponent',
        'floatingFilterComponentParams',
        'floatingFilterComponentFramework',
        'floatingFilterFramework',
        'tooltipComponent',
        'tooltipComponentParams',
        'tooltipComponentFramework',
        'refData',
        'columnsMenuParams'
    ];

    public static ARRAY_PROPERTIES = [
        'children',
        'sortingOrder',
        'allowedAggFuncs',
        'menuTabs',
        'pivotTotalColumnIds',
        'cellClassRules',
        'icons'];

    public static NUMBER_PROPERTIES = [
        'sortedAt',
        'sortIndex',
        'initialSortIndex',
        'flex',
        'initialFlex',
        'width',
        'initialWidth',
        'minWidth',
        'maxWidth',
        'rowGroupIndex',
        'initialRowGroupIndex',
        'pivotIndex',
        'initialPivotIndex'];

    public static BOOLEAN_PROPERTIES = [
        'suppressCellFlash',
        'suppressColumnsToolPanel',
        'suppressFiltersToolPanel',
        'openByDefault',
        'marryChildren',
        'hide',
        'initialHide',
        'rowGroup',
        'initialRowGroup',
        'pivot',
        'initialPivot',
        'checkboxSelection',
        'headerCheckboxSelection',
        'headerCheckboxSelectionFilteredOnly',
        'suppressMenu',
        'suppressMovable',
        'lockPosition',
        'lockVisible',
        'lockPinned',
        'unSortIcon',
        'suppressSizeToFit',
        'suppressAutoSize',
        'enableRowGroup',
        'enablePivot',
        'enableValue',
        'editable',
        'suppressPaste',
        'suppressNavigable',
        'enableCellChangeFlash',
        'rowDrag',
        'dndSource',
        'autoHeight',
        'wrapText',
        'sortable',
        'resizable',
        'singleClickEdit',
        'floatingFilter',
        'cellEditorPopup',
        'suppressFillHandle'
    ];

    public static FUNCTION_PROPERTIES = [
        'dndSourceOnRowDrag',
        'valueGetter',
        'valueSetter',
        'filterValueGetter',
        'keyCreator',
        'pinnedRowCellRenderer',
        'valueFormatter',
        'pinnedRowValueFormatter',
        'valueParser',
        'comparator',
        'equals',
        'pivotComparator',
        'suppressKeyboardEvent',
        'suppressHeaderKeyboardEvent',
        'colSpan',
        'rowSpan',
        'getQuickFilterText',
        'newValueHandler',
        'onCellValueChanged',
        'onCellClicked',
        'onCellDoubleClicked',
        'onCellContextMenu',
        'rowDragText',
        'tooltipValueGetter',
        'tooltipComponent',
        'tooltipComponentFramework',
        'cellRendererSelector',
        'cellEditorSelector'
    ];

    public static ALL_PROPERTIES = [
        ...ColDefUtil.ARRAY_PROPERTIES,
        ...ColDefUtil.OBJECT_PROPERTIES,
        ...ColDefUtil.STRING_PROPERTIES,
        ...ColDefUtil.NUMBER_PROPERTIES,
        ...ColDefUtil.FUNCTION_PROPERTIES,
        ...ColDefUtil.BOOLEAN_PROPERTIES
    ];

    // used when doing property checks - this causes noise when using frameworks which can add their own fw specific
    // properties to colDefs, gridOptions etc
    public static FRAMEWORK_PROPERTIES = [
        '__ob__',
        '__v_skip',
        '__metadata__',
        'mappedColumnProperties',
        'hasChildColumns',
        'toColDef',
        'createColDefFromGridColumn'
    ];
}
