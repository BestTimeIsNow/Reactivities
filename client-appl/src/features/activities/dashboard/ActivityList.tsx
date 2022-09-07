import React, { useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    closeForm: () => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityList({ activities, selectActivity, closeForm, deleteActivity, submitting }: Props) {

    const [target, setTarget] = useState('');

    function handleDelete(id: string) {
        setTarget(id);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => { selectActivity(activity.id); closeForm() } } floated='right' color='blue' content='View' />
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