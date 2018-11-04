import * as React from 'react';
import { observer } from "mobx-react";

import { EventView } from "./EventView"
import { GiftEditStore } from "../stores/store.giftedit";
import { ReferentialStore } from "../stores/store.referential";
import { sortByEvents } from '../services/service.referential'

interface EventAppProps
{
    editStore: GiftEditStore;
    referentialStore: ReferentialStore
}

@observer
export class EventApp extends React.Component<EventAppProps, {}>
{
    editGift(giftId: GT.Id) {
        this.props.editStore.editGift(giftId);
    }

    async deleteGift(giftId: GT.Id) {
        await this.props.editStore.deleteGift(giftId);
        this.props.referentialStore.refresh();
    }

    createGift(event: GT.Event, individual: GT.Individual) {
        const newGift = this.props.editStore.newGift();
        newGift.eventId = event.id;
        this.props.editStore.editGift(newGift.id);
    }

    render()
    {
        const dataContext = this.props.referentialStore.dataContext;
        const eventMap = dataContext.eventMap;
        return (
            <div>
                {
                    sortByEvents(Object.keys(eventMap), e => eventMap[e])
                        .map((evtId) =>
                            <div key={evtId}>
                                <EventView
                                    referential={this.props.referentialStore}
                                    eventId={evtId}
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