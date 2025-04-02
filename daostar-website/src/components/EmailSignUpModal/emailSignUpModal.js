import React, { useState } from "react";
import { Dialog, InputGroup, Button } from "@blueprintjs/core";

const EmailSignupModal = ({ isOpen, onClose, onSubmit, reportTitle }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (email) {
      onSubmit(email);
      setEmail(""); // Clear the email input
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Access Report">
      <div className="bp4-dialog-body">
        <p>
          To view the report <strong>{reportTitle}</strong>, please provide your email. The report link will be sent to your inbox.
        </p>
        <InputGroup
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="bp4-dialog-footer">
        <Button onClick={onClose}>Cancel</Button>
        <Button intent="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Dialog>
  );
};

export default EmailSignupModal;