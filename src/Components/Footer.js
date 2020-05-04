import React from "react";
import { Container } from "semantic-ui-react";

const Footer = ({ children }) => {
  return (
    <Container
      style={{
        margin: "15px",
        padding: "15px",
        background: "#7761F1",
        border: "7px solid #7761F1",
        borderRadius: "20px 20px 0px 0px",
        color: "#C8C7D1",
        fontStyle: "italic",
        textAlign: "center",
        width: "500px",
      }}
    >
      {children}
    </Container>
  );
};

export default Footer;
