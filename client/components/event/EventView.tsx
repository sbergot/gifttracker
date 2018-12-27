import * as React from 'react';
import { GiftCard } from "./GiftCard";
import { GiftEmpty } from "./GiftEmpty";
import { showEvent } from '../../services/service.referential'
import { ActionButton } from "../shared/molecules/ActionButton";

interface EventViewProps {
  eventId: GT.Id;
  context: GT.ContextService;
  showEmpty: boolean;
  showOnlyIndiv: GT.Id | null;
  actions: GT.EditGiftActions;
}

export function EventView(props: EventViewProps) {
  const context = props.context;
  const evt = context.getEvent(props.eventId);
  const individuals = props.showOnlyIndiv
    ? [context.getIndividual(props.showOnlyIndiv)]
    : context.getSortedIndividuals();
  const eltClasses = "gift-list-elt";
  const currentUserId = context.getCurrentUser().id;
  return (
    <div>
      <h2>{showEvent(evt)}</h2>
      <div className="individual-list">
        {
          individuals.map(indiv => {
            const gifts = context.getGiftsReceived(indiv.id).filter(g => g.eventId === evt.id);
            const isEmpty = gifts.length === 0;
            if (!props.showEmpty && isEmpty) { return null; }
            return <div key={indiv.id}>
              {
                props.showOnlyIndiv
                  ? null
                  : <div className="event-individual-header">
                    {indiv.firstName}
                  </div>
              }
              <div className="gift-list">
                {
                  isEmpty
                    ? <div className={eltClasses}><GiftEmpty /></div>
                    : gifts.map(gift =>
                      <div className={eltClasses} key={gift.id} >
                        <GiftCard
                          key={gift.id}
                          gift={gift}
                          onEdit={() => props.actions.editGift(gift.id)}
                          onDelete={() => props.actions.deleteGift(gift.id)}
                          isOwner={currentUserId === gift.ownerId}
                          isInReceivers={context.getReceiverIds(gift.id).findIndex( v => v === currentUserId) > -1}
                        />
                      </div>
                    )
                }
                <ActionButton
                  onClick={() => props.actions.newGift({ eventId: evt.id }, [indiv.id])}
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
