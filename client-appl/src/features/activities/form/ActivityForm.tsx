import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { ActivityStore } from '../../../app/stores/activityStore';
import { useStore } from '../../../app/stores/store';


function ActivityForm() {

    const { activityStore } = useStore();
    const selectedActivity: Activity | undefined = activityStore.selectedActivity;

    const initialState = selectedActivity ?? {
        "id": '',
        "title": '',
        "category": '',
        "description": '',
        "date": '',
        "city": '',
        "venue": ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleFieldChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { value, name } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleFieldChange} />
                <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleFieldChange} />
                <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleFieldChange} />
                <Form.Input placeholder="Date" value={activity.date} name="date" onChange={handleFieldChange} />
                <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleFieldChange} />
                <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleFieldChange} />
                <Button onClick={() => activityStore.createEditActivity(activity)} loading={activityStore.submitting} floated="right" positive content="Submit" type="submit" />
                <Button onClick={() => activityStore.closeForm()} floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>    
    )
}

export default observer(ActivityForm);