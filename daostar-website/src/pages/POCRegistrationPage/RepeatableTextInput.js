import React from "react";
import { Button, ControlGroup, FormGroup } from "@blueprintjs/core";
import TextInput from "./TextInput";
import Helptext from "./Helptext";

const RepeatableTextInput = ({
  value = [""],
  onChange,
  groupLabel,
  name,
  helptext,
  fields = [],
}) => {
  const addInput = () => {
    onChange([...value, ""]);
  };

  const deleteInput = (index) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  const onInputChange = (val, index) => {
    const newData = [...value];
    newData[index] = val;
    onChange(newData);
  };

  return (
    <div className="wizard-row">
      <FormGroup label={groupLabel} fill>
        <Helptext>{helptext}</Helptext>
        {value.map((v, i) => (
          <ControlGroup
            key={i}
            className="wizard-centered-row-flex"
            fill
            vertical={false}
          >
            {fields.map((field, j) => (
              <TextInput
                key={field.name || j}
                wrapped={false}
                fill
                value={v}
                onChange={(val) => onInputChange(val, i)}
                {...field}
              />
            ))}
            {i > 0 && <Button icon="delete" onClick={() => deleteInput(i)} />}
          </ControlGroup>
        ))}

        <Button type="button" onClick={addInput}>
          + Add {name}
        </Button>
      </FormGroup>
    </div>
  );
};

export default RepeatableTextInput;
