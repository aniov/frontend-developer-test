import * as React from 'react';
import {Button, CircularProgress} from "@material-ui/core";
import {IFetchStatus} from "../App";

interface IActionButton {
    fetchData: () => void;
    fetchStatus: IFetchStatus;
}

const ActionButton: React.FC<IActionButton> = ({fetchData, fetchStatus}) => {

    const ActionButton = () => {

        if (fetchStatus.isError) {
            return (
                <>
                    <div className="history-action-error-text">
                        We had problems fetching your data. Please try again.
                    </div>
                    <Button variant="contained" color="primary" className="history-action-button"
                            onClick={fetchData}>Retry</Button>
                </>

            );
        } else if (fetchStatus.isFetching) {
            return <CircularProgress className="history-progress"/>;
        }
        return <Button variant="contained" color="primary" className="history-action-button"
                       onClick={fetchData}>Load more</Button>
    };

    return <ActionButton/>
};

export default ActionButton;
