import { getJson, sendJson, Verbs } from "./data.shared"

const URL = "./api/event";

export async function getEvents() : Promise<GT.TimeLineData>
{
    return getJson<GT.TimeLineData>(URL);
}

export function postEvent(year : number, type : GT.EventType)
{
    const typeRepr : string = GT.EventType[type];
    sendJson(`${URL}/${year}/${typeRepr}`, Verbs.POST, null);
}