import * as React from 'react';
import { Subscribe } from "unstated"

import { DataStore } from "../stores/dataStore";
import { GiftEditStore } from "../stores/giftEditStore";
import { EventView } from "./EventView"
import { sortByEvents } from '../services/service.referential'
import { MainStore } from '../stores/mainStore';

interface EventAppProps
{
    context: GT.DataContext;
}

interface EventAppActions
{
    giftActions: GT.EditGiftActions;
}

class EventApp extends React.Component<EventAppProps & EventAppActions, {}>
{
    editGift(giftId: GT.Id) {
        this.props.giftActions.editGift(giftId);
    }

    async deleteGift(giftId: GT.Id) {
        await this.props.giftActions.deleteGift(giftId);
    }

    createGift(event: GT.Event, individual: GT.Individual) {
        const newGift = { eventId: event.id };
        this.props.giftActions.newGift(newGift);
    }

    render()
    {
        const dataContext = this.props.context;
        const eventMap = dataContext.eventMap;
        return (
            <div>
                {
                    sortByEvents(Object.keys(eventMap), e => eventMap[e])
                        .map((evtId) =>
                            <div key={evtId}>
                                <EventView
                                    context={this.props.context}
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

export function EventAppContainer() {
    return <Subscribe to={[DataStore, GiftEditStore, MainStore]}>
    {(dataStore: DataStore, giftEditStore: GiftEditStore, mainStore: MainStore) => (
      <EventApp
        context={dataStore.state.context}
        giftActions={{
          cancelEdition: giftEditStore.closeGiftForm,
          deleteGift: dataStore.deleteGift,
          editGift: mainStore.editGift,
          newGift: giftEditStore.editNewGift,
          saveGift: dataStore.saveGift
        }}
      />
    )}
    </Subscribe>
  
}