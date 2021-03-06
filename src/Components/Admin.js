import React, { useState, useEffect } from "react";
import { Container, Input, Divider, Card, Grid, Loader, Popup, Label } from "semantic-ui-react";
import api from "../api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import util from "./utils";

const Admin = () => {
  const [retros, setRetros] = useState([]);
  const [newRetroName, setNewRetroName] = useState("");
  const [inputError, setInputError] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  let history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const response = await api.getRetros();
      if (!response) {
        toast("Could not read retros from server. Something is wrong!", { type: "error" });
      } else {
        setRetros(response);
      }
    }
    fetchData();
  }, []);

  const addRetro = async () => {
    setIsWaitingForResponse(true);
    if (newRetroName && !inputError) {
      if (!retros.find((retro) => retro._id === newRetroName)) {
        const result = await api.addRetro(newRetroName);
        if (!result) {
          toast("Something went wrong while adding new retro, please try again!", { type: "error" });
        } else {
          const response = await api.getRetros();
          setRetros(response);
        }
      } else {
        toast("Please enter a unique retro name.", { type: "info" });
        setInputError(true);
      }
    } else {
      toast("Make sure retro name is valid", { type: "warning" });
      setInputError(true);
    }
    setIsWaitingForResponse(false);
  };

  const deleteRetro = async (e, retroId) => {
    e.stopPropagation();
    if (!isWaitingForResponse) {
      setIsWaitingForResponse(true);
      const result = await api.deleteRetro(retroId);
      if (!result) {
        toast("Something went wrong while deleting retro, please try again!", { type: "error" });
      } else {
        const response = await api.getRetros();
        setRetros(response);
      }
      setIsWaitingForResponse(false);
    } else {
      toast("Operation is in progress, please wait.", { type: "info" });
    }
  };

  const onRetroNameChange = (event) => {
    const retroName = event.target.value;
    setInputError(false);

    if (retroName.length > 20) {
      setInputError(true);
    }

    if (retros.find((retro) => retro._id === retroName)) {
      setInputError(true);
    }

    if (retroName.includes("/") || retroName.includes("?")) {
      // we're using them in URL and it messes up navigation.
      setInputError(true);
    }

    setNewRetroName(retroName);
  };

  return (
    <div>
      <Header pageTitle={"Retro management"}></Header>
      <Container style={{ width: "500px", margin: "15px", padding: "15px" }}>
        <Grid columns="1">
          <Grid.Row>
            <Grid.Column>
              <Input
                placeholder={"unique retro name"}
                onChange={onRetroNameChange}
                error={inputError}
                label={
                  <span
                    style={{
                      border: "2px solid",
                      borderRadius: "0px 15px 15px 0px",
                      borderColor: "#7761F1",
                      background: "#7761F1",
                      padding: "8px",
                    }}
                  >
                    <span onClick={addRetro} style={{ color: "white", textTransform: "upperCase", cursor: "pointer" }}>
                      Create
                    </span>
                  </span>
                }
                labelPosition="right"
                fluid
              ></Input>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ paddingLeft: "20px", paddingTop: "0px", color: "grey" }}>
            {
              <span>
                <div>{"* not allowed characters: / and ?"}</div>
                <div>{"* maximum character length: 20"}</div>
              </span>
            }
          </Grid.Row>
        </Grid>

        <Divider></Divider>
        <Grid>
          <Grid.Row columns="2">
            <Grid.Column width="13">
              <h2>Currently available retros</h2>
            </Grid.Column>
            <Grid.Column width="3" floated="right">
              <Loader inline active={isWaitingForResponse}></Loader>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row columns={3}>
            {retros.map((retro) => {
              return (
                <Grid.Column key={retro._id} style={{ padding: "10px 14px 0px 0px" }}>
                  <Popup
                    mouseEnterDelay={1000}
                    trigger={
                      <div>
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
                            <Label icon="trash" size="mini" corner="right" color="red" onClick={(event) => deleteRetro(event, retro._id)}></Label>
                            <React.Fragment>{util.truncate(retro._id, 23)}</React.Fragment>
                          </Card.Content>
                        </Card>
                      </div>
                    }
                    content={retro._id}
                  ></Popup>
                </Grid.Column>
              );
            })}
          </Grid.Row>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Admin;
