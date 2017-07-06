import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
import * as lodash from "lodash";

import { GiftView } from "./GiftView";
import { GiftEdit, NewGift } from "./GiftEdit";
import { Gift } from "../models/models.base";
import * as data from "../data/data.gift";

type GiftMap = {[index : number] : Gift };

function makeGift() : Gift {
  return {
    id : 0,
    ownerId : "",
    occurenceId : 1,
    priceInCents : 0,
    title : "",
    description : "",
    receiverId : null
  };
}

@observer
export class GiftApp extends React.Component<{}, {}>
{
  @observable
  gifts : GiftMap = {};

  @observable
  currentEdit : number | null = null;

  constructor() {
    super();
    this.refreshGifts();
  }

  componentDidMount()
  {
    const createBtn = document.getElementById("gift-create-open");
    if (createBtn != null) {
       createBtn.onclick = () => this.newGift();
    }
  }

  newGift()
  {
    this.editGift(-1);
  }

  editGift(id : number)
  {
    this.currentEdit = id;
  }

  closeEditModal()
  {
    this.currentEdit = null;
  }

  refreshGifts()
  {
    data.getGifts()
      .then((gifts) => {
        if (gifts != undefined) {
          this.closeEditModal();
          this.gifts = lodash.keyBy(gifts, g => g.id);
        }
      });
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
    this.closeEditModal();
    query.then(() => this.refreshGifts());
  }

  onDelete(id : number)
  {
    data.deleteGift(id).then(() => this.refreshGifts());
  }

  @computed
  get getGiftEditView()
  {
    const currentIdx = this.currentEdit;
    if (currentIdx == null) {
      return null;
    }
    const currentGift = this.gifts[currentIdx];
    return (
      <GiftEdit
        onClose={this.closeEditModal.bind(this)}
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
    return <div>{giftsView}{this.getGiftEditView}</div>;
  }
}