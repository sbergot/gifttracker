import * as React from "react"

interface IndividualAppProps
{
  context: GT.ContextService
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
    const individuals = context.getSortedIndividuals();
    return <div>
      {individuals.map(indiv =>
        {
          const gifts = context.getGiftsReceived(indiv.id);
          return <div key={indiv.id}>{indiv.firstName} {indiv.lastName}
            <ul>
              {gifts.map(gift => {
                return <li key={gift.id}>{gift.title}</li>
              })}
            </ul>
          </div>
        }
      )}
    </div>;
  }
}
