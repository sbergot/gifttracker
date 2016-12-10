import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as lodash from "lodash"
import { GiftView } from "./GiftView"
import { GiftEdit } from "./GiftEdit"
import * as data from "../typescript/data.gift"

interface GiftAppState {
    gifts : {[index : number] : Gift };
    currentEdit : number | null;
}

export class GiftApp extends React.Component<undefined, GiftAppState>
{
  constructor(props : undefined)
  {
    super(props)
    this.state = {
      gifts : [],
      currentEdit : null
    };
  }

  componentDidMount()
  {
    this.refreshGifts();
  }

  refreshGifts()
  {
    data.getGifts()
      .then((gifts) => {
        if (gifts != undefined) {
          this.setState({currentEdit : null, gifts : gifts});
        }
      });
  }

  onClose()
  {
    this.setState({ currentEdit : null, gifts : this.state.gifts });
  }

  onSave()
  {}

  render()
  {
    const gifts = lodash.values(this.state.gifts);
    const giftsView = gifts.map((g : Gift) => (
      <div key={g.id} >
        <GiftView gift={g} />
      </div>
    ));
    const giftEdit = this.state.currentEdit
      ? <GiftEdit onClose={this.onClose} onSave={this.onSave} />
      : null
    return <div>{giftsView}{giftEdit}</div>;
  }
}

function makeGift(title : string, description : string) : Gift {
  return {
    id : 0,
    ownerId : 0,
    occurenceId : 0,
    priceInCents : 0,
    title : title,
    description : description
  }
}
