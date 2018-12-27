import * as React from "react";
import { Subscribe } from "unstated"

import { DataStore } from "../../stores/dataStore";
import { GiftEditStore } from "../../stores/giftEditStore";
import { MainStore } from "../../stores/mainStore";

import { GiftEditForm } from "./GiftEditForm";

interface GiftEditProps {
  currentGift: GT.Gift | null;
  receiverIds: GT.Id[];
  individualMap: GT.KeyMap<GT.Individual>;
  eventMap: GT.KeyMap<GT.Event>;
  currentUserId: GT.Id;
}

interface GiftEditActions {
  saveGift: (gift: GT.Gift, receiverIds: GT.Id[]) => void;
  closeForm: () => void;
  updateGift: (update: GT.GiftUpdate) => void;
  updateReceivers: (update: GT.ReceiverUpdate) => void;
}

class GiftEdit extends React.PureComponent<GiftEditProps & GiftEditActions, {}>
{
  get gift(): GT.Gift | null {
    return this.props.currentGift;
  }

  get isOpen(): boolean {
    return !!this.gift;
  }

  async save() {
    await this.props.saveGift(this.gift!, this.props.receiverIds);
    this.props.closeForm();
  }

  render() {
    return (
      <div className={"modal" + (this.isOpen ? " active" : "")} id="gift-edit" tabIndex={-1} ref="root">
        <div className="modal-overlay" />
        {
          (this.isOpen)
            ? <GiftEditForm
              gift={this.gift!}
              individualMap={this.props.individualMap}
              events={Object.values(this.props.eventMap)}
              receiverIds={this.props.receiverIds}
              currentUserId={this.props.currentUserId}
              save={() => this.save()}
              close={() => this.props.closeForm()}
              updateGift={(u) => this.props.updateGift(u)}
              updateReceivers={this.props.updateReceivers}
            />
            : null
        }
      </div>
    )
  }
}

export function GiftEditContainer() {
  return <Subscribe to={[DataStore, GiftEditStore, MainStore]}>
    {(dataStore: DataStore, giftEditStore: GiftEditStore, mainStore: MainStore) => (
      <GiftEdit
        individualMap={dataStore.state.context.individualMap}
        eventMap={dataStore.state.context.eventMap}
        closeForm={giftEditStore.closeGiftForm}
        currentGift={giftEditStore.state.gift}
        currentUserId={dataStore.state.context.currentUserId}
        updateGift={giftEditStore.updateGift}
        updateReceivers={giftEditStore.updateReceivers}
        receiverIds={giftEditStore.state.receiverIds}
        saveGift={mainStore.saveGift}
      />
    )}
  </Subscribe>
}