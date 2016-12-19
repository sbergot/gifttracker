import * as React from 'react';

import * as modelsa from "../models/models.aggregated";
import * as modelsb from "../models/models.base";

export interface EventViewProp
{
  event : modelsa.EventWithGifts;
}

export class EventView extends React.Component<EventViewProp, {}>
{
  render()
  {
    const evt  = this.props.event;
    return (
      <div>
        <p>{modelsb.EventType[evt.type]} - {evt.year}</p>
        <ul>
          {evt.gifts.map(g => <li>{g.title}</li>)}
        </ul>
      </div>
    );
  }
}