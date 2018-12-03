import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as actions from "../action/action";
import { GiftEditForm } from "./GiftEditForm";

interface GiftEditProps
{
  context: GT.DataContext;
  currentGiftId: GT.Id
}

interface GiftEditActions
{
  saveGift: (gift: GT.Gift) => void;
  cancelEdition: () => void;
  updateGift: (update: GT.GiftUpdate) => void;
  updateReceiver: (update: GT.ReceiverUpdate) => void;
}

class GiftEdit extends React.Component<GiftEditProps & GiftEditActions, {}>
{
  get gift(): GT.Gift | null
  {
    return this.props.context.giftMap[this.props.currentGiftId];
  }

  get isOpen(): boolean
  {
    return !!this.gift;
  }

  async save()
  {
    await this.props.saveGift(this.gift!);
    this.props.cancelEdition();
  }

  render()
  {
    const context = this.props.context;
    return (
      <div className={"modal" + (this.isOpen ? " active" : "")} id="gift-edit" tabIndex={-1} ref = "root">
        <div className="modal-overlay" />
        {
          (this.isOpen)
            ? <GiftEditForm
                gift={this.gift!}
                individualMap={context.individualMap}
                events={Object.values(context.eventMap)}
                receiverIds={context.giftReceiversMap[this.gift!.id]}
                save={() => this.save()}
                close={() => this.props.cancelEdition()}
                updateGift={(u) => this.props.updateGift(u)}
                updateReceiver={u => this.props.updateReceiver(u)}/>
            : null
        }
      </div>
    )
  }
}

function mapStateToProps(state: GT.AppState): GiftEditProps {
  return {
    context: state.context,
    currentGiftId: state.currentlyEditedGift
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<GT.AppState, void, GT.Action>): GiftEditActions {
  return {
    cancelEdition: () => dispatch(actions.cancelEdition()),
    saveGift: (gift: GT.Gift) => dispatch(actions.saveGift(gift)),
    updateGift: (update: GT.GiftUpdate) => dispatch(actions.updateGift(update)),
    updateReceiver: (u: GT.ReceiverUpdate) => dispatch(actions.updateReceiver(u))
  }
}

export const GiftEditContainer = connect(mapStateToProps, mapDispatchToProps)(GiftEdit);