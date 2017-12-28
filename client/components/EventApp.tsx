import * as React from 'react';
import { observable, computed } from "mobx";
import { observer } from "mobx-react";

import { EventView } from "./EventView"
import { getEvents } from "../data/data.event"
import { TimelineStore } from "../stores/store.timeline"
import { GiftEditStore } from "../stores/store.giftedit";
import { sortByEvents } from '../services/service.referential'

@observer
export class EventApp extends React.Component<{ store: TimelineStore, editStore: GiftEditStore }, {}>
{
    get store() {
        return this.props.store;
    }

    editGift(g: GT.Gift) {
        this.props.editStore.editGift(g);
    }

    async deleteGift(g: GT.Gift) {
        await this.props.editStore.deleteGift(g);
        this.props.store.refreshTimelineData();
    }

    createGift(event: GT.Event, individual: GT.Individual) {
        const newGift = this.props.editStore.makeGift();
        newGift.eventId = event.id;
        newGift.receiverId = individual.id;
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