import { getJson, sendJson, Verbs } from "./data.shared"

const URL = "./api/referential";

export async function getReferential() : Promise<GT.DataContext>
{
    return getJson<GT.DataContext>(URL);
}
