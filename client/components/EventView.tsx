import * as React from 'react';
import { sortByIndividuals, showEvent } from '../services/service.referential'

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
                <span className="individual-list-elt">
                  {indiv.firstName}:
                </span>
                {
                    gifts.length === 0
                  ? <span className="gift-list-empty">nothing :-(</span>
                  : <ul className="gift-list">
                        {
                          gifts.map(gift =>
                          <Gift
                            key={gift.id}
                            gift={gift}
                            editGift={props.editGift}
                            deleteGift={props.deleteGift}/>
                          )
                        }
                    </ul>
                }
                <button
                  className="gift-list-elt-add btn btn-sm"
                  onClick={() => props.createGift(evt, indiv)}
                >
                  <i className="icon icon-plus" />
                </button>
              </li>
            }
          )
      }
      </ul>
    </div>
  );
}

function Gift(
  props: {
    gift: GT.Gift,
    editGift: (giftId: GT.Id) => void,
    deleteGift: (giftId: GT.Id) => void
  }) {
  const giftId = props.gift.id;
  return <li className="gift-list-elt" key={giftId}>
    <GiftTitle {...props.gift} />
    <span className="gift-list-elt-ctrls">
      <button className="btn btn-sm" onClick={() => props.editGift(giftId)}>
        <i className="icon icon-edit" />
      </button>
      <button className="btn btn-sm" onClick={() => props.deleteGift(giftId)}>
        <i className="icon icon-cross" />
      </button>
    </span>
  </li>;
}


function GiftTitle(gift: GT.Gift) {
  return gift.url
      ? <a href={gift.url} >{gift.title}</a>
      : <span>{gift.title}</span>;
}
