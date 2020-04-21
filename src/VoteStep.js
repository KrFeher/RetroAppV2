import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Container, Button, List, Icon, Message } from "semantic-ui-react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import api from "./api";

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
  const retroId = queryString.parse(useLocation().search);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const currentRetro = await api.getRetro(retroId.id);
      currentRetro.opinions = currentRetro.opinions.sort((x, y) => (x.isPositive === y.isPositive ? 0 : x.isPositive ? -1 : 1));

      let newStates = {};
      currentRetro.opinions.forEach((opinion) => {
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
    }
    fetchData();
  }, []);

  const onNextStepClick = async () => {
    // TODO: warning if nothing is voted, but let them through
    const votedOpinionIds = Object.entries(opinionsWithVotes)
      .map((opinion) => {
        return opinion[1].upVoted ? opinion[0] : null;
      })
      .filter((item) => item !== null);

    const isSuccess = await api.submitVotesOnOpinion(retroId.id, votedOpinionIds);
    if (isSuccess) {
      props.finishedAddingAction(1);
    } else {
      setShowError(true);
    }
    props.finishedAddingAction(2);
  };

  const voteUpOpinion = (id) => {
    setOpinionsWithVotes({
      ...opinionsWithVotes,
      [id]: {
        ...opinionsWithVotes[id],
        upVoted: !opinionsWithVotes[id].upVoted,
      },
    });
  };

  return (
    <div>
      <Container>
        <Message error content="Something went wrong server side. Please try again." size="tiny" hidden={!showError} />
        <List>
          {Object.entries(opinionsWithVotes).map((opinion) => {
            return (
              <List.Item style={{ padding: "5px" }} key={opinion[0]}>
                <List.Content floated="left">
                  <List.Description>
                    {opinion[1].isPositive ? <Icon name="plus" color="green" /> : <Icon name="minus" color="red" />}
                    {opinion[1].description}
                  </List.Description>
                </List.Content>
                <List.Content floated="right">
                  <Button
                    size="mini"
                    icon="up arrow"
                    color={opinionsWithVotes[opinion[0]].upVoted ? "green" : "grey"}
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
    </div>
  );
};

export default VoteStep;
