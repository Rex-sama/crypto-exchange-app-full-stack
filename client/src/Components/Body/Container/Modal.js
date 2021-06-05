import "./Modal.css";
import FocusTrap from "focus-trap-react";
import Form from "./Form";

export default function Modal({
  closeModal,
  onSubmit,
  value,
  triggerText,
  flag,
  check,
}) {
  return (
    <div>
      <FocusTrap>
        <aside
          tag="aside"
          role="dialog"
          tabIndex="-1"
          aria-modal="true"
          className="modal-cover"
          // onClick={onClickOutside}
        >
          <div className="close-div-block">
            <button
              aria-label="Close Modal"
              aria-labelledby="close-modal"
              className="_modal-close"
              onClick={closeModal}
            >
              <span id="close-modal" className="_hide-visual">
                Close
              </span>
              <svg className="_modal-close-icon" viewBox="0 0 40 40">
                <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
              </svg>
            </button>
            <div className="modal-body">
              <Form
                value={value}
                onSubmit={onSubmit}
                triggerText={triggerText}
                flag={flag}
                check={check}
              />
            </div>
          </div>
        </aside>
      </FocusTrap>
    </div>
  );
}
