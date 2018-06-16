import * as React from "react"
import { observer } from "mobx-react";
import { observable, computed } from "mobx";
import { getIndividuals } from "../data/data.individual";
import { ReferentialStore } from "../stores/store.referential";

interface IndividualAppProps
{
  referentialStore: ReferentialStore
}

@observer
export class IndividualApp extends React.Component<IndividualAppProps>
{
  @observable
  individuals: GT.IndividualWithGifts[] = [];

  constructor(props: IndividualAppProps)
  {
    super(props);
    getIndividuals().then((r) => {
      this.individuals = r; 
    });
  }

  render()
  {
    const context = this.props.referentialStore.dataContext;
    return <div>
      {this.individuals.map(i =>
        {
          const individual = context.individualMap[i.individualId];
          return <div key={i.individualId}>{individual.firstName} {individual.lastName}
            <ul>
              {i.giftIds.map(id => {
                const gift = context.giftMap[id];
                return <li key={gift.id}>{gift.title}</li>
              })}
            </ul>
          </div>
        }
      )}
    </div>;
  }
}
