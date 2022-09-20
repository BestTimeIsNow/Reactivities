import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/Agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date))
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            let activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.activityRegistry.get(id);
        if (activity) {
            this.selectActivity(id);
        } else {
            try {
                this.setLoadingInitial(true);
                activity = await agent.Activities.detail(id);
                this.setActivity(activity);
                this.selectActivity(id)
            } catch (error) {
                console.log(error)
            } finally {
                this.setLoadingInitial(false);
            }
        }
    }

    setActivity = (activity: Activity) => {
        activity.date = activity.date.split("T")[0];
        this.activityRegistry.set(activity.id, activity);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id)
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined
    }

    createActivity = async (activity: Activity) => {
        this.setLoadingInitial(true);
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            this.setActivity(activity);
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.selectedActivity = activity;
                this.loading = false;
            })
        }
    }

    editActivity = async (activity: Activity) => {
        this.setLoadingInitial(true);
        try {
            await agent.Activities.edit(activity.id, activity);
            this.setActivity(activity);
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(() => {
                this.loading = false;
                this.selectedActivity = activity;
            })
        }
    }


    setLoading = (state: boolean) => {
        this.loading = state;
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id)
            this.activityRegistry.delete(id);
            this.setLoading(false);
        }
        catch(error) {
            console.log(error);
            this.setLoading(false);
        }
    }

}