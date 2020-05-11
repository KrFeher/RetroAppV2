import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Button, Grid, Placeholder, Card, Popup } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import { useHistory } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import actions from "../actions";
import util from "./utils";
import Footer from "./Footer";

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
    <React.Fragment>
      <Container
        style={{
          width: "500px",
          margin: "15px",
          padding: "15px",
        }}
      >
        <Grid
          style={{
            background: "#7761F1",
            color: "white",
            border: "7px solid #7761F1",
            borderRadius: "0px 0px 50px 50px",
            paddingBottom: "30px",
          }}
        >
          <Grid.Column floated="left" width={8}>
            <h1 style={{ textTransform: "uppercase" }}>Retro app</h1>
          </Grid.Column>
          <Grid.Column floated="right" width={8} textAlign="right">
            <Button size="small" circular color="teal" onClick={() => history.push("/admin")}>
              Retro management{" "}
            </Button>
          </Grid.Column>
        </Grid>
        {isLoading ? (
          <Placeholder style={{ marginTop: "50px" }}>
            {[...Array(8)].map((e, i) => (
              <Placeholder.Line key={i} />
            ))}
          </Placeholder>
        ) : (
          <Grid>
            <Grid.Row style={{ margin: "5px" }}>
              <h3>All open retros to join:</h3>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Router>
                {retros.map((retro) => {
                  return (
                    <Grid.Column key={retro._id} style={{ padding: "10px 14px 0px 0px" }}>
                      <Popup
                        mouseEnterDelay={1000}
                        content={retro._id}
                        trigger={
                          <Card onClick={() => history.push(`/retro?_id=${retro._id}`)}>
                            <Card.Content
                              textAlign="center"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignContent: "center",
                                textTransform: "uppercase",
                                flexDirection: "column",
                                padding: "2px",
                                height: "50px",
                                overflow: "hidden",
                              }}
                            >
                              {util.truncate(retro._id, 23)}
                            </Card.Content>
                          </Card>
                        }
                      ></Popup>
                    </Grid.Column>
                  );
                })}
              </Router>
            </Grid.Row>
          </Grid>
        )}
      </Container>
      <Footer>{"click a retro to join..."}</Footer>
    </React.Fragment>
  );
}

export default LoginPage;
