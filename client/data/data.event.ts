import { getJson, sendJson, Verbs } from "./data.shared"
import * as modelsBase from "../models/models.base"
import * as modelsAggregated from "../models/models.aggregated"

const url = "./api/event";

export async function getEvents() : Promise<modelsAggregated.EventWithGifts[]>
{
    return getJson<modelsAggregated.EventWithGifts[]>(url);
}

export async function getEventsIndiv() : Promise<modelsAggregated.EventWithIndividus[]>
{
    const events = await getEvents();

    return events.map(e => {
        return {
            id : e.id,
            year : e.year,
            type : e.type,
            individuals : []
        };
    });
}

export function postEvent(year : number, type : modelsBase.EventType)
{
    const typeRepr : string = modelsBase.EventType[type];
    sendJson(`${url}/${year}/${typeRepr}`, Verbs.POST, null);
}