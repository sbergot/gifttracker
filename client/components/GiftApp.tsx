import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as lodash from "lodash";
import * as jquery from "jquery";
import { GiftView } from "./GiftView";
import { GiftEdit, NewGift } from "./GiftEdit";
import * as data from "../typescript/data.gift";

interface GiftAppState {
    gifts : {[index : number] : Gift };
    currentEdit : number | null;
}

function makeGift() : Gift {
  return {
    id : 0,
    ownerId : 0,
    occurenceId : 1,
    priceInCents : 0,
    title : "",
    description : ""
  }
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
    jquery("#gift-create-open").click(() => this.editGift(-1));
  }

  editGift(id : number)
  {
    this.setState({
      gifts : this.state.gifts,
      currentEdit : id
    });
  }

  refreshGifts()
  {
    data.getGifts()
      .then((gifts) => {
        if (gifts != undefined) {
          this.setState({currentEdit : null, gifts : lodash.keyBy(gifts, g => g.id) });
        }
      });
  }

  onClose()
  {
    this.setState({ currentEdit : null, gifts : this.state.gifts });
  }

  onSave(newGift : NewGift)
  {
    let query;
    if (newGift.isNew)
    {
      query = data.postGift(newGift.gift);
    }
    else
    {
      query = data.putGift(newGift.gift);
    }
    this.onClose();
    query.then(() => this.refreshGifts());
  }

  onDelete(id : number)
  {
    data.deleteGift(id).then(() => this.refreshGifts());
  }

  getGiftEditView()
  {
    const currentIdx = this.state.currentEdit;
    if (currentIdx == null) {
      return null;
    }
    const currentGift = this.state.gifts[currentIdx];
    return (
      <GiftEdit
        onClose={this.onClose.bind(this)}
        onSave={this.onSave.bind(this)}
        gift={currentGift || makeGift()}
        isNew={currentGift==undefined} />)
  }

  render()
  {
    const gifts = lodash.values(this.state.gifts);
    const giftsView = gifts.map((g : Gift) => (
      <div key={g.id} >
        <GiftView
          gift={g}
          onDelete={this.onDelete.bind(this)}
          onEdit={this.editGift.bind(this)} />
      </div>
    ));
    return <div>{giftsView}{this.getGiftEditView()}</div>;
  }
}