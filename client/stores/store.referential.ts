import * as data from "../data/data.referential";
import { observable, computed } from "mobx";
import { sortEvents, sortIndividuals } from './storeHelpers';

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
        this.referentialdata.events = sortEvents(this.referentialdata.events);
        this.referentialdata.individuals = sortIndividuals(this.referentialdata.individuals);
    }
}