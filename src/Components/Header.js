import React from "react";
import { Grid, Container, Header as SemanticHeader } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const Header = ({ pageTitle }) => {
  let history = useHistory();

  return (
    <Container
      style={{
        width: "500px",
        margin: "15px",
        padding: "15px",
        background: "#7761F1",
        color: "white",
        border: "7px solid #7761F1",
        borderRadius: "0px 0px 50px 50px",
        paddingBottom: "30px",
      }}
    >
      <Grid>
        <Grid.Row>
          <SemanticHeader
            as="h1"
            inverted
            style={{
              padding: "5px 0px 0px 15px",
              textTransform: "uppercase",
              cursor: 'pointer'
            }}
            onClick={()=> history.push(`/`)}
          >
            Retro app
          </SemanticHeader>
        </Grid.Row>
      </Grid>
      <Grid centered>
        <Grid.Column verticalAlign="middle" style={{ padding: "0px" }}>
          <SemanticHeader
            as="h4"
            inverted
            style={{
              borderBottom: "1px solid",
              width: "50%",
              margin: "auto",
              textTransform: "uppercase",
            }}
          >
            {pageTitle}
          </SemanticHeader>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Header;
