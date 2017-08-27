import * as React from 'react';
import { observable, computed } from "mobx";
import { observer } from "mobx-react";

import { EventView } from "./EventView"
import { getEvents } from "../data/data.event"
import { TimelineStore } from "../stores/store.timeline"

@observer
export class EventApp extends React.Component<{ store: TimelineStore}, {}>
{
    get store() {
        return this.props.store;
    }

    render()
    {
        return (
            <div>
                {this.store.timelineViewModel.events.map((e) =>
                    <div key={e.event.id}>
                        <EventView {...e} />
                    </div>
                )}
            </div>
        );
    }
}