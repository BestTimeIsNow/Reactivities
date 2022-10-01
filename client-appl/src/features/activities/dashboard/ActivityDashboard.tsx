import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityFilters from './ActivityFilters';
import ActivityList from './ActivityList';

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const { loadingInitial, activityRegistry, groupedActivities, loadActivities } = activityStore;

    useEffect(() => {
        if (activityRegistry.size <= 1) {
            loadActivities();
        }
    }, [groupedActivities.length, activityRegistry.size, loadActivities])

    if (loadingInitial) return <LoadingComponent content='Loading app' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2><ActivityFilters /></h2>
            </Grid.Column>
        </Grid>
    )
})