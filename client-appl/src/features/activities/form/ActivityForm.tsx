import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Redirect, useParams, useHistory, Link } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import { v4 as UUID } from 'uuid';
import LoadingComponent from '../../../app/layout/LoadingComponent';


function ActivityForm() {

    const { activityStore } = useStore();
    const { createActivity, editActivity, loadActivity, loading, loadingOther  } = activityStore;
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
        

    const [activity, setActivity] = useState({
        "id": '',
        "title": '',
        "category": '',
        "description": '',
        "date": '',
        "city": '',
        "venue": ''
    });

    useEffect(() => {
        if (id) {
            loadActivity(id).then((activity) => setActivity(activity!));
        } else {
            if (activity.id !== '') {
                setActivity({
                    "id": '',
                    "title": '',
                    "category": '',
                    "description": '',
                    "date": '',
                    "city": '',
                    "venue": ''
                })
            }
        }
    }, [id, loadActivity])


    function handleFieldChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { value, name } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    function submitActivity(id?: string) {
        if (activity.id === '') {
            activity.id = UUID();
            createActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        } else {
            editActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    if (loadingOther) return <LoadingComponent />

    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleFieldChange} />
                <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleFieldChange} />
                <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleFieldChange} />
                <Form.Input placeholder="Date" value={activity.date} name="date" onChange={handleFieldChange} />
                <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleFieldChange} />
                <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleFieldChange} />
                <Button loading={loading} onClick={() => submitActivity(activity.id)} floated="right" positive content="Submit" type="submit" />
                <Button as={Link} to='/activities' floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>    
    )
}

export default observer(ActivityForm);