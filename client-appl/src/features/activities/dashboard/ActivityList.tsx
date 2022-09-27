import { observer } from 'mobx-react-lite';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivitySublist from './ActivitySublist';

export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { deleteActivity, groupedActivities, loading } = activityStore;

    const [target, setTarget] = useState('');

    function handleDelete(id: string) {
        setTarget(id);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {groupedActivities.map(([date, activities]) =>
                    <Fragment key={date}>
                        <h4>Date is: {date}</h4>
                        {activities.map((activity) =>
                            <ActivitySublist activity={activity} key={activity.id} />
                        )}
                    </Fragment>
                )}
            </Item.Group>
        </Segment>
    )
})