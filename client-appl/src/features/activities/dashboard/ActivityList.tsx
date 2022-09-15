import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';


function ActivityList() {


    const [target, setTarget] = useState('');
    const { activityStore } = useStore();
    const { activitiesByDate, submitting } = activityStore;

    function handleDelete(id: string) {
        setTarget(id);
        activityStore.deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => { activityStore.selectActivity(activity.id); activityStore.closeForm() }} floated='right' color='blue' content='View' />
                                <Button
                                    loading={submitting && target === activity.id}
                                    onClick={() => handleDelete(activity.id)}
                                    floated='right' color='red' content='Delete' />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                
                ))}
            </Item.Group>
        </Segment>
    )
}

export default observer(ActivityList);