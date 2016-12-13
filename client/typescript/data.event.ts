import { getJSON } from "jquery"
import { sendJson, Verbs } from "./data.shared"
import * as models from "./models"

const url = "./api/event";

export function getEvents() : JQueryPromise<models.Event[]>
{
    return getJSON(url);
}

export function postEvent(year : number, type : models.EventType)
{
    const typeRepr : string = models.EventType[type];
    sendJson(`${url}/${year}/${typeRepr}`, Verbs.POST, null);
}