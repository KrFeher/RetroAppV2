import React, { useEffect, useState } from "react";
import { Container, Button, Grid, List, Message, Divider, Placeholder } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import { useHistory } from "react-router-dom";
import api from "./api";
import { toast } from "react-toastify";

function LoginPage() {
  let history = useHistory();
  const [retros, setRetros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await api.getRetros();
      if (!response) {
        toast("Could not read retros from server. Something is wrong!", { type: "error" });
      } else {
        setRetros(response);
      }
      setIsLoading(false);
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
          <Button onClick={() => history.push("/admin")}>Retro lead login</Button>
        </Grid.Column>
      </Grid>
      {isLoading ? (
        <React.Fragment>
          {"loading retros..."}
          <Placeholder>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder>
        </React.Fragment>
      ) : (
        <Grid>
          <Grid.Row style={{ margin: "5px" }}>
            <h3>All open retros to join:</h3>
          </Grid.Row>
          <Grid.Row>
            <Router>
              <List selection>
                {retros.map((retro) => {
                  return (
                    <List.Item onClick={() => history.push(`/retro?id=${retro._id}`)}>
                      <List.Content>
                        <List.Header>{retro._id}</List.Header>
                      </List.Content>
                    </List.Item>
                  );
                })}
              </List>
            </Router>
          </Grid.Row>
        </Grid>
      )}
    </Container>
  );
}

export default LoginPage;
