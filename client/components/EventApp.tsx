import * as React from 'react';
import { observer } from "mobx-react";

import { EventView } from "./EventView"
import { TimelineStore } from "../stores/store.timeline"
import { GiftEditStore } from "../stores/store.giftedit";
import { ReferentialStore } from "../stores/store.referential";
import { sortByEvents } from '../services/service.referential'

interface EventAppProps
{
    timelineStore: TimelineStore;
    editStore: GiftEditStore;
    referentialStore: ReferentialStore
}

@observer
export class EventApp extends React.Component<EventAppProps, {}>
{
    get store() {
        return this.props.timelineStore;
    }

    editGift(giftId: number) {
        this.props.editStore.editGift(giftId);
    }

    async deleteGift(giftId: number) {
        await this.props.editStore.deleteGift(giftId);
        this.props.timelineStore.refreshTimelineData();
    }

    createGift(event: GT.Event, individual: GT.Individual) {
        const newGift = this.props.editStore.newGift();
        newGift.eventId = event.id;
        this.props.editStore.editGift(newGift.id);
    }

    render()
    {
        const eventMap = this.props.referentialStore.dataContext.eventMap;
        return (
            <div>
                {
                    sortByEvents(this.store.timelineViewModel, e => eventMap[e.eventId])
                        .map((evtWithIndiv) =>
                            <div key={evtWithIndiv.eventId}>
                                <EventView
                                    referential={this.props.referentialStore}
                                    event={evtWithIndiv}
                                    editGift={(g) => this.editGift(g)}
                                    deleteGift={(g) => this.deleteGift(g)}
                                    createGift={(e, i) => this.createGift(e, i)}
                                />
                            </div>
                        )
                }
            </div>
        );
    }
}