import React from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

export default function ActivityDetails() {
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityDetailedHeader />
                <ActivityDetailedInfo />
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width="6">
                <ActivityDetailedSidebar />
            </Grid.Column>
        </Grid>
        )
}