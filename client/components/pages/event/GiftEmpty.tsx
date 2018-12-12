import * as React from 'react';

export function GiftEmpty() {
    return <div className="empty mt-2">
    <div className="empty-icon">
      <i className="icon icon-4x icon-stop"></i>
    </div>
    <p className="empty-title h5">No gift :-(</p>
    <p className="empty-subtitle">Click the '+' button to add a gift</p>
  </div>
}