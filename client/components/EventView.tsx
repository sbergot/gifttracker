import * as React from 'react';
import { EventType } from '../models/enums'

function showEventType(et: EventType): string {
  switch(et) {
    case EventType.BirthDay:
      return 'BirthDay';
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
        <p>{showEventType(evt.type)} - {evt.year}</p>
        <ul>
          {this.props.individuals.map(i => <li key={i.individual.id}>
            {i.individual.firstName}
            <ul>
              {i.gifts.map(g =>
                <li key={g.id}>{g.title}</li>
              )}
            </ul>
            </li>)}
        </ul>
      </div>
    );
  }
}