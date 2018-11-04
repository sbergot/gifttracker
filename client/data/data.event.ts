import { getJson, sendJson, Verbs } from "./data.shared"

const URL = "./api/event";

export async function getEventsWithGifts() : Promise<GT.EventWithGifts[]>
{
    return getJson<GT.EventWithGifts[]>(URL);
}

export function postEvent(year : number, type : GT.EventType)
{
    sendJson(`${URL}/${year}/${type}`, Verbs.POST, null);
}