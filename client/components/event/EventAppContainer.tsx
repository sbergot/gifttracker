import * as React from 'react';
import { Subscribe } from "unstated"

import { EventView } from "./EventView"
import { DataStore } from "../../stores/dataStore";
import { MainStore } from '../../stores/mainStore';
import { FilterStore } from '../../stores/filterStore';

interface EventAppProps {
    context: GT.ContextService;
    giftActions: GT.EditGiftActions;
    showEmpty: boolean;
    showOnly: GT.Id | null;
}

class EventApp extends React.Component<EventAppProps>
{
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
                            actions={this.props.giftActions}
                            showEmpty={this.props.showEmpty}
                            showOnlyIndiv={this.props.showOnly}
                        />
                    )
                }
            </div>
        );
    }
}

export function EventAppContainer() {
    return <Subscribe to={[DataStore, FilterStore, MainStore]}>
        {(dataStore: DataStore, filterStore: FilterStore, mainStore: MainStore) => (
            <EventApp
                context={mainStore.getContextService()}
                giftActions={{
                    deleteGift: dataStore.deleteGift,
                    editGift: mainStore.editGift,
                    newGift: mainStore.editNewGift
                }}
                showEmpty={filterStore.state.showEmptyIndividuals}
                showOnly={filterStore.state.receiverId}
            />
        )}
    </Subscribe>

}