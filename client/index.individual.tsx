import * as React from "react"
import { render } from "react-dom";
import { IndividualWithGifts } from "./models/models.aggregated"
import { observer } from "mobx-react";
import { observable, computed } from "mobx";
import { getIndividuals } from "./data/data.individual"

@observer
class IndividualApp extends React.Component<{}, {}>
{
    @observable
    individuals: IndividualWithGifts[] = [];

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
                <div key={i.id}>{i.firstName} {i.lastName}
                    <ul>
                        {i.gifts.map(g =>
                            <li key={g.id}>{g.title}</li>
                        )}
                    </ul>
                </div>
            )}
        </div>;
    }
}

render(<IndividualApp />, document.getElementById("individual-app"));
