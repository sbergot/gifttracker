import { sendJson, Verbs } from "./data.shared"
import * as modelsBase from "../models/models.base"
import * as modelsAggregated from "../models/models.aggregated"

const url = "./api/event";

export function getEvents() : JQueryPromise<modelsAggregated.EventWithGifts[]>
{
    return getJSON(url);
}

export function getEventsIndiv() : JQueryPromise<modelsAggregated.EventWithIndividus[]>
{
    return getEvents().then(r =>
    {
        if (r == undefined){
            return [];
        }
        return r.map(e => {
            return {
                id : e.id,
                year : e.year,
                type : e.type,
                individuals : []
            }
        });
    })
}

export function postEvent(year : number, type : modelsBase.EventType)
{
    const typeRepr : string = modelsBase.EventType[type];
    sendJson(`${url}/${year}/${typeRepr}`, Verbs.POST, null);
}