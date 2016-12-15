import * as React from 'react';

import * as models from "../typescript/models";

export interface EventViewProp
{
  event : models.EventWithGifts;
}

export class EventView extends React.Component<EventViewProp, {}>
{
  render()
  {
    const evt  = this.props.event;
    return (
      <div>
        <p>{models.EventType[evt.type]} - {evt.year}</p>
        <ul>
          {evt.gifts.map(g => <li>{g.title}</li>)}
        </ul>
      </div>
    );
  }
}