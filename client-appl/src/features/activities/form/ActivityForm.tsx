import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    selectedActivity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
}

export default function ActivityForm({ selectedActivity, closeForm, createOrEdit }: Props) {

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

    function handleSubmit() {
        createOrEdit(activity);  
    }


    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleFieldChange} />
                <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleFieldChange} />
                <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleFieldChange} />
                <Form.Input placeholder="Date" value={activity.date} name="date" onChange={handleFieldChange} />
                <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleFieldChange} />
                <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleFieldChange} />
                <Button floated="right" positive content="Submit" type="submit" />
                <Button floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>    
    )
}