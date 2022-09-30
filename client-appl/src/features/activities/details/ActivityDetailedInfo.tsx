import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid, Icon, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity | undefined
}
function ActivityDetailedInfo({ activity }: Props) {
    return (
        <Segment.Group>
            <Segment>
                <Grid verticalAlign="middle">
                    <Grid.Column width="1">
                        <Icon name="info" size="large" color="teal" />
                    </Grid.Column>
                    <Grid.Column width="15">
                        {activity?.description}
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment >
                <Grid verticalAlign="middle">
                    <Grid.Column width="1">
                        <Icon name="calendar" size="large" color="teal" />
                    </Grid.Column>
                    <Grid.Column width="15">
                        {activity?.date}
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment >
                <Grid verticalAlign="middle">
                    <Grid.Column width="1">
                        <Icon name="marker" size="large" color="teal" />
                    </Grid.Column>
                    <Grid.Column width="15">
                        {activity?.venue}, {activity?.city}
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    );
}

export default observer(ActivityDetailedInfo);