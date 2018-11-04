import { observable } from "mobx";
import { ReferentialStore } from './store.referential'
import * as data from "../data/data.gift";

const NEW_GIFT_ID: GT.Id = "NEW_GIFT_ID";

export class GiftEditStore {
  @observable
  private currentEdit : GT.Id | null = null;

  constructor(private referential: ReferentialStore) {
  }

  private makeGift() : GT.Gift {
    return {
        id : NEW_GIFT_ID,
        ownerId : "",
        priceInCents : 0,
        title : "",
        description : "",
        url : "",
        buyerId : null,
        buyer : null,
        eventId: null,
        event: null,
        status: "None"
      };
  }

  newGift(): GT.Gift
  {
    const newGift = this.makeGift();
    this.currentEdit = newGift.id;
    this.referential.dataContext.giftMap[NEW_GIFT_ID] = newGift;
    return newGift
  }

  editGift(giftKey: GT.Id)
  {
    this.currentEdit = giftKey;
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
    return this.referential.dataContext.giftMap[this.currentEdit];
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

  deleteGift(giftId : GT.Id)
  {
    return data.deleteGift(giftId);
  }
}