import * as data from "../data/data.event";
import { observable, computed } from "mobx";
import * as lodash from "lodash";

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

    @computed
    get timelineViewModel(): GT.TimeLineViewModel
    {
        if (!this.timelinedata) { return { events: [] } }
        const events = this.timelinedata.events;
        const indivs = this.timelinedata.individuals;
        const newevts = events.map((evt) => {
            const giftsByReceiver = lodash.groupBy(evt.gifts, g => g.receiverId);
            const result: GT.EventWithIndividuals = {
                event: evt.event,
                individuals: indivs.map((i: GT.Individual) => {
                    return {
                        individual: i,
                        gifts: giftsByReceiver[i.id] || []
                    }
                })
            };
            return result;
        });
        return { events : newevts };
    }
}