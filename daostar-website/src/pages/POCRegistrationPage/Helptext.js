import React from "react";

const Helptext = ({ children }) => {
  return (
    <p style={{ fontSize: 10, lineHeight: "1rem", paddingBottom: 5 }}>
      {children}
    </p>
  );
};

export default Helptext;
