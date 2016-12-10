import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observable } from "mobx";
import { observer } from "mobx-react";
import * as lodash from "lodash";
import * as jquery from "jquery";
import { GiftView } from "./GiftView";
import { GiftEdit, NewGift } from "./GiftEdit";
import * as data from "../typescript/data.gift";

type GiftMap = {[index : number] : Gift };

function makeGift() : Gift {
  return {
    id : 0,
    ownerId : 0,
    occurenceId : 1,
    priceInCents : 0,
    title : "",
    description : ""
  };
}

@observer
export class GiftApp extends React.Component<{}, {}>
{
  @observable
  gifts : GiftMap = {};

  @observable
  currentEdit : number | null = null;

  constructor(props : undefined)
  {
    super(props);
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
    this.currentEdit = id;
  }

  refreshGifts()
  {
    data.getGifts()
      .then((gifts) => {
        if (gifts != undefined) {
          this.currentEdit = null;
          this.gifts = lodash.keyBy(gifts, g => g.id);
        }
      });
  }

  onClose()
  {
    this.currentEdit = null;
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
    const currentIdx = this.currentEdit;
    if (currentIdx == null) {
      return null;
    }
    const currentGift = this.gifts[currentIdx];
    return (
      <GiftEdit
        onClose={this.onClose.bind(this)}
        onSave={this.onSave.bind(this)}
        gift={currentGift ? {...currentGift} : makeGift()}
        isNew={currentGift==undefined} />)
  }

  render()
  {
    const gifts = lodash.values(this.gifts);
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