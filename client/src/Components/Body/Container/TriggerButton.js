import React from "react";

export default function TriggerButton({ triggerText, showModal, className }) {
  return (
    <div>
      {className === "modal-button" && triggerText === "BUY" ? (
        <button type="button" className="BUY" onClick={showModal}>
          BUY
        </button>
      ) : (
        <button type="button" className="SELL" onClick={showModal}>
          SELL
        </button>
      )}
    </div>
  );
}
