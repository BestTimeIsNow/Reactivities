import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/Agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    loading = false;  // button loading
    loadingOther = false;   // single activity refresh loading
    loadingInitial = true;  // activities loading

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date))
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((x, activity) => {
                let date = activity.date;
                console.log('date is' + date)
                console.log('b4 pop x date event title is ' + x[date])
                x[date] = x[date] ? [...x[date], activity] : [activity]
                console.log('x date event title is ' + x[date][0].title)
                return x
            }, {} as { [key:string]: Activity[]})
        )
    }

    loadActivities = async () => {
        //this.cancelSelectedActivity();
        
        try {
            await agent.Activities.list().then((activities) => {
                this.setLoadingInitial(false);
                activities.forEach(activity => {
                    this.setActivity(activity);
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
            return activity;
        } else {
            try {
                this.setLoadingOther(true);
                activity = await agent.Activities.detail(id);
                this.setActivity(activity);
                this.selectActivity(id)
                this.setLoadingOther(false);
                return activity;
            } catch (error) {
                console.log(error)
                this.setLoadingOther(false);
            }
        }
    }

    setActivity = (activity: Activity) => {
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
        this.setLoading(true);
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