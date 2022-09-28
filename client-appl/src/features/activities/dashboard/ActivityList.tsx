import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivitySublist from './ActivitySublist';

export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;

    return (
        <Segment>
            <Item.Group divided>
                {groupedActivities.map(([date, activities]) =>
                    <Fragment key={date}>
                        <h4>Date of Activity(s): {date}</h4>
                        {activities.map(activity =>
                            <ActivitySublist key={activity.id} activity={activity} />
                        )}
                    </Fragment>
                )}
            </Item.Group>
        </Segment>
    )
})