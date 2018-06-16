import * as React from 'react';
import { GiftEditStore } from "../stores/store.giftedit";
import { sortByIndividuals, showEvent } from '../services/service.referential'

interface EventViewProps
{
  event: GT.EventWithIndividuals;
  giftMap: GT.KeyMap<GT.Gift>;
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
    const evt  = this.props.event.event;
    return (
      <div>
        <h2>{showEvent(evt)}</h2>
        <ul className="individual-list">
          {sortByIndividuals(this.individuals, i => i.individual).map(indiv => (
          <li key={indiv.individual.id}>
            <span className="individual-list-elt">
              {indiv.individual.firstName}:
            </span>
            {
              indiv.giftIds.length === 0
              ? <span className="gift-list-empty">nothing :-(</span>
              : <ul className="gift-list">
                {indiv.giftIds.map(id =>
                {
                  const gift = this.props.giftMap[id]
                  return  <li className="gift-list-elt" key={gift.id}>
                      {this.renderGiftTitle(gift)}
                      <span className="gift-list-elt-ctrls">
                        <button className="btn btn-sm" onClick={() => this.props.editGift(gift)}>
                          <i className="icon icon-edit" />
                        </button>
                        <button className="btn btn-sm" onClick={() => this.props.deleteGift(gift)}>
                          <i className="icon icon-cross" />
                        </button>
                      </span>
                  </li>
                })}
              </ul>
            }
            <button
              className="gift-list-elt-add btn btn-sm"
              onClick={() => this.props.createGift(evt, indiv.individual)}
            >
              <i className="icon icon-plus" />
            </button>
          </li>))}
        </ul>
      </div>
    );
  }
}