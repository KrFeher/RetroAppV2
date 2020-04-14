import React, { useState } from "react";
import {
  Breadcrumb,
  Container,
  Divider,
  Grid,
  Input,
  Button,
  List,
  Icon,
} from "semantic-ui-react";

const Retro = () => {
  const [opinions, setOpinions] = useState([
    { description: "Potato", isPositive: true },
    { description: "Cheese is very nice too", isPositive: false },
  ]);
  const [currentIsPositive, setCurrentIsPositive] = useState("default");

  const onCurrentIconClick = () => {
    switch (currentIsPositive) {
      case "default":
        setCurrentIsPositive(true);
        break;
      case true:
        setCurrentIsPositive(false);
        break;
      case false:
        setCurrentIsPositive(true);
        break;
      default:
        break;
    }
  };

  return (
    <Container
      style={{
        width: "600px",
        border: "1px solid",
        margin: "15px",
        padding: "15px",
      }}
    >
      <Grid>
        <Grid.Column textAlign="center">
          <Breadcrumb>
            <Breadcrumb.Section active>Add opinion</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right arrow" />
            <Breadcrumb.Section>Vote for others</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right arrow" />
            <Breadcrumb.Section>See summary</Breadcrumb.Section>
          </Breadcrumb>
          <Divider />
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column>
          <Grid.Row style={{ paddingBottom: "10px" }}>
            <Input label="Write an opinion : "></Input>
            {currentIsPositive === "default" ? (
              <Button
                circular
                size="tiny"
                style={{ marginLeft: "10px" }}
                onClick={onCurrentIconClick}
              >
                Choose
              </Button>
            ) : currentIsPositive ? (
              <Button
                circular
                icon="plus"
                size="tiny"
                style={{ marginLeft: "10px" }}
                color="green"
                onClick={onCurrentIconClick}
              ></Button>
            ) : (
              <Button
                circular
                icon="minus"
                size="tiny"
                style={{ marginLeft: "10px" }}
                color="red"
                onClick={onCurrentIconClick}
              ></Button>
            )}
          </Grid.Row>
          <Grid.Row>
            <Button size="tiny" color="olive">
              Add opinion
            </Button>
          </Grid.Row>
        </Grid.Column>
      </Grid>
      <Divider />
      <List>
        {opinions.map((opinion) => {
          return (
            <List.Item verticalAlign="middle" style={{ padding: "5px" }}>
              <List.Content floated="left">
                <List.Description>
                  {opinion.isPositive ? (
                    <Icon name="plus" color="green" />
                  ) : (
                    <Icon name="minus" color="red" />
                  )}
                  {opinion.description}
                </List.Description>
              </List.Content>
              <List.Content floated="right">
                <Button size="mini" icon="trash" circular></Button>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
      <Container textAlign="right" style={{ paddingTop: "30px" }}>
        <Button icon labelPosition="right">
          Next step: Vote
          <Icon name="right arrow" />
        </Button>
      </Container>
    </Container>
  );
};

export default Retro;
