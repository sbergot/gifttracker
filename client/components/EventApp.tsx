import * as React from 'react';
import { observable, computed } from "mobx";
import { observer } from "mobx-react";

import { EventView } from "./EventView"
import { EventWithGifts } from "../models/models.aggregated"
import { getEvents } from "../data/data.event"

@observer
export class EventApp extends React.Component<{}, {}>
{
    @observable
    events : EventWithGifts[] = [];

    componentDidMount()
    {
        getEvents().then((events) => {
            if (events != undefined) {
                this.events = events;
            }
        });
    }


    render()
    {
        return (
            <div>
                {this.events.map((e) =>
                    <div key={e.id}>
                        <EventView event={e} />
                    </div>
                )}
            </div>
        );
    }
}