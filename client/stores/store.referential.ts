import * as data from "../data/data.referential";
import { observable, computed } from "mobx";
import * as lodash from "lodash";

export class ReferentialStore
{
    @observable
    referentialdata: GT.ReferentialData;

    constructor()
    {
        this.refreshReferentialData();
    }

    async refreshReferentialData()
    {
        this.referentialdata = await data.getReferential();
    }
}