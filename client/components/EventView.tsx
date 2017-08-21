import * as React from 'react';

export interface EventViewProp
{
  event : GT.EventWithGifts;
}

export class EventView extends React.Component<EventViewProp, {}>
{
  render()
  {
    const evt  = this.props.event;
    return (
      <div>
        <p>{GT.EventType[evt.type]} - {evt.year}</p>
        <ul>
          {evt.gifts.map(g => <li>{g.title}</li>)}
        </ul>
      </div>
    );
  }
}