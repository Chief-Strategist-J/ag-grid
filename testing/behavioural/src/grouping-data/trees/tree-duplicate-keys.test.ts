import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

import { TestGridsManager } from '../../test-utils';
import { TreeDiagram } from './tree-test-utils';

const getDataPath = (data: any) => data.orgHierarchy;

describe('ag-grid tree duplicate keys', () => {
    const gridsManager = new TestGridsManager({ modules: [ClientSideRowModelModule, RowGroupingModule] });

    const treeDiagramOptions = {
        checkDom: 'myGrid',
    };

    let consoleWarnSpy: jest.SpyInstance;

    beforeEach(() => {
        gridsManager.reset();
    });

    afterEach(() => {
        gridsManager.reset();
        consoleWarnSpy?.mockRestore();
    });

    test('preserves the first root child duplicate, and can recover when renamed', async () => {
        const rowData = [
            { id: 'KtTkR5g-0', orgHierarchy: ['A'] },
            { id: 'X80CJzw-1', orgHierarchy: ['A'] },
        ];

        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

        const api = gridsManager.createGrid('myGrid', {
            columnDefs: [],
            treeData: true,
            animateRows: false,
            groupDefaultExpanded: -1,
            rowData,
            getDataPath,
            getRowId: (params) => params.data.id,
        });

        expect(consoleWarnSpy).toHaveBeenCalledWith(
            'AG Grid: duplicate group keys for row data, keys should be unique',
            [rowData[0].id, rowData[0], rowData[1]]
        );
        consoleWarnSpy?.mockRestore();

        new TreeDiagram(api, '', treeDiagramOptions).check(`
            ROOT_NODE_ID ROOT id:ROOT_NODE_ID
            └── A LEAF id:KtTkR5g-0
        `);

        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

        api.setGridOption('rowData', [
            { id: 'KtTkR5g-0', orgHierarchy: ['A'] },
            { id: 'X80CJzw-1', orgHierarchy: ['B'] },
        ]);

        expect(consoleWarnSpy).not.toHaveBeenCalled();
        consoleWarnSpy?.mockRestore();

        new TreeDiagram(api, 'after update', treeDiagramOptions).check(`
            ROOT_NODE_ID ROOT id:ROOT_NODE_ID
            ├── A LEAF id:KtTkR5g-0
            └── B LEAF id:X80CJzw-1
        `);
    });

    test('can handle duplicate leafs of a group, and can recover when moved', async () => {
        const rowData = [
            { id: 'j4SDrJw-0', orgHierarchy: ['A', 'B'] },
            { id: 'BexVZIg-1', orgHierarchy: ['A', 'B'] },
        ];

        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

        const api = gridsManager.createGrid('myGrid', {
            columnDefs: [],
            treeData: true,
            animateRows: false,
            groupDefaultExpanded: -1,
            rowData,
            getDataPath,
            getRowId: (params) => params.data.id,
        });

        expect(consoleWarnSpy).toHaveBeenCalledWith(
            'AG Grid: duplicate group keys for row data, keys should be unique',
            [rowData[0].id, rowData[0], rowData[1]]
        );
        consoleWarnSpy?.mockRestore();

        new TreeDiagram(api, '', treeDiagramOptions).check(`
            ROOT_NODE_ID ROOT id:ROOT_NODE_ID
            └─┬ A filler id:row-group-0-A
            · └── B LEAF id:j4SDrJw-0
        `);

        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

        api.applyTransaction({
            update: [{ id: rowData[1].id, orgHierarchy: ['A', 'B', 'C'] }],
        });

        expect(consoleWarnSpy).not.toHaveBeenCalled();
        consoleWarnSpy?.mockRestore();

        new TreeDiagram(api, 'updated', treeDiagramOptions).check(`
            ROOT_NODE_ID ROOT id:ROOT_NODE_ID
            └─┬ A filler id:row-group-0-A
            · └─┬ B GROUP id:j4SDrJw-0
            · · └── C LEAF id:BexVZIg-1
        `);
    });

    test('preserves the first duplicate, but can recover renaming it, allowing swapping', async () => {
        const rowData = [
            { id: 'UzWrPgX-0', orgHierarchy: ['A', 'B'] },
            { id: 'q7lpQ9A-1', orgHierarchy: ['A', 'B', 'C'] },
            { id: 'zIJkvFA-2', orgHierarchy: ['A', 'B'] },
            { id: 'NXtKeUA-3', orgHierarchy: ['A', 'B', 'D'] },
        ];

        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

        const api = gridsManager.createGrid('myGrid', {
            columnDefs: [],
            treeData: true,
            animateRows: false,
            groupDefaultExpanded: -1,
            rowData,
            getDataPath,
            getRowId: (params) => params.data.id,
        });

        expect(consoleWarnSpy).toHaveBeenCalledWith(
            'AG Grid: duplicate group keys for row data, keys should be unique',
            [rowData[0].id, rowData[0], rowData[2]]
        );

        consoleWarnSpy?.mockRestore();

        new TreeDiagram(api, '', treeDiagramOptions).check(`
            ROOT_NODE_ID ROOT id:ROOT_NODE_ID
            └─┬ A filler id:row-group-0-A
            · └─┬ B GROUP id:UzWrPgX-0
            · · ├── C LEAF id:q7lpQ9A-1
            · · └── D LEAF id:NXtKeUA-3
        `);

        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

        api.setGridOption('rowData', [
            { id: 'UzWrPgX-0', orgHierarchy: ['A', 'X'] },
            { id: 'q7lpQ9A-1', orgHierarchy: ['A', 'B', 'C'] },
            { id: 'zIJkvFA-2', orgHierarchy: ['A', 'B'] },
            { id: 'NXtKeUA-3', orgHierarchy: ['A', 'B', 'D'] },
        ]);

        expect(consoleWarnSpy).not.toHaveBeenCalled();
        consoleWarnSpy?.mockRestore();

        new TreeDiagram(api, 'updated', treeDiagramOptions).check(`
            ROOT_NODE_ID ROOT id:ROOT_NODE_ID
            └─┬ A filler id:row-group-0-A
            · ├── X LEAF id:UzWrPgX-0
            · └─┬ B GROUP id:zIJkvFA-2
            · · ├── C LEAF id:q7lpQ9A-1
            · · └── D LEAF id:NXtKeUA-3
        `);
    });

    test('allow swapping two nodes, without warning', () => {
        const rowData = [
            { id: 'B5XPAQx-0', orgHierarchy: ['A', 'B'] },
            { id: '7KmRgOg-2', orgHierarchy: ['A', 'C'] },
        ];

        const api = gridsManager.createGrid('myGrid', {
            columnDefs: [],
            treeData: true,
            animateRows: false,
            groupDefaultExpanded: -1,
            rowData,
            getDataPath,
            getRowId: (params) => params.data.id,
        });

        new TreeDiagram(api, '', treeDiagramOptions).check(`
            ROOT_NODE_ID ROOT id:ROOT_NODE_ID
            └─┬ A filler id:row-group-0-A
            · ├── B LEAF id:B5XPAQx-0
            · └── C LEAF id:7KmRgOg-2
        `);

        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

        api.applyTransaction({
            update: [
                { id: rowData[0].id, orgHierarchy: ['A', 'C'] },
                { id: rowData[1].id, orgHierarchy: ['A', 'B'] },
            ],
        });

        expect(consoleWarnSpy).not.toHaveBeenCalled();
        consoleWarnSpy?.mockRestore();

        new TreeDiagram(api, '', treeDiagramOptions).check(`
            ROOT_NODE_ID ROOT id:ROOT_NODE_ID
            └─┬ A filler id:row-group-0-A
            · ├── C LEAF id:B5XPAQx-0
            · └── B LEAF id:7KmRgOg-2
        `);
    });

    test('sourceRowIndex of duplicates matters, and when a duplicate over many duplicates is moved the right one is used as main row', async () => {
        const rowData = [
            { id: 'xRow-0', orgHierarchy: ['A', 'B'] },
            { id: 'xRow-1', orgHierarchy: ['A', 'B'] },
            { id: 'xRow-2', orgHierarchy: ['A', 'B'] },
            { id: 'xRow-3', orgHierarchy: ['A', 'B'] },
            { id: 'xRow-4', orgHierarchy: ['A', 'B'] },
        ];

        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

        const api = gridsManager.createGrid('myGrid', {
            columnDefs: [],
            treeData: true,
            animateRows: false,
            groupDefaultExpanded: -1,
            rowData,
            getDataPath,
            getRowId: (params) => params.data.id,
        });

        new TreeDiagram(api, 'initial', treeDiagramOptions).check(`
            ROOT_NODE_ID ROOT id:ROOT_NODE_ID
            └─┬ A filler id:row-group-0-A
            · └── B LEAF id:xRow-0
        `);

        expect(consoleWarnSpy).toHaveBeenCalled();

        api.setGridOption('rowData', [
            { id: 'xRow-2', orgHierarchy: ['A', 'B'] },
            { id: 'xRow-1', orgHierarchy: ['A', 'B'] },
            { id: 'xRow-0', orgHierarchy: ['A', 'B'] },
            { id: 'xRow-3', orgHierarchy: ['A', 'B'] },
            { id: 'xRow-4', orgHierarchy: ['A', 'B'] },
        ]);

        new TreeDiagram(api, 'update 1', treeDiagramOptions).check(`
            ROOT_NODE_ID ROOT id:ROOT_NODE_ID
            └─┬ A filler id:row-group-0-A
            · └── B LEAF id:xRow-2
        `);

        api.setGridOption('rowData', [
            { id: 'xRow-3', orgHierarchy: ['A', 'B'] },
            { id: 'xRow-4', orgHierarchy: ['A', 'B'] },
            { id: 'xRow-0', orgHierarchy: ['A', 'B'] },
            { id: 'xRow-2', orgHierarchy: ['A', 'C'] },
            { id: 'xRow-1', orgHierarchy: ['A', 'C'] },
        ]);

        new TreeDiagram(api, 'update 2', treeDiagramOptions).check(`
            ROOT_NODE_ID ROOT id:ROOT_NODE_ID
            └─┬ A filler id:row-group-0-A
            · ├── B LEAF id:xRow-3
            · └── C LEAF id:xRow-2
        `);

        api.setGridOption('rowData', [
            { id: 'xRow-2', orgHierarchy: ['A', 'C'] },
            { id: 'xRow-1', orgHierarchy: ['A', 'C'] },
            { id: 'xRow-3', orgHierarchy: ['A', 'C'] },
            { id: 'xRow-0', orgHierarchy: ['A', 'B'] },
            { id: 'xRow-4', orgHierarchy: ['A', 'C'] },
            { id: 'xRow-5', orgHierarchy: ['A', 'B'] },
        ]);

        new TreeDiagram(api, 'update 3', treeDiagramOptions).check(`
            ROOT_NODE_ID ROOT id:ROOT_NODE_ID
            └─┬ A filler id:row-group-0-A
            · ├── C LEAF id:xRow-2
            · └── B LEAF id:xRow-0
        `);

        consoleWarnSpy?.mockRestore();
    });
});
