import * as React from 'react';
import { connect } from "react-redux"
import { Dispatch } from "redux"

import { GiftView } from "./GiftView";
import * as actions from "../action/action";
import { ThunkDispatch } from 'redux-thunk';

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


function mapStateToProps(state: GT.AppState): GiftAppProps {
  return { context: state.context };
}

function mapDispatchToProps(dispatch: ThunkDispatch<GT.AppState, void, GT.Action>): GiftAppActions {
  const giftActions = {
      newGift: (gift: Partial<GT.Gift>, edit: boolean) => dispatch(actions.newGift(gift, edit)),
      editGift: (id: GT.Id) => dispatch(actions.editGift(id)),
      cancelEdition: () => dispatch(actions.cancelEdition()),
      saveGift: (gift: GT.Gift) => dispatch(actions.saveGift(gift)),
      deleteGift: (id: GT.Id) => dispatch(actions.deleteGift(id)),
      updateGift: (update: GT.GiftUpdate) => dispatch(actions.updateGift(update))
  }
  return { giftActions };
}


export const GiftAppContainer = connect(mapStateToProps, mapDispatchToProps)(GiftApp);
