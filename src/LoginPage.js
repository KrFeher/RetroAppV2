import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Grid,
  List,
  Message,
  Divider,
} from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import { useHistory } from "react-router-dom";
import api from "./api";

function LoginPage(props) {
  let history = useHistory();
  const [retros, setRetros] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.getRetros();
      setRetros(response);
    }
    fetchData();
  }, []);

  return (
    <Container
      style={{
        width: "500px",
        border: "1px solid",
        margin: "15px",
        padding: "15px",
      }}
    >
      <Grid>
        <Grid.Column floated="left" width={8}>
          <h1> Retro app</h1>
          <Divider />
        </Grid.Column>
        <Grid.Column floated="right" width={8} textAlign="right">
          <Button onClick={() => history.push("/admin")}>
            Retro lead login
          </Button>
        </Grid.Column>
      </Grid>
      <Grid>
        <Message
          error
          content="Only logged in users can access the retro creation page"
          size="tiny"
          hidden={!props.error}
        />
        <Grid.Row style={{ margin: "5px" }}>
          <h3>All open retros to join:</h3>
        </Grid.Row>
        <Grid.Row>
          <Router>
            <List selection>
              {retros.map((retro) => {
                return (
                  <List.Item
                    onClick={() => history.push(`/retro?id=${retro.id}`)}
                  >
                    <List.Content>
                      <List.Header>{retro.id}</List.Header>
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>
          </Router>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default LoginPage;
