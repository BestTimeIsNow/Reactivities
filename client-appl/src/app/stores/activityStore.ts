import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/Agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    loading = false;  // button loading
    loadingOther = true;   // single activity refresh loading
    loadingInitial = true;  // activities loading

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date))
    }

    get groupedActivities() {
        var i = 1;
        return Object.entries(
            this.activitiesByDate.reduce((returnObject, activity) => {
                i++;
                const date = activity.date;
                returnObject[date] ??= [activity];
                if (returnObject[date] == null) returnObject[date].push(activity);
                return returnObject;
            }, {} as {[key:string]:Activity[]})
        )
    }

    noActivityToLoad = async() => this.setLoadingOther(false);
    loadActivities = async () => {
        //this.cancelSelectedActivity();
        
        try {
            await agent.Activities.list().then((activities) => {
                this.setLoadingInitial(false);
                var i = 1;
                activities.forEach(activity => {
                    i++;
                    this.setActivityRegistry(activity);
                })
                return activities;
            });
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.activityRegistry.get(id);
        if (activity) {
            this.selectActivity(id);
            this.setLoadingOther(false)
            return activity;
        } else {
            try {
                activity = await agent.Activities.detail(id);
                this.setActivityRegistry(activity);
                this.selectActivity(id)
                this.setLoadingOther(false);
                return activity;
            } catch (error) {
                console.log(error)
                this.setLoadingOther(false);
            }
        }
    }

    setActivityRegistry = (activity: Activity) => {
        activity.date = activity.date.split("T")[0];
        this.activityRegistry.set(activity.id, activity);
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id)
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined
    }

    createActivity = async (activity: Activity) => {
        this.setLoading(true);
        try {
            await agent.Activities.create(activity);
            this.setActivityRegistry(activity);
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
        this.setLoading(true);
        try {
            await agent.Activities.edit(activity.id, activity);
            this.setActivityRegistry(activity);
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

    setLoadingOther = (state: boolean) => {
        this.loadingOther = state;
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
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