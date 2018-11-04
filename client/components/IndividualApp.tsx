import * as React from "react"

interface IndividualAppProps
{
  context: GT.DataContext
}

export class IndividualApp extends React.Component<IndividualAppProps>
{
  constructor(props: IndividualAppProps)
  {
    super(props);
  }

  render()
  {
    const context = this.props.context;
    const individualIds = Object.keys(context.individualMap);
    return <div>
      {individualIds.map(indivId =>
        {
          const individual = context.individualMap[indivId];
          const giftIds = this.props.context.receiverGiftsMap[indivId];
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
