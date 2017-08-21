import * as lodash from "lodash";
import { observable, computed } from "mobx";
import * as data from "../data/data.gift";

type GiftMap = {[index : number] : GT.Gift };

const NEW_GIFT_ID = -1;

export class GiftStore {
  @observable
  gifts : GiftMap = {};

  @observable
  private currentEdit : number | null = null;

  constructor() {
    this.refreshGifts();
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
    this.editGift(NEW_GIFT_ID);
  }

  editGift(id : number)
  {
    this.currentEdit = id;
  }

  cancelEdition()
  {
    this.currentEdit = null;
  }

  getCurrentGift(): GT.Gift | null
  {
    if (this.currentEdit === NEW_GIFT_ID) {
      return this.makeGift();
    }
    if (this.currentEdit === null) {
      return null;
    }
    return this.gifts[this.currentEdit];
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
    query.then(() => this.refreshGifts());
  }

  deleteGift(id : number)
  {
    data.deleteGift(id).then(() => this.refreshGifts());
  }

  refreshGifts()
  {
    data.getGifts()
      .then((gifts) => {
        if (gifts != undefined) {
          this.gifts = lodash.keyBy(gifts, g => g.id);
        }
      });
  }
}