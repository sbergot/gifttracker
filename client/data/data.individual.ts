import * as data from "./data.shared";
import { IndividualWithGifts } from '../models/models.aggregated'

const individualurl = "./api/individual";

export async function getIndividuals() : Promise<IndividualWithGifts[]>
{
    return data.getJson<IndividualWithGifts[]>(individualurl);
}
