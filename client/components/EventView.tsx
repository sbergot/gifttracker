import * as React from 'react';
import { GiftEditStore } from "../stores/store.giftedit";
import { ReferentialStore } from "../stores/store.referential";
import { sortByIndividuals, showEvent } from '../services/service.referential'

interface EventViewProps
{
  eventId: GT.Id;
  referential: ReferentialStore;
  editGift: (giftId: GT.Id) => void;
  deleteGift: (giftId: GT.Id) => void;
  createGift: (event: GT.Event, individual: GT.Individual) => void;
}

export class EventView extends React.Component<EventViewProps, {}>
{
  renderGiftTitle(gift: GT.Gift) {
    return gift.url
        ? <a href={gift.url} >{gift.title}</a>
        : gift.title;
  }

  render()
  {
    const context = this.props.referential.dataContext;
    const evt  = context.eventMap[this.props.eventId];
    const individualIds = Object.keys(context.individualMap);
    return (
      <div>
        <h2>{showEvent(evt)}</h2>
        <ul className="individual-list">
          {
            sortByIndividuals(individualIds, i => context.individualMap[i])
            .map(indivId =>
              {
                const indiv = context.individualMap[indivId];
                const giftIds = context.receiverGiftsMap[indivId];
                return <li key={indivId}>
                  <span className="individual-list-elt">
                    {indiv.firstName}:
                  </span>
                  {
                     giftIds.length === 0
                    ? <span className="gift-list-empty">nothing :-(</span>
                    : <ul className="gift-list">
                      {giftIds.map(giftId =>
                      {
                        const gift = context.giftMap[giftId]
                        return  <li className="gift-list-elt" key={gift.id}>
                            {this.renderGiftTitle(gift)}
                            <span className="gift-list-elt-ctrls">
                              <button className="btn btn-sm" onClick={() => this.props.editGift(giftId)}>
                                <i className="icon icon-edit" />
                              </button>
                              <button className="btn btn-sm" onClick={() => this.props.deleteGift(giftId)}>
                                <i className="icon icon-cross" />
                              </button>
                            </span>
                        </li>
                      })}
                    </ul>
                  }
                  <button
                    className="gift-list-elt-add btn btn-sm"
                    onClick={() => this.props.createGift(evt, indiv)}
                  >
                    <i className="icon icon-plus" />
                  </button>
                </li>
              }
            )
        }
        </ul>
      </div>
    );
  }
}