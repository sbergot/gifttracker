import * as React from 'react';
import { Subscribe } from "unstated"

import { DataStore } from "../stores/dataStore";
import { GiftView } from "./GiftView";
import { GiftEditStore } from '../stores/giftEditStore';
import { MainStore } from '../stores/mainStore';

interface GiftAppProps
{
  context: GT.DataContext,
}

interface GiftAppActions
{
  giftActions: GT.EditGiftActions
}

function GiftApp(props: GiftAppProps & GiftAppActions)
{
  const gifts = Object.values(props.context.giftMap);
  return <div>
      <button onClick={() => (props.giftActions.newGift({}))} >New</button>
      {
        gifts.map((gift : GT.Gift) => (
          <div key={gift.id} >
            <GiftView
              context={props.context}
              gift={gift}
              onDelete={() => props.giftActions.deleteGift(gift.id)}
              onEdit={() => props.giftActions.editGift(gift.id)} />
          </div>))
      }
  </div>;
}

export function GiftAppContainer() {
  return <Subscribe to={[DataStore, GiftEditStore, MainStore]}>
  {(dataStore: DataStore, giftEditStore: GiftEditStore, mainStore: MainStore) => (
    <GiftApp
      context={dataStore.state.context}
      giftActions={{
        cancelEdition: giftEditStore.closeGiftForm,
        deleteGift: dataStore.deleteGift,
        editGift: mainStore.editGift,
        newGift: giftEditStore.editNewGift,
        saveGift: dataStore.saveGift
      }}
    />
  )}
  </Subscribe>
}
