import * as React from "react";
import { Subscribe } from "unstated"

import { Store } from "../stores/store";
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

class GiftEdit extends React.PureComponent<GiftEditProps & GiftEditActions, {}>
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
                receiverIds={context.giftReceiversMap[this.gift!.id] || []}
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

export function GiftEditContainer() {
  return <Subscribe to={[Store]}>
  {(store: Store) => (
    <GiftEdit
      cancelEdition={store.cancelEdition}
      context={store.state.context}
      currentGiftId={store.state.currentlyEditedGift}
      saveGift={store.saveGift}
      updateGift={store.updateGift}
      updateReceiver={store.updateReceiver}
    />
  )}
  </Subscribe>
}