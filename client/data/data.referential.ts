import { getJson } from "./data.shared"

const URL = "./api/referential";

export async function getReferential() : Promise<GT.ReferentialData>
{
    const rd = await getJson<GT.ReferentialData>(URL);
    return rd;
}
