import * as React from 'react';

import * as models from "../typescript/models";

export interface EventViewProp
{
  event : models.Event;
}

export class EventView extends React.Component<EventViewProp, {}>
{
  render()
  {
    const evt  = this.props.event;
    return (
      <div>
        <p>{evt.type} - {evt.year}</p>
      </div>
    );
  }
}