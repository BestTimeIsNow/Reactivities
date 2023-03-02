import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { useStore } from '../../../app/stores/store';
import ActivitySublist from './ActivitySublist';

export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;

    return (
        <>
            {groupedActivities.map(([date, activities]) =>
                <Fragment key={date}>
                    <h4 style={{ color: "teal" }} >{date}</h4>
                    <>
                            {activities.map(activity =>
                                    <ActivitySublist key={activity.id} activity={activity} />
                            )}
                    </>
                </Fragment>
            )}
        </>
    )
})