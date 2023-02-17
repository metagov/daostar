import React from "react";
import { Card } from "@blueprintjs/core";
import RegistrationForm from "./RegistrationForm";
import "./Register.css";

const POCRegistrationPage = (props) => {
  return (
    <div className="centered-wizard">
      <Card className="wizard-card">
        <RegistrationForm />
      </Card>
    </div>
  );
};

export default POCRegistrationPage;
