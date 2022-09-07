import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/Agent';
import LoadingComponent from './LoadingComponent';

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        agent.Activities.list().then(response => {
            console.log(response);
            setActivities(response);
            setLoading(false);
        })
    }, [])

    
    function handleSelectActivity(id: string) {
        setSelectedActivity(activities.find(x => x.id === id));
    }

    function handleCancelSelectActivity() {
        setSelectedActivity(undefined);
    }

    function handleFormOpen(id?: string) {
        id ? setSelectedActivity(activities.find(x => x.id === id)) : setSelectedActivity(undefined)
        setEditMode(true);
    }

    function handleFormClose() {
        setEditMode(false);
    }

    function handleEditOrNewActivity(activity: Activity) {
        setSubmitting(true);
        if (activity.id) {
            agent.Activities.edit(activity.id, activity).then(() => {
                setActivities([...activities.filter(x => x.id !== activity.id), activity]);
                setEditMode(false);
                setSubmitting(false);
                setSelectedActivity(activity);

            })
        } else {
            activity.id = uuid();
            agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity]);
                setEditMode(false);
                setSubmitting(false);
                setSelectedActivity(activity);
            })
        }
    }

    function handleDeleteActivity(id: string) {
        setSubmitting(true);
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(x => x.id !== id)])
            setSubmitting(false);
        })
    }

    if (loading) return LoadingComponent();

    return (
        <>
            <NavBar openForm={handleFormOpen} />
            <Container style={{ marginTop: '7em' }}>
                <ActivityDashboard
                    activities={activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectActivity}
                    editMode={editMode} openForm={handleFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleEditOrNewActivity}
                    deleteActivity={handleDeleteActivity}
                    submitting={submitting}
                />
            </Container>
        </>
    );
}

export default App;
