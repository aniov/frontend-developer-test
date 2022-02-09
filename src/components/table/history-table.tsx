import * as React from 'react';
import moment from "moment";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel
} from "@material-ui/core";
import {IFetchStatus} from "../App";
import ActionButton from "../action/action-button";
import './history.css';

interface IRowData {
    id: string;
    timestamp: number;
    diff: {
        field: string;
        oldValue: string;
        newValue: string
    }[]
}

interface IHistoryTable {
    tableData: IRowData[];
    fetchData: () => void;
    fetchStatus: IFetchStatus;
    isProject?: boolean;
}

const SORT_ASC = 'asc';
const SORT_DESC = 'desc';

type SORT_ASC = typeof SORT_ASC;
type SORT_DESC = typeof SORT_DESC;

const ascComparator = (a: IRowData, b: IRowData) => {
    return a.timestamp - b.timestamp;
};

const descComparator = (a: IRowData, b: IRowData) => {
    return b.timestamp - a.timestamp;
};

const HistoryTable: React.FC<IHistoryTable> = ({tableData, fetchData, fetchStatus, isProject}) => {

    const [sortOrder, setSortOrder] = React.useState<SORT_ASC | SORT_DESC>(SORT_DESC);

    React.useEffect(() => {
        setSortOrder(SORT_DESC);
    }, [tableData]);

    const sortedData = React.useMemo(() => {
        // or we can use lodash _.orderBy(tableData, ['timestamp'], sortOrder)
        const compareFunction = sortOrder === SORT_ASC ? ascComparator : descComparator;
        return tableData.sort(compareFunction);
    }, [tableData, sortOrder]);

    const handleSort = () => {
        setSortOrder(sortOrder === SORT_ASC ? SORT_DESC : SORT_ASC);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell key="date">
                            <TableSortLabel
                                active={true}
                                direction={sortOrder}
                                onClick={handleSort}
                            >
                                Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell key="id">{isProject ? 'Project' : 'User'} ID</TableCell>
                        <TableCell key="old-value">Old value</TableCell>
                        <TableCell key="new-value">New value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData.map(rowData => (
                        <TableRow key={rowData.id}>
                            <TableCell>{moment(rowData.timestamp).format("YYYY-MM-DD")}</TableCell>
                            <TableCell>{rowData.id}</TableCell>
                            <TableCell>{rowData.diff[0].oldValue}</TableCell>
                            <TableCell>{rowData.diff[0].newValue}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="history-action-button-container">
                <ActionButton
                    fetchData={fetchData}
                    fetchStatus={fetchStatus}
                />
            </div>
        </TableContainer>
    );
};

export default HistoryTable;
