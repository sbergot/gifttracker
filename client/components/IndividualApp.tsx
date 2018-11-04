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
  constructor(props: IndividualAppProps)
  {
    super(props);
  }

  render()
  {
    const context = this.props.referentialStore.dataContext;
    const individualIds = Object.keys(context.individualMap);
    return <div>
      {individualIds.map(indivId =>
        {
          const individual = context.individualMap[indivId];
          const giftIds = this.props.referentialStore.dataContext.receiverGiftsMap[indivId];
          return <div key={indivId}>{individual.firstName} {individual.lastName}
            <ul>
              {giftIds.map(id => {
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
