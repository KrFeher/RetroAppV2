import React from "react";
import {
  Container,
  Grid,
  Button,
  Input,
  Divider,
  List,
} from "semantic-ui-react";

const Admin = () => {
  return (
    <Container style={{ width: "500px", border: "1px solid", margin: "15px", padding: "15px" }}>
      <h2>Create new retro</h2>
      <Input placeholder={"unique retro name"}></Input>
      <Button>Create</Button>
      <Divider></Divider>
      <h2>Open retros</h2>
      <List>
        <List.Item>
          <List.Header style={{ padding: "5px" }}>Retro name</List.Header>
          <List.Content>
            <Button size="tiny">
              Go to Retro
            </Button>
            <Button size="tiny">
              See summary
            </Button>
            <Button color="red" size="tiny">
              Delete
            </Button>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Header style={{ padding: "5px" }}>Potato</List.Header>
          <List.Content>
            <Button size="tiny">
              Go to Retro
            </Button>
            <Button size="tiny">
              See summary
            </Button>
            <Button color="red" size="tiny">
              Delete
            </Button>
          </List.Content>
        </List.Item>
      </List>
    </Container>
  );
};

export default Admin;
