import * as React from 'react';
import { observer } from "mobx-react";

import { EventView } from "./EventView"
import { TimelineStore } from "../stores/store.timeline"
import { GiftEditStore } from "../stores/store.giftedit";
import { sortByEvents } from '../services/service.referential'

@observer
export class EventApp extends React.Component<{ store: TimelineStore, editStore: GiftEditStore }, {}>
{
    get store() {
        return this.props.store;
    }

    editGift(g: GT.GiftWithReceivers) {
        this.props.editStore.editGift(g);
    }

    async deleteGift(g: GT.GiftWithReceivers) {
        await this.props.editStore.deleteGift(g);
        this.props.store.refreshTimelineData();
    }

    createGift(event: GT.Event, individual: GT.Individual) {
        const newGift = this.props.editStore.makeGift();
        newGift.gift.eventId = event.id;
        newGift.receiverIds.push(individual.id);
        this.props.editStore.editGift(newGift);
    }

    render()
    {
        return (
            <div>
                {sortByEvents(this.store.timelineViewModel.events, e => e.event).map((e) =>
                    <div key={e.event.id}>
                        <EventView
                            event={e}
                            editGift={(g) => this.editGift(g)}
                            deleteGift={(g) => this.deleteGift(g)}
                            createGift={(e, i) => this.createGift(e, i)}
                        />
                    </div>
                )}
            </div>
        );
    }
}