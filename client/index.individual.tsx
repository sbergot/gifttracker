import * as React from "react"
import { render } from "react-dom";
import { observer } from "mobx-react";
import { observable, computed } from "mobx";
import { getIndividuals } from "./data/data.individual"

@observer
class IndividualApp extends React.Component<{}>
{
  @observable
  individuals: GT.IndividualViewModel = {
    individuals: [],
    giftMap: {}
  };

  constructor(props: {})
  {
    super(props);
    getIndividuals().then((r) => {
      this.individuals = r; 
    });
  }

  render()
  {
    return <div>
      {this.individuals.individuals.map(i =>
        <div key={i.individual.id}>{i.individual.firstName} {i.individual.lastName}
          <ul>
            {i.giftIds.map(id => {
              const gift = this.individuals.giftMap[id];
              return <li key={gift.id}>{gift.title}</li>
            })}
          </ul>
        </div>
      )}
    </div>;
  }
}

render(<IndividualApp />, document.getElementById("individual-app"));
