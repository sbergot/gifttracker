import * as React from 'react';
import { Subscribe } from "unstated"

import { EventView } from "./EventView"
import { DataStore } from "../../stores/dataStore";
import { GiftEditStore } from "../../stores/giftEditStore";
import { MainStore } from '../../stores/mainStore';

interface EventAppProps {
    context: GT.ContextService;
    giftActions: GT.EditGiftActions;
}

class EventApp extends React.Component<EventAppProps>
{
    createGift = (event: GT.Event, individual: GT.Individual) => {
        const newGift = { eventId: event.id };
        this.props.giftActions.newGift(newGift, [individual.id]);
    }

    render() {
        const dataContext = this.props.context;
        const events = dataContext.getSortedEvents();
        const actions = this.props.giftActions;
        return (
            <div className="container grid-lg">
                {
                    events.map((evt) =>
                        <EventView
                            key={evt.id}
                            context={this.props.context}
                            eventId={evt.id}
                            editGift={actions.editGift}
                            deleteGift={actions.deleteGift}
                            createGift={this.createGift}
                        />
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
                context={dataStore.getContextService()}
                giftActions={{
                    cancelEdition: giftEditStore.closeGiftForm,
                    deleteGift: dataStore.deleteGift,
                    editGift: mainStore.editGift,
                    newGift: mainStore.editNewGift,
                    saveGift: dataStore.saveGift
                }}
            />
        )}
    </Subscribe>

}