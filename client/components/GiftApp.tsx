import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observable, computed } from "mobx";
import { observer, inject } from "mobx-react";
import * as lodash from "lodash";

import { GiftView } from "./GiftView";
import { GiftEditStore } from "../stores/store.giftedit"
import { GiftStore } from "../stores/store.gift"

@observer
export class GiftApp extends React.Component<{ giftStore: GiftStore, giftEditStore: GiftEditStore }, {}>
{
  get gifts()
  {
    return this.props.giftStore;
  }

  get giftsEdit()
  {
    return this.props.giftEditStore;
  }

  closeEditModal()
  {
    this.giftsEdit.cancelEdition();
  }

  onSave(gift : GT.Gift)
  {
    this.giftsEdit.saveGift(gift).then(() => this.gifts.refreshGifts());
    this.closeEditModal();
  }

  delete(gift: GT.Gift)
  {
    this.giftsEdit.deleteGift(gift).then(() => this.gifts.refreshGifts());
  }

  render()
  {
    const gifts = this.gifts.gifts;
    return <div>
        <button onClick={() => this.giftsEdit.newGift()} >New</button>
        {
          gifts.map((g : GT.Gift) => (
            <div key={g.id} >
              <GiftView
                gift={g}
                onDelete={() => this.delete(g)}
                onEdit={() => this.giftsEdit.editGift(g)} />
            </div>))
        }
      </div>;
  }
}