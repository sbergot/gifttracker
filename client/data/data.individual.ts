import * as models from '../models/models.base'

export function clean(i : models.rawIndividual) : models.individual
{
    return {... i, date : new Date()};
}