import { observable } from "mobx";
import * as data from "../data/data.gift";

export class GiftStore {
  @observable
  public gifts : GT.Gift[] = [];

  constructor()
  {
    this.refreshGifts();
  }

  refreshGifts()
  {
    data.getGifts()
      .then((gifts) => {
        if (gifts != undefined) {
          this.gifts = gifts;
        }
      });
  }
}