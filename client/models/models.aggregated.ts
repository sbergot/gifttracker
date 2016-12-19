import * as base from './models.base'

export interface EventWithGifts extends base.Event
{
    gifts : base.Gift[];
}

export interface EventWithIndividus extends base.Event
{
    individuals : base.individual[]
}