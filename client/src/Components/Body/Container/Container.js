import "./Modal.css";
import React, { useState } from "react";
import TriggerButton from "./TriggerButton";
import Modal from "./Modal";
export default function Container(props) {
  const [isShown, setisShown] = useState(false);

  const showModal = () => {
    setisShown(true);
  };

  const closeModal = () => {
    setisShown(false);
  };
  return (
    <div>
      <TriggerButton
        showModal={showModal}
        triggerText={props.triggerText}
        value={props.value}
        className={props.className}
      />
      {isShown ? (
        <Modal
          onSubmit={props.onSubmit}
          closeModal={closeModal}
          value={props.value}
          triggerText={props.triggerText}
          flag={props.flag}
          check={props.check}
        />
      ) : null}
    </div>
  );
}
