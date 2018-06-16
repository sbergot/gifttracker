import * as data from "../data/data.referential";
import { observable, computed } from "mobx";
import { sortEvents, sortIndividuals } from '../services/service.referential';

export class ReferentialStore
{
    @observable
    dataContext: GT.DataContext;

    constructor()
    {
        this.refreshReferentialData();
    }

    async refreshReferentialData()
    {
        this.dataContext = await data.getReferential();
    }
}