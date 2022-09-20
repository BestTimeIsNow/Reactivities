import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { deleteActivity, activitiesByDate, loading } = activityStore;

    const [target, setTarget] = useState('');


    function handleDelete(id: string) {
        setTarget(id);
        deleteActivity(id);
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
                                <Button as={Link} to={`/activities/${activity.id}`} floated='right' color='blue' content='View' />
                                <Button
                                    name={activity.id}
                                    loading={loading && target === activity.id}
                                    onClick={() => handleDelete(activity.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red'
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra>   
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})

