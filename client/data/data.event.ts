import { getJson, sendJson, Verbs } from "./data.shared"

const url = "./api/event";

export async function getEvents() : Promise<GT.EventWithGifts[]>
{
    return getJson<GT.EventWithGifts[]>(url);
}

export async function getEventsIndiv() : Promise<GT.EventWithIndividus[]>
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

export function postEvent(year : number, type : GT.EventType)
{
    const typeRepr : string = GT.EventType[type];
    sendJson(`${url}/${year}/${typeRepr}`, Verbs.POST, null);
}