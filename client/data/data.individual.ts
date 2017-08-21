import * as data from "./data.shared";

const individualurl = "./api/individual";

export async function getIndividuals() : Promise<GT.IndividualWithGifts[]>
{
    return data.getJson<GT.IndividualWithGifts[]>(individualurl);
}
