import * as React from 'react';
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { ThunkDispatch } from "redux-thunk"

import { EventView } from "./EventView"
import { sortByEvents } from '../services/service.referential'
import * as actions from "../action/action";

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

function mapStateToProps(state: GT.AppState): EventAppProps {
    return { context: state.context };
  }
  
  function mapDispatchToProps(dispatch: ThunkDispatch<GT.AppState, void, GT.Action>): EventAppActions {
    const giftActions = {
        newGift: (gift: Partial<GT.Gift>, edit: boolean) => dispatch(actions.newGift(gift, edit)),
        editGift: (id: GT.Id) => dispatch(actions.editGift(id)),
        cancelEdition: () => dispatch(actions.cancelEdition()),
        saveGift: (gift: GT.Gift) => dispatch(actions.saveGift(gift)),
        deleteGift: (id: GT.Id) => dispatch(actions.deleteGift(id)),
        updateGift: (update: GT.GiftUpdate) => dispatch(actions.updateGift(update))
    }
    return { giftActions };
  }
  

export const EventAppContainer = connect(mapStateToProps, mapDispatchToProps)(EventApp);
