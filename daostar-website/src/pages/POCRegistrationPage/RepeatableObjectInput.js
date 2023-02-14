import React from "react";
import { Button, ControlGroup, FormGroup } from "@blueprintjs/core";
import TextInput from "./TextInput";
import Helptext from "./Helptext";

const RepeatableObjectInput = ({
  value = [{}],
  onChange,
  groupLabel,
  name,
  helptext,
  fields = [],
}) => {
  const addInput = () => {
    onChange([...value, {}]);
  };

  const deleteInput = (index) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  const onInputChange = (val, index, fieldName) => {
    const newData = [...value];
    newData[index] = { ...newData[index], [fieldName]: val };
    onChange(newData);
  };

  return (
    <div className="wizard-row">
      <FormGroup label={groupLabel} fill>
        <Helptext>{helptext}</Helptext>
        {value.map((item, index) => (
          <ControlGroup
            key={index}
            className="wizard-center-row-flex"
            fill
            vertical={false}
            style={{ marginBottom: 20 }}
          >
            <FormGroup>
              {fields.map((field, fieldIndex) => (
                <TextInput
                  key={fieldIndex}
                  wrapped={false}
                  fill
                  value={item[field.name]}
                  onChange={(val) => onInputChange(val, index, field.name)}
                  {...field}
                  style={{
                    marginBottom: fieldIndex === fields.length - 1 ? 0 : 10,
                  }}
                />
              ))}
            </FormGroup>
            {index > 0 && (
              <Button
                icon="delete"
                onClick={() => deleteInput(index)}
                style={{ maxWidth: 48 }}
              />
            )}
          </ControlGroup>
        ))}
        <Button type="button" onClick={addInput}>
          + Add {name}
        </Button>
      </FormGroup>
    </div>
  );
};

export default RepeatableObjectInput;
