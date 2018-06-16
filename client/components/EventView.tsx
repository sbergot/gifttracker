import * as React from 'react';
import { GiftEditStore } from "../stores/store.giftedit";
import { ReferentialStore } from "../stores/store.referential";
import { sortByIndividuals, showEvent } from '../services/service.referential'

interface EventViewProps
{
  event: GT.EventWithIndividuals;
  referential: ReferentialStore;
  editGift: (giftId: number) => void;
  deleteGift: (giftId: number) => void;
  createGift: (event: GT.Event, individual: GT.Individual) => void;
}

export class EventView extends React.Component<EventViewProps, {}>
{
  get individuals()
  {
    return this.props.event.individuals;
  }

  renderGiftTitle(gift: GT.Gift) {
    return gift.url
        ? <a href={gift.url} >{gift.title}</a>
        : gift.title;
  }

  render()
  {
    const context = this.props.referential.dataContext;
    const evt  = context.eventMap[this.props.event.eventId];
    return (
      <div>
        <h2>{showEvent(evt)}</h2>
        <ul className="individual-list">
          {
            sortByIndividuals(this.individuals, i => context.individualMap[i.individualId])
            .map(indivWithGifts =>
              {
                const indiv = context.individualMap[indivWithGifts.individualId];
                return <li key={indivWithGifts.individualId}>
                  <span className="individual-list-elt">
                    {indiv.firstName}:
                  </span>
                  {
                    indivWithGifts.giftIds.length === 0
                    ? <span className="gift-list-empty">nothing :-(</span>
                    : <ul className="gift-list">
                      {indivWithGifts.giftIds.map(giftId =>
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