import * as React from 'react';

export function GiftEmpty() {
  return <div className="empty-gift bg-gray text-center text-gray">
    <i className="icon icon-3x icon-stop d-block"></i>
    <span className="h4 d-block">No gift yet. Click the '+' button to add a gift</span>
  </div>
}