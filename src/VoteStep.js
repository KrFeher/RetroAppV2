import React, { useEffect, useState } from "react";
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

export const VoteStep = (props) => {
  // Delete once database call is made
  const [opinions, setOpinions] = useState([
    {
      id: uuid(),
      description: "Example Positive Feedback1",
      isPositive: true,
    },
    {
      id: uuid(),
      description: "Example Positive Feedback2",
      isPositive: true,
    },
    {
      id: uuid(),
      description: "Example Positive Feedback3",
      isPositive: true,
    },
    {
      id: uuid(),
      description: "Example Positive Feedback4",
      isPositive: true,
    },
    {
      id: uuid(),
      description: "Example Negative Feedback1",
      isPositive: false,
    },
    {
      id: uuid(),
      description: "Example Negative Feedback2",
      isPositive: false,
    },
    {
      id: uuid(),
      description: "Example Negative Feedback3",
      isPositive: false,
    },
    {
      id: uuid(),
      description: "Example Negative Feedback4",
      isPositive: false,
    },
  ]);

  const [opinionsWithVotes, setOpinionsWithVotes] = useState([]);

  useEffect(() => {
    // call endpoint for data. For now local state will be used.
    // later on this will come dynamically, so need to snap the upVoted flag on top of each
    // useEffect should probably also use something else instead of [] for that purpose
    let newStates = {};
    opinions.forEach((opinion) => {
      newStates = {
        ...newStates,
        [opinion.id]: {
          description: opinion.description,
          isPositive: opinion.isPositive,
          upVoted: false,
        },
      };
      // this structure is better because arrays would change as new results gets added dynamically
    });
    setOpinionsWithVotes(newStates);
  }, []);

  const onNextStepClick = () => {
    // warning if nothing is voted, but let them through
    props.finishedAddingAction(2);
  };

  const voteUpOpinion = (id) => {
    setOpinionsWithVotes({
      ...opinionsWithVotes,
      [id]: {
        ...opinionsWithVotes[id],
        upVoted: !opinionsWithVotes[id].upVoted,
      },
    })
  };

  return (
    <React.Fragment>
      <Container>
        <List>
          {Object.entries(opinionsWithVotes).map((opinion) => {
            return (
              <List.Item
                verticalAlign="middle"
                style={{ padding: "5px" }}
                key={opinion[0]}
              >
                <List.Content floated="left">
                  <List.Description>
                    {opinion[1].isPositive ? (
                      <Icon name="plus" color="green" />
                    ) : (
                      <Icon name="minus" color="red" />
                    )}
                    {opinion[1].description}
                  </List.Description>
                </List.Content>
                <List.Content floated="right">
                  <Button
                    size="mini"
                    icon="up arrow"
                    color={
                      opinionsWithVotes[opinion[0]].upVoted ? "green" : "grey"
                    }
                    circular
                    onClick={() => voteUpOpinion(opinion[0])}
                  ></Button>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      </Container>
      <Container textAlign="right" style={{ paddingTop: "30px" }}>
        <Button icon labelPosition="right" onClick={onNextStepClick}>
          Next step: See Summary
          <Icon name="right arrow" />
        </Button>
      </Container>
    </React.Fragment>
  );
};

export default VoteStep;
