import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;  // would always have an "id" when coming through Activity Details
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityDashboard({ activities, selectedActivity, selectActivity, cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, deleteActivity, submitting }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity} closeForm={closeForm} deleteActivity={deleteActivity} submitting={submitting} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    <ActivityDetails selectedActivity={selectedActivity} cancelSelectActivity={cancelSelectActivity} openForm={openForm} />}
                {editMode &&
                    <ActivityForm
                    selectedActivity={selectedActivity}
                    closeForm={closeForm}
                        createOrEdit={createOrEdit}
                        submitting={submitting} />}
            </Grid.Column>
        </Grid>

    )
}