import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';

interface Props {
    activity: Activity
}

function ReactComponent({ activity }: Props) {

    const { activityStore } = useStore();
    const { loading, deleteActivity } = activityStore;

    const [target, setTarget] = useState('');

    function handleDelete(id: string) {
        setTarget(id);
        deleteActivity(id);
    }

return (
        <Item>
            <Item.Image src={`/assets/categoryImages/${activity?.category}.jpg`} />
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
    );
}

export default ReactComponent;