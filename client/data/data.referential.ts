import { getJson, sendJson, Verbs } from "./data.shared"

const URL = "./api/referential";

export async function getReferential() : Promise<GT.ReferentialData>
{
    return getJson<GT.ReferentialData>(URL);
}
