import * as React from 'react';
import { GiftCard } from "./GiftCard";
import { GiftEmpty } from "./GiftEmpty";
import { showEvent } from '../../services/service.referential'
import { ActionButton } from "../shared/molecules/ActionButton";

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
  const eltClasses = "gift-list-elt";
  const currentUserId = context.getCurrentUser().id;
  return (
    <div>
      <h2>{showEvent(evt)}</h2>
      <div className="individual-list">
        {
          individuals.map(indiv => {
            const gifts = context.getGiftsReceived(indiv.id);
            return <div key={indiv.id}>
              <div className="event-individual-header">
                {indiv.firstName}
              </div>
              <div className="gift-list">
                {
                  gifts.length === 0
                    ? <div className={eltClasses}><GiftEmpty /></div>
                    : gifts.map(gift =>
                      <div className={eltClasses} key={gift.id} >
                        <GiftCard
                          key={gift.id}
                          gift={gift}
                          onEdit={() => props.editGift(gift.id)}
                          onDelete={() => props.deleteGift(gift.id)}
                          isOwner={currentUserId === gift.ownerId}
                          isInReceivers={context.getReceiverIds(gift.id).findIndex( v => v === currentUserId) > -1}
                        />
                      </div>
                    )
                }
                <ActionButton
                  onClick={() => props.createGift(evt, indiv)}
                  type='default'
                  icon='plus'
                  size='lg'
                />
              </div>
            </div>
          })
        }
      </div>
    </div>
  );
}
