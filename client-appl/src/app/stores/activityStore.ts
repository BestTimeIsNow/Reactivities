import { action, makeAutoObservable } from "mobx";
import agent from "../api/Agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

export class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    activityRegistry = new Map<string, Activity>();
    loading = false;
    editMode = false;
    submitting = false;

    constructor() {
        makeAutoObservable(this)
    }

    getActivities = () => {
        this.loading = true;
        agent.Activities.list().then(action("fetchSuccess", (response) => {
            response.forEach(activity => {
                activity.date = activity.date.split("T")[0];
                this.activityRegistry.set(activity.id, activity);
            })
            this.loading = false;
        })).catch(
            action("fetchError", (error) => {
                this.loading = false;
            })
        )
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date))
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id)
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined
    }

    openForm = () => {
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createEditActivity = (activity: Activity) => {
        this.submitting = true;
        if (activity.id) {
            agent.Activities.edit(activity.id, activity).then(action("fetchSuccess", () => {
                this.activityRegistry.set(activity.id, activity);
            })).catch(action("fetchError", (error) => {
                console.log(error);
            })).then(action("fetchSuccess", () => {
                this.selectedActivity = activity;
                this.editMode = false;
                this.submitting = false;
            }))
        } else {
            activity.id = uuid();
            agent.Activities.create(activity).then(action("fetchSuccess", () => {
                this.activityRegistry.set(activity.id, activity);
            })).catch((error) =>
                console.log(error)
            ).then(action("fetchSuccess", () => {
                this.submitting = false;
                this.selectedActivity = activity;
                this.editMode = false;
            }))
        }
    }

    deleteActivity = (id: string) => {
        this.submitting = true;
        agent.Activities.delete(id).then(action("fetchSuccess", () => {
            this.activityRegistry.delete(id);
            this.submitting = false;
        })).catch((action("fetchError"), (error) => {
            console.log(error);
            this.submitting = false;
        }))
    }

}