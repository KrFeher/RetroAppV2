import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Button, Grid, List, Divider, Placeholder, Icon } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import { useHistory } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import actions from "../actions";

function LoginPage() {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  let retros = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchRetros();
  }, []);

  const fetchRetros = async () => {
    setIsLoading(true);
    const response = await api.getRetros();
    if (!response) {
      toast("Could not read retros from server. Something is wrong!", { type: "error" });
    } else {
      dispatch(actions.setRetros(response));
    }
    setIsLoading(false);
  };

  return (
    <Container
      style={{
        width: "500px",
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
                    <List.Item key={retro._id} onClick={() => history.push(`/retro?_id=${retro._id}`)}>
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
      <Button style={{ marginTop: "10px" }} circular icon onClick={fetchRetros} loading={isLoading}>
        <Icon name="refresh" />
      </Button>
    </Container>
  );
}

export default LoginPage;
