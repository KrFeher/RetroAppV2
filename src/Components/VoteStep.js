import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Container, Button, List, Icon, Confirm, Grid } from "semantic-ui-react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

export const VoteStep = (props) => {
  const [opinionsWithVotes, setOpinionsWithVotes] = useState([]);
  const retroId = queryString.parse(useLocation().search);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  useEffect(() => {
    fetchOpinions();
  }, []);

  const fetchOpinions = async () => {
    setIsWaitingForResponse(true);
    const currentRetro = await api.getRetro(retroId._id);
    setIsWaitingForResponse(false);
    currentRetro.opinions = currentRetro.opinions.sort((x, y) => (x.isPositive === y.isPositive ? 0 : x.isPositive ? -1 : 1));

    let newStates = {};
    currentRetro.opinions.forEach((opinion) => {
      newStates = {
        ...newStates,
        [opinion._id]: {
          description: opinion.description,
          isPositive: opinion.isPositive,
          upVoted: false,
        },
      };
      // this structure is better because arrays would change as new results gets added dynamically
    });
    setOpinionsWithVotes(newStates);
  }

  const voteUpOpinion = (id) => {
    setOpinionsWithVotes({
      ...opinionsWithVotes,
      [id]: {
        ...opinionsWithVotes[id],
        upVoted: !opinionsWithVotes[id].upVoted,
      },
    });
  };

  const onNextStepClick = () => {
    setIsConfirmOpen(true);
  };

  const onConfirmCancelClick = () => {
    setIsConfirmOpen(false);
  };

  const onConfirmOkayClick = async () => {
    setIsConfirmOpen(false);
    setIsWaitingForResponse(true);

    const votedOpinionIds = Object.entries(opinionsWithVotes)
      .map((opinion) => {
        return opinion[1].upVoted ? opinion[0] : null;
      })
      .filter((item) => item !== null);

    const isSuccess = await api.submitVotesOnOpinion(retroId._id, votedOpinionIds);
    setIsWaitingForResponse(false);
    if (isSuccess) {
      props.finishedAddingAction(2);
    } else {
      toast("Something went wrong saving your votes. Please try again.", { type: "error" });
    }
  };

  return (
    <div>
      <Container>
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
        <Container style={{ paddingTop: "30px" }}>
            <Button circular floated='left' name="refresh" size='large' onClick={fetchOpinions} icon loading={isWaitingForResponse}>
              <Icon name='refresh'/>
            </Button>
            <Button floated='right' icon labelPosition="right" onClick={onNextStepClick} loading={isWaitingForResponse}>
              See Summary
              <Icon name="right arrow" />
            </Button>
            <Confirm
              open={isConfirmOpen}
              onCancel={onConfirmCancelClick}
              onConfirm={onConfirmOkayClick}
              content="Are you sure you want to submit your votes? There is no return."
            />
      </Container>
    </div>
  );
};

export default VoteStep;
