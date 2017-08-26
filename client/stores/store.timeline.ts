import * as data from "../data/data.event";
import { observable, computed } from "mobx";

export class TimelineStore
{
    @observable
    timelinedata: GT.TimeLineData;

    constructor()
    {
        this.refreshTimelineData();
    }

    async refreshTimelineData()
    {
        const timeline =  await data.getEvents();
        this.timelinedata = timeline;
    }
}