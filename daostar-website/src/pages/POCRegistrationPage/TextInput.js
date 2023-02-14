import React, { useState } from "react";
import { FormGroup, InputGroup, Text } from "@blueprintjs/core";
import Helptext from "./Helptext";

const TextInput = ({ label, wrapped = true, helptext, ...props }) => {
  return wrapped ? (
    <div className="wizard-row">
      <FormGroup label={label} fill>
        {helptext && <Helptext>{helptext}</Helptext>}
        <TextInputField {...props} />
      </FormGroup>
    </div>
  ) : (
    <>
      {helptext && <Helptext>{helptext}</Helptext>}
      <TextInputField {...props} />
    </>
  );
};

const TextInputField = ({
  value,
  placeholder,
  required,
  isValid = () => true,
  onChange,
  validationErrorMsg,
  ...props
}) => {
  const [error, setError] = useState("");

  const onInputChange = (e) => {
    onChange(e.target.value);
  };

  const onBlur = (e) => {
    if (required && !e.target.value) {
      setError("This field is required");
      return;
    }

    if (!isValid(e.target.value)) {
      setError(validationErrorMsg);
      return;
    }

    setError("");
  };

  return (
    <>
      <InputGroup
        fill
        value={value}
        placeholder={placeholder}
        onChange={onInputChange}
        onBlur={onBlur}
        intent={error ? "danger" : "none"}
        {...props}
      />
      {error && (
        <Text className="bp4-text-small" style={{ color: "red" }}>
          {error}
        </Text>
      )}
    </>
  );
};

export default TextInput;
