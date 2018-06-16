import * as data from "../data/data.event";
import { observable, computed } from "mobx";
import * as lodash from "lodash";

export class TimelineStore
{
    @observable
    timelinedata: GT.EventWithIndividuals[];

    constructor()
    {
        this.refreshTimelineData();
    }

    groupByIndiv(eventWithGift: GT.EventWithGifts): GT.EventWithIndividuals
    {
        const result: GT.EventWithIndividuals = {
            eventId: eventWithGift.eventId,
            individuals: []
        }
        const indivWgMap: GT.KeyMap<GT.IndividualWithGifts> = {};
        eventWithGift.gifts.map(gwr => {
            gwr.receiverIds.map(indivId => {
                if (!indivWgMap[indivId]) {
                    indivWgMap[indivId] = {
                        individualId: indivId,
                        giftIds: []
                    }
                    result.individuals.push(indivWgMap[indivId]);
                }
                indivWgMap[indivId].giftIds.push(gwr.giftId)
            })
        })
        return result;
    }

    async refreshTimelineData()
    {
        const timeline =  await data.getEventsWithGifts();
        const newtimeline: GT.EventWithIndividuals[] = timeline.map(this.groupByIndiv.bind(this));
        this.timelinedata = newtimeline;
    }

    @computed
    get timelineViewModel(): GT.EventWithIndividuals[]
    {
        return this.timelinedata;
    }
}