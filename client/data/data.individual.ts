import * as data from "./data.shared";

const INDIVIDUAL_API_URL = "./api/individual";

export async function getIndividuals() : Promise<GT.IndividualWithGifts[]>
{
    return data.getJson<GT.IndividualWithGifts[]>(INDIVIDUAL_API_URL);
}
