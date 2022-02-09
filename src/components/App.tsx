import * as React from 'react';
import api from '../lib/api';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import HistoryTable from "./table/history-table";
import './app.css';

export interface IFetchStatus {
    isFetching: boolean;
    isError: boolean;
}

const defaultFetchStatus: IFetchStatus = {
    isFetching: false,
    isError: false
}

export const App = () => {

    const [usersData, setUsersData] = React.useState([]);
    const [projectsData, setProjectsData] = React.useState([]);
    const [fetchUsersStatus, setFetchUsersStatus] = React.useState<IFetchStatus>(defaultFetchStatus);
    const [fetchProjectStatus, setFetchProjectStatus] = React.useState<IFetchStatus>(defaultFetchStatus);


    React.useLayoutEffect(() => {
        fetchUsersData();
    }, []);

    React.useLayoutEffect(() => {
        fetchProjectsData();
    }, []);

    const fetchUsersData = async () => {
        setFetchUsersStatus({...defaultFetchStatus, isFetching: true});
        try {
            const responseData = await api.getUsersDiff();
            setUsersData(responseData.data);
            setFetchUsersStatus(defaultFetchStatus);
        } catch (e) {
            setFetchUsersStatus({ isFetching: false, isError: true });
        }
    }

    const fetchProjectsData = async () => {
        setFetchProjectStatus({...defaultFetchStatus, isFetching: true});
        try {
            const responseData = await api.getProjectsDiff();
            setProjectsData(responseData.data);
            setFetchProjectStatus(defaultFetchStatus);
        } catch (e) {
            setFetchProjectStatus({isFetching: false, isError: true});
        }
    }


    return (
        <Container className="app" fixed>
            <Box data-testid="app-box" m={2}>
                <div className="history-container">
                    <HistoryTable
                        fetchData={fetchUsersData}
                        fetchStatus={fetchUsersStatus}
                        tableData={usersData}
                    />
                    <HistoryTable
                        fetchData={fetchProjectsData}
                        fetchStatus={fetchProjectStatus}
                        tableData={projectsData}
                        isProject
                    />
                </div>
            </Box>
        </Container>
    );
};

export default App;
