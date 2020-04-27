import React, { useState, useEffect } from "react";
import { Container, Button, Input, Divider, List, Grid, Loader } from "semantic-ui-react";
import api from "./api";
import { toast } from "react-toastify";

const Admin = () => {
  const [retros, setRetros] = useState([]);
  const [newRetroName, setNewRetroName] = useState("");
  const [inputError, setInputError] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

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
    if (newRetroName) {
      debugger;
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
      toast("Please enter something to the retro name.", { type: "warning" });
      setInputError(true);
    }
    setIsWaitingForResponse(false);
  };

  const deleteRetro = async (retroId) => {
    setIsWaitingForResponse(true);
    const result = await api.deleteRetro(retroId);
    if (!result) {
      toast("Something went wrong while deleting retro, please try again!", { type: "error" });
    } else {
      const response = await api.getRetros();
      setRetros(response);
    }
    setIsWaitingForResponse(false);
  };

  const onRetroNameChange = (event) => {
    const trimmedRetroName = event.target.value.trim();
    if (retros.find((retro) => retro._id === trimmedRetroName)) {
      setInputError(true);
    } else {
      if (inputError) setInputError(false);
    }
    setNewRetroName(trimmedRetroName);
  };

  return (
    <Container style={{ width: "500px", border: "1px solid", margin: "15px", padding: "15px" }}>
      <Grid>
        <Grid.Column floated="left" width={12}>
          <h2>Create new retro</h2>
        </Grid.Column>
        <Grid.Column floated="right" width={2}>
          <Loader active={isWaitingForResponse}></Loader>
        </Grid.Column>
      </Grid>
      <Input placeholder={"unique retro name"} onChange={onRetroNameChange} error={inputError}></Input>
      <Button onClick={addRetro}>Create</Button>
      <Divider></Divider>
      <h2>Retro management</h2>
      <List>
        {retros.map((retro) => (
          <List.Item key={retro._id}>
            <List.Content floated="left">
              <h4 style={{ padding: "5px" }}>{retro._id}</h4>
            </List.Content>
            <List.Content floated="right">
              <Button color="red" size="tiny" onClick={() => deleteRetro(retro._id)}>
                Delete
              </Button>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Container>
  );
};

export default Admin;
