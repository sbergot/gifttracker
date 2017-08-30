import * as React from 'react';
import { EventType } from '../models/enums'

function showEventType(et: EventType): string {
  switch(et) {
    case EventType.Birthday:
      return 'Birthday';
    case EventType.Christmas:
      return 'Christmas'
  }
}

export class EventView extends React.Component<GT.EventWithIndividuals, {}>
{
  render()
  {
    const evt  = this.props.event;
    return (
      <div>
        <h2>{showEventType(evt.type)} - {evt.year}</h2>
        <ul className="individual-list">
          {this.props.individuals.map(i => <li key={i.individual.id}>
            <span className="individual-list-elt">
              {i.individual.firstName}:
            </span>
            {i.gifts.length === 0 ?
            <span className="gift-list-empty">nothing :-(</span> :
            <ul className="gift-list">
              {i.gifts.map(g =>
                <li className="gift-list-elt" key={g.id}>
                  {g.title}
                  <span className="gift-list-elt-ctrls">
                    <i className="icon icon-edit" />
                    <i className="icon icon-cross" />
                  </span>
                </li>)}
            </ul>}
          </li>)}
        </ul>
      </div>
    );
  }
}