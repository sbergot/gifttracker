import * as data from "./data.shared";

const INDIVIDUAL_API_URL = "./api/individual";

export async function getIndividuals() : Promise<GT.IndividualViewModel>
{
    return data.getJson<GT.IndividualViewModel>(INDIVIDUAL_API_URL);
}
