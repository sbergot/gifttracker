import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observable, computed } from "mobx";
import { observer, inject } from "mobx-react";
import * as lodash from "lodash";

import { GiftView } from "./GiftView";
import { GiftEditStore } from "../stores/store.giftedit"
import { ReferentialStore } from "../stores/store.referential"

interface GiftAppProps
{
  referentialStore: ReferentialStore,
  giftEditStore: GiftEditStore
}


@observer
export class GiftApp extends React.Component<GiftAppProps, {}>
{
  get referential()
  {
    return this.props.referentialStore;
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
    this.giftsEdit.saveGift(gift).then(() => this.referential.refresh());
    this.closeEditModal();
  }

  delete(gift: GT.Gift)
  {
    this.giftsEdit.deleteGift(gift.id).then(() => this.referential.refresh());
  }

  render()
  {
    const gifts = Object.values(this.referential.dataContext.giftMap);
    return <div>
        <button onClick={() => this.giftsEdit.newGift()} >New</button>
        {
          gifts.map((gift : GT.Gift) => (
            <div key={gift.id} >
              <GiftView
                gift={gift}
                onDelete={() => this.delete(gift)}
                onEdit={() => this.giftsEdit.editGift(gift.id)} />
            </div>))
        }
      </div>;
  }
}