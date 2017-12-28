import * as React from 'react';
import { GiftEditStore } from "../stores/store.giftedit";
import { sortByIndividuals, showEvent } from '../services/service.referential'

interface EventViewProps
{
  event: GT.EventWithIndividuals;
  editGift: (gift: GT.Gift) => void;
  deleteGift: (gift: GT.Gift) => void;
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
            {indiv.gifts.length === 0 ?
            <span className="gift-list-empty">nothing :-(</span> :
            <ul className="gift-list">
              {indiv.gifts.map(g =>
                <li className="gift-list-elt" key={g.id}>
                  {this.renderGiftTitle(g)}
                  <span className="gift-list-elt-ctrls">
                    <i className="icon icon-edit" onClick={() => this.props.editGift(g)} />
                    <i className="icon icon-cross" onClick={() => this.props.deleteGift(g)} />
                  </span>
                </li>)}
            </ul>}
          </li>))}
        </ul>
      </div>
    );
  }
}