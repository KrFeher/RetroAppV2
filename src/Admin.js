import React, { useState, useEffect } from "react";
import { Container, Button, Input, Divider, List } from "semantic-ui-react";
import api from "./api";

const Admin = () => {
  const [retros, setRetros] = useState([]);
  const [newRetroName, setNewRetroName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await api.getRetros();
      setRetros(response);
    }
    fetchData();
  }, [retros]);

  const addRetro = () => {
    if (newRetroName) {
      api.addRetro(newRetroName);
    }
  };

  const deleteRetro = (retroId) => {
    api.deleteRetro(retroId);
  };

  const onRetroNameChange = (event) => {
    setNewRetroName(event.target.value);
  };

  return (
    <Container style={{ width: "500px", border: "1px solid", margin: "15px", padding: "15px" }}>
      <h2>Create new retro</h2>
      <Input placeholder={"unique retro name"} onChange={onRetroNameChange}></Input>
      <Button onClick={addRetro}>Create</Button>
      <Divider></Divider>
      <h2>Retro management</h2>
      <List>
        {retros.map((retro) => (
          <List.Item>
            <List.Content floated="left">
              <h4 style={{ padding: "5px" }}>{retro.id}</h4>
            </List.Content>
            <List.Content floated="right">
              <Button color="red" size="tiny" onClick={() => deleteRetro(retro.id)}>
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
