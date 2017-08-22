import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observable, computed } from "mobx";
import { observer, inject } from "mobx-react";
import * as lodash from "lodash";

import { GiftView } from "./GiftView";
import { GiftEdit } from "./GiftEdit";
import { GiftStore } from "../stores/store.gift"

@observer
export class GiftApp extends React.Component<{ giftStore: GiftStore }, {}>
{
  get store()
  {
    return this.props.giftStore;
  }

  closeEditModal()
  {
    this.store.cancelEdition();
  }

  onSave(gift : GT.Gift)
  {
    this.store.saveGift(gift);
    this.closeEditModal();
  }

  @computed
  get giftEditView()
  {
    const currentGift = this.store.getCurrentGift();
    if (currentGift == null) {
      return null;
    }
    return (
      <GiftEdit
        onClose={this.closeEditModal.bind(this)}
        onSave={this.onSave.bind(this)}
        gift={currentGift ? {...currentGift} : this.store.makeGift()}
      />)
  }

  render()
  {
    const gifts = lodash.values(this.store.gifts);
    return <div>
        <button onClick={() => this.store.newGift()} >New</button>
        {
          gifts.map((g : GT.Gift) => (
            <div key={g.id} >
              <GiftView
                gift={g}
                onDelete={this.store.deleteGift.bind(this.store)}
                onEdit={this.store.editGift.bind(this.store)} />
            </div>))
        }
        {this.giftEditView}
      </div>;
  }
}