import * as React from "react"
import { render } from "react-dom";
import * as models from "./models/models.base"
import { observer } from "mobx-react";
import { observable, computed } from "mobx";
import { getIndividuals } from "./data/data.individual"

@observer
class IndividualApp extends React.Component<{}, {}>
{
    @observable
    individuals: models.rawIndividual[] = [];

    constructor()
    {
        super();
        getIndividuals().then((r) => {
            this.individuals = r;
        });
    }

    render()
    {
        return <div>
            {this.individuals.map(i =>
                <div>{i.firstName} {i.lastName}</div>
            )}
        </div>;
    }
}

render(<IndividualApp />, document.getElementById("individual-app"));
