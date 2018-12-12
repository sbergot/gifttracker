import * as React from 'react';
import { Gift } from "./Gift";
import { GiftEmpty } from "./GiftEmpty";
import { showEvent } from '../../../services/service.referential'

interface EventViewProps
{
  eventId: GT.Id;
  context: GT.ContextService;
  editGift: (giftId: GT.Id) => void;
  deleteGift: (giftId: GT.Id) => void;
  createGift: (event: GT.Event, individual: GT.Individual) => void;
}

export function EventView(props: EventViewProps)
{
  const context = props.context;
  const evt  = context.getEvent(props.eventId);
  const individuals = context.getSortedIndividuals();
  return (
    <div>
      <h2>{showEvent(evt)}</h2>
      <ul className="individual-list">
        {
          individuals.map(indiv =>
            {
              const indivId = indiv.id;
              const gifts = context.getGiftsReceived(indivId);
              return <li key={indivId}>
                <h3 className="individual-list-elt d-inline">
                  {indiv.firstName}
                </h3>
                <button
                  className="gift-list-elt-add btn btn-sm"
                  onClick={() => props.createGift(evt, indiv)}
                >
                  <i className="icon icon-plus" />
                </button>
                {
                    gifts.length === 0
                    ? <GiftEmpty/>
                    : <div className="grid-lg">
                      <div className="columns">
                        {
                          gifts.map(gift =>
                            <div className="column col-4 col-md-6 col-sm-12 py-2" key={gift.id} >
                              <Gift
                                key={gift.id}
                                gift={gift}
                                editGift={props.editGift}
                                deleteGift={props.deleteGift} />
                            </div>
                          )
                        }
                      </div>
                    </div>
                }
              </li>
            }
          )
      }
      </ul>
    </div>
  );
}
