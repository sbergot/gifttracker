import * as React from 'react';
import { Subscribe } from "unstated"

import { MainStore } from "../stores/mainStore";
import { EventView } from "./EventView"
import { sortByEvents } from '../services/service.referential'

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
        this.props.giftActions.newGift(newGift, true);
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
    return <Subscribe to={[MainStore]}>
    {(store: MainStore) => (
      <EventApp
        context={store.state.context}
        giftActions={{
          cancelEdition: store.cancelEdition,
          deleteGift: store.deleteGift,
          editGift: store.editGift,
          newGift: store.newGift,
          saveGift: store.saveGift
        }}
      />
    )}
    </Subscribe>
  
}