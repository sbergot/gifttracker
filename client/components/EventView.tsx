import * as React from 'react';
import { GiftEditStore } from "../stores/store.giftedit";
import { showEventType } from './ViewHelpers';

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

  render()
  {
    const evt  = this.props.event.event;
    return (
      <div>
        <h2>{showEventType(evt.type)} - {evt.year}</h2>
        <ul className="individual-list">
          {this.individuals.map(indiv => <li key={indiv.individual.id}>
            <span className="individual-list-elt">
              {indiv.individual.firstName}:
            </span>
            {indiv.gifts.length === 0 ?
            <span className="gift-list-empty">nothing :-(</span> :
            <ul className="gift-list">
              {indiv.gifts.map(g =>
                <li className="gift-list-elt" key={g.id}>
                  {g.title}
                  <span className="gift-list-elt-ctrls">
                    <i className="icon icon-edit" onClick={() => this.props.editGift(g)} />
                    <i className="icon icon-cross" onClick={() => this.props.deleteGift(g)} />
                  </span>
                </li>)}
            </ul>}
          </li>)}
        </ul>
      </div>
    );
  }
}