import { observable } from "mobx";
import * as data from "../data/data.gift";

const NEW_GIFT_ID = -1;

export class GiftEditStore {

  @observable
  private currentEdit : GT.Gift | null = null;

  constructor() {
  }

  makeGift() : GT.Gift {
    return {
      id : NEW_GIFT_ID,
      ownerId : "",
      occurenceId : 1,
      priceInCents : 0,
      title : "",
      description : "",
      receiverId : null,
      receiver : null
    };
  }

  newGift()
  {
    this.editGift(this.makeGift());
  }

  editGift(gift: GT.Gift)
  {
    this.currentEdit = gift;
  }

  cancelEdition()
  {
    this.currentEdit = null;
  }

  getCurrentGift(): GT.Gift | null
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