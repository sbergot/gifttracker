import { sendJson, Verbs } from "./data.shared"
import * as models from "./models"

const url = "./api/occurence";

export function postOccurence(year : number, type : models.OccurenceType)
{
    const typeRepr : string = models.OccurenceType[type];
    sendJson(`${url}/${year}/${typeRepr}`, Verbs.POST, null);
}