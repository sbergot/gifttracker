import * as React from 'react';
import { Subscribe } from "unstated"

import { DataStore } from "../../../stores/dataStore";
import { GiftEditStore } from "../../../stores/giftEditStore";
import { EventView } from "./EventView"
import { sortByEvents } from '../../../services/service.referential'
import { MainStore } from '../../../stores/mainStore';

interface EventAppProps {
    context: GT.ContextService;
}

interface EventAppActions {
    giftActions: GT.EditGiftActions;
}

class EventApp extends React.Component<EventAppProps & EventAppActions, {}>
{
    editGift = (giftId: GT.Id) => {
        this.props.giftActions.editGift(giftId);
    }

    deleteGift = async (giftId: GT.Id) => {
        await this.props.giftActions.deleteGift(giftId);
    }

    createGift = (event: GT.Event, individual: GT.Individual) => {
        const newGift = { eventId: event.id };
        this.props.giftActions.newGift(newGift, [individual.id]);
    }

    render() {
        const dataContext = this.props.context;
        const events = dataContext.getSortedEvents();
        return (
            <div className="container grid-lg">
                {
                    events.map((evt) =>
                        <EventView
                            key={evt.id}
                            context={this.props.context}
                            eventId={evt.id}
                            editGift={this.editGift}
                            deleteGift={this.deleteGift}
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