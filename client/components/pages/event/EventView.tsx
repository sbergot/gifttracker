import * as React from 'react';
import { Gift } from "./Gift";
import { GiftEmpty } from "./GiftEmpty";
import { showEvent } from '../../../services/service.referential'
import { ActionButton } from "../../shared/ActionButton";

interface EventViewProps {
  eventId: GT.Id;
  context: GT.ContextService;
  editGift: (giftId: GT.Id) => void;
  deleteGift: (giftId: GT.Id) => void;
  createGift: (event: GT.Event, individual: GT.Individual) => void;
}

export function EventView(props: EventViewProps) {
  const context = props.context;
  const evt = context.getEvent(props.eventId);
  const individuals = context.getSortedIndividuals();
  const eltClasses = "column col-4 col-md-6 col-sm-12 py-2";
  return (
    <div>
      <h2>{showEvent(evt)}</h2>
      <ul className="individual-list">
        {
          individuals.map(indiv => {
            const indivId = indiv.id;
            const gifts = context.getGiftsReceived(indivId);
            return <li key={indivId}>
              <div className="event-individual-header">
                <h4>{indiv.firstName}</h4>
                <ActionButton
                  onClick={() => props.createGift(evt, indiv)}
                  type='default'
                  icon='plus'
                  size='sm'
                  className="mx-2"
                />
              </div>
              <div className="grid-lg">
                <div className="columns">
                  {
                    gifts.length === 0
                      ? <div className={eltClasses}><GiftEmpty/></div>
                      : gifts.map(gift =>
                        <div className={eltClasses} key={gift.id} >
                          <Gift
                            key={gift.id}
                            gift={gift}
                            buyer={gift.buyerId ? props.context.getIndividual(gift.buyerId) : null}
                            editGift={props.editGift}
                            deleteGift={props.deleteGift} />
                        </div>
                      )
                  }
                </div>
              </div>
            </li>
          }
          )
        }
      </ul>
    </div>
  );
}
