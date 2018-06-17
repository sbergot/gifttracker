import * as data from "../data/data.referential";
import { observable, computed } from "mobx";
import { sortEvents, sortIndividuals } from '../services/service.referential';

export class ReferentialStore
{
    @observable
    _dataContext: GT.DataContext

    @computed
    get dataContext(): GT.DataContext
    {
        if (!this._dataContext)
        {
            throw new Error('datacontext is null. Please call refresh.')
        }
        return this._dataContext;
    }

    constructor()
    {
    }

    async refresh()
    {
        this._dataContext = await data.getReferential();
    }
}