import * as React from 'react';
import { Subscribe } from "unstated"

import { DataStore } from "../../../stores/dataStore";
import { GiftView } from "./GiftView";
import { GiftEditStore } from '../../../stores/giftEditStore';
import { MainStore } from '../../../stores/mainStore';

interface GiftAppProps
{
  context: GT.ContextService,
}

interface GiftAppActions
{
  giftActions: GT.EditGiftActions
}

function GiftApp(props: GiftAppProps & GiftAppActions)
{
  const gifts = Object.values(props.context.getAllGifts());
  return <div className="container grid-lg">
    <button
      className="btn btn-primary btn-action btn-lg float-right"
      onClick={() => props.giftActions.newGift({})}>
      <i className="icon icon-plus" />
    </button>
    <h1>Gifts</h1>
    <div className="columns">
      {
        gifts.map((gift: GT.Gift) => (
          <div className="column col-4 col-md-6 col-sm-12 py-2" key={gift.id} >
            <GiftView
              receivers={props.context.getReceivers(gift.id)}
              gift={gift}
              onDelete={() => props.giftActions.deleteGift(gift.id)}
              onEdit={() => props.giftActions.editGift(gift.id)} />
          </div>))
      }
    </div>
  </div>;
}

export function GiftAppContainer() {
  return <Subscribe to={[DataStore, GiftEditStore, MainStore]}>
  {(dataStore: DataStore, giftEditStore: GiftEditStore, mainStore: MainStore) => (
    <GiftApp
      context={dataStore.getContextService()}
      giftActions={{
        cancelEdition: giftEditStore.closeGiftForm,
        deleteGift: dataStore.deleteGift,
        editGift: mainStore.editGift,
        newGift: mainStore.editNewGift,
        saveGift: dataStore.saveGift
      }}
    />
  )}
  </Subscribe>
}
