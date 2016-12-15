import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
import * as lodash from "lodash";
import * as jquery from "jquery";

import { EventView } from "./EventView"
import * as models from "../typescript/models"
import * as data from "../typescript/data.event"

@observer
export class EventApp extends React.Component<{}, {}>
{
    @observable
    events : models.Event[] = [];

    componentDidMount()
    {
        data.getEvents().then((events) => {
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