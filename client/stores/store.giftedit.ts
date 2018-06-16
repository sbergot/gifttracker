import { observable } from "mobx";
import * as data from "../data/data.gift";
import { GiftStatus } from '../models/enums';

const NEW_GIFT_ID = -1;

export class GiftEditStore {

  @observable
  private currentEdit : GT.GiftWithReceivers | null = null;

  constructor() {
  }

  makeGift() : GT.GiftWithReceivers {
    return {
      gift: {
        id : NEW_GIFT_ID,
        ownerId : 0,
        priceInCents : 0,
        title : "",
        description : "",
        url : "",
        buyerId : null,
        buyer : null,
        eventId: null,
        event: null,
        status: GiftStatus.None
      },
      receiverIds: []
    };
  }

  newGift()
  {
    this.editGift(this.makeGift());
  }

  editGift(gift: GT.GiftWithReceivers)
  {
    this.currentEdit = gift;
  }

  cancelEdition()
  {
    this.currentEdit = null;
  }

  getCurrentGift(): GT.GiftWithReceivers | null
  {
    if (this.currentEdit === null) {
      return null;
    }
    return this.currentEdit;
  }

  saveGift(gift : GT.Gift)
  {
    let query;
    if (gift.id === NEW_GIFT_ID)
    {
      query = data.postGift(gift);
    }
    else
    {
      query = data.putGift(gift);
    }
    return query;
  }

  deleteGift(gift : GT.Gift)
  {
    return data.deleteGift(gift.id);
  }
}