import * as React from 'react';

export class EventView extends React.Component<GT.EventWithIndividuals, {}>
{
  render()
  {
    const evt  = this.props.event;
    return (
      <div>
        <p>{GT.EventType[evt.type]} - {evt.year}</p>
        <ul>
          {this.props.individuals.map(i => <li>{i.individual.firstName}</li>)}
        </ul>
      </div>
    );
  }
}