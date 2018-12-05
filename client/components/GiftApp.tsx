import * as React from 'react';
import { Subscribe } from "unstated"

import { Store } from "../stores/store";
import { GiftView } from "./GiftView";

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
  return <Subscribe to={[Store]}>
  {(store: Store) => (
    <GiftApp
      context={store.state.context}
      giftActions={{
        cancelEdition: store.cancelEdition,
        deleteGift: store.deleteGift,
        editGift: store.editGift,
        newGift: store.newGift,
        saveGift: store.saveGift
      }}
    />
  )}
  </Subscribe>
}
