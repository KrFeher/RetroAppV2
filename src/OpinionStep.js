import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import {
  Container,
  Divider,
  Grid,
  Input,
  Button,
  List,
  Icon,
} from "semantic-ui-react";

const OpinionStep = (props) => {
  // States
  const exampleUuids = [uuid(), uuid()];

  const [opinions, setOpinions] = useState([
    {
      id: exampleUuids[0],
      description: "Example Positive Feedback",
      isPositive: true,
    },
    {
      id: exampleUuids[1],
      description: "Example Negative Feedback",
      isPositive: false,
    },
  ]);
  const [currentIsPositive, setCurrentIsPositive] = useState("default");
  const [newOpinion, setNewOpinion] = useState("");

  // Functions
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

  const addOpinion = () => {
    if (currentIsPositive !== "default") {
      setOpinions([
        ...opinions,
        { id: uuid(), description: newOpinion, isPositive: currentIsPositive },
      ]);
    }
  };

  const deleteOpinion = (id) => {
    const newArray = opinions.filter((opinion) => {
      return opinion.id !== id;
    });
    setOpinions([...newArray]);
  };

  const saveOpinions = () => {
    // check if anything is filled in at all, if not show warning message but proceed.
    // if pressed ok or there's at least 1 item then 
    // remove the 2 example up top
    // .....
    // call back-end to save data
  }

  const onOpinionInputChange = (event) => {
    setNewOpinion(event.target.value);
  };

  const onNextStepClick = () => {
    props.finishedAddingAction(1);
    saveOpinions();
  };

  return (
    <React.Fragment>
      <Container>
        <Grid>
          <Grid.Column>
            <Grid.Row style={{ paddingBottom: "10px" }}>
              <Input
                label="Write an opinion : "
                onChange={onOpinionInputChange}
              ></Input>
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
              <Button
                floated="right"
                size="tiny"
                color="olive"
                onClick={addOpinion}
              >
                Add opinion
              </Button>
            </Grid.Row>
            <Grid.Row></Grid.Row>
          </Grid.Column>
        </Grid>
        <Divider />
        <List>
          {opinions.map((opinion) => {
            return (
              <List.Item
                verticalAlign="middle"
                style={{ padding: "5px" }}
                key={opinion.id}
              >
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
                  <Button
                    size="mini"
                    icon="trash"
                    circular
                    onClick={() => deleteOpinion(opinion.id)}
                  ></Button>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      </Container>
      <Container textAlign="right" style={{ paddingTop: "30px" }}>
        <Button icon labelPosition="right" onClick={onNextStepClick}>
          Next step: Vote
          <Icon name="right arrow" />
        </Button>
      </Container>
    </React.Fragment>
  );
};

export default OpinionStep;
