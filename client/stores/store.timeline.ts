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

    groupByIndiv(
        individualMap: GT.keyMap<GT.Individual>,
        eventWithGift: GT.EventWithGifts): GT.EventWithIndividuals
    {
        const result: GT.EventWithIndividuals = {
            event: eventWithGift.event,
            individuals: []
        }
        const indivWgMap: GT.keyMap<GT.IndividualWithGifts> = {};
        eventWithGift.gifts.map(gwr => {
            gwr.receiverIds.map(indivId => {
                if (!indivWgMap[indivId]) {
                    indivWgMap[indivId] = {
                        individual: individualMap[indivId],
                        giftIds: []
                    }
                    result.individuals.push(indivWgMap[indivId]);
                }
                indivWgMap[indivId].giftIds.push(gwr.gift.id)
            })
        })
        return result;
    }

    @computed
    get timelineViewModel(): GT.TimeLineViewModel
    {
        if (!this.timelinedata) { return { events: [], giftMap: {} } }
        const giftMap: GT.keyMap<GT.Gift> = {};
        this.timelinedata.events.map(eg => {
            eg.gifts.map(g => { giftMap[g.gift.id] = g.gift; })
        })

        const newevts = this.timelinedata.events
            .map(eg => this.groupByIndiv(this.timelinedata.individualMap, eg));

        return { events: newevts, giftMap: giftMap };
    }
}