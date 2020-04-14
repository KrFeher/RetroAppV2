import React, { useEffect, useState } from "react";
import { Modal, Button, Grid, Header, List, Message } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import { useHistory } from "react-router-dom";

function LoginPage(props) {
  let history = useHistory();

  return (
    <Modal size="tiny" defaultOpen closeOnDimmerClick={false}>
      <Modal.Header>
        <Grid>
          <Grid.Column floated="left" width={8}>
            Retro app
          </Grid.Column>
          <Grid.Column floated="right" width={8} textAlign="right">
            <Button onClick={() => history.push("/admin")}>
              Retro lead login
            </Button>
          </Grid.Column>
        </Grid>
      </Modal.Header>
      <Modal.Content>
        <Message
          error
          content="Only logged in users can access the retro creation page"
          size="tiny"
          hidden={!props.error}
        />
        <Modal.Description>
          <Header>All open retros to join:</Header>
          <Router>
            <List selection verticalAlign="middle">
              <List.Item onClick={() => history.push("/retro")}>
                <List.Content>
                  <List.Header> Helen </List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Christian</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Header>Daniel</List.Header>
                </List.Content>
              </List.Item>
            </List>
          </Router>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default LoginPage;
