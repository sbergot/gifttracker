import { observable } from "mobx";
import * as data from "../data/data.gift";
import { GiftStatus } from '../models/enums';

const NEW_GIFT_ID = -1;
const NEW_GIFT_KEY = 'new_gift'
type GiftKey = number | typeof NEW_GIFT_KEY | null;

export class GiftEditStore {
  @observable
  private currentEdit : GiftKey = null;

  constructor(private dataContext: GT.DataContext) {
  }

  makeGift() : GT.Gift {
    return {
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
      };
  }

  newGift()
  {
    this.currentEdit = NEW_GIFT_KEY;
  }

  editGift(giftKey: number)
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
    if (this.currentEdit === NEW_GIFT_KEY) {
      return this.makeGift();
    }
    return this.dataContext.giftMap[this.currentEdit];
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

  deleteGift(giftId : number)
  {
    return data.deleteGift(giftId);
  }
}