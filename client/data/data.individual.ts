import * as data from "./data.shared";
import * as models from '../models/models.base'

const gifturl = "./api/gift";

export function clean(i : models.rawIndividual) : models.rawIndividual
{
    return {... i};
}

export async function getIndividuals() : Promise<models.rawIndividual[]>
{
    return data.getJson<models.rawIndividual[]>(gifturl);
}
