import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Button, Icon, Confirm, Grid, Popup } from "semantic-ui-react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";

export const VoteStep = (props) => {
  const [opinionsWithVotes, setOpinionsWithVotes] = useState({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [retroId, setRetroId] = useState(queryString.parse(useLocation().search)._id);

  let realTimeRetro = useSelector((state) => state.find((retro) => retro._id === retroId));

  useEffect(() => {
    fetchOpinions();
  }, []);

  useEffect(() => {
    if (realTimeRetro && Object.keys(opinionsWithVotes).length > 0) {
      const newRealTimeOpinionsIds = realTimeRetro.opinions.map((opinion) => opinion._id);
      const oldOpinionIds = Object.keys(opinionsWithVotes);
      const isThereNew = newRealTimeOpinionsIds.some((newId) => !oldOpinionIds.includes(newId));
      if (isThereNew) {
        toast("New opinions have came in. Press refresh to see them.", { type: "info" });
      } // don't want to auto-update opinions on purpose. Let user do it.
    }
  }, [realTimeRetro]);

  const fetchOpinions = async () => {
    setIsWaitingForResponse(true);
    const currentRetro = await api.getRetro(retroId);
    setIsWaitingForResponse(false);
    const newOpinions = currentRetro.opinions.filter((opinion) => !Object.keys(opinionsWithVotes).includes(opinion._id));

    let newStates = {};
    newOpinions.forEach((opinion) => {
      newStates = {
        ...newStates,
        [opinion._id]: {
          description: opinion.description,
          isPositive: opinion.isPositive,
          upVoted: false,
        },
      };
    });
    setOpinionsWithVotes({ ...opinionsWithVotes, ...newStates });
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

    const isSuccess = await api.submitVotesOnOpinion(retroId, votedOpinionIds);
    setIsWaitingForResponse(false);
    if (isSuccess) {
      props.finishedAddingAction(2);
    } else {
      toast("Something went wrong saving your votes. Please try again.", { type: "error" });
    }
  };
  return (
    <div>
      <Header pageTitle={"Vote on opinions"}></Header>
      <Container style={{ width: "500px", padding: "20px 0px" }}>
        {Object.entries(opinionsWithVotes).map((opinion) => {
          return (
            <Grid key={opinion._id}>
              <Grid.Row style={{ padding: "5px 0px 15px 0px" }} columns="2">
                <Grid.Column width="13" floated="left" textAlign="left">
                  {opinion[1].isPositive ? <Icon name="plus" color="green" /> : <Icon name="minus" color="red" />}
                  {opinion[1].description}
                </Grid.Column>
                <Grid.Column width="3" floated="right" textAlign="right">
                  <Button
                    size="medium"
                    icon="up arrow"
                    color={opinionsWithVotes[opinion[0]].upVoted ? "green" : "grey"}
                    circular
                    onClick={() => voteUpOpinion(opinion[0])}
                  ></Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          );
        })}
      </Container>
      <Footer style={{ paddingTop: "30px" }}>
        <Grid>
          <Grid.Row columns="2">
            <Grid.Column>
                <Button floated="left" circular size="small" color="teal" onClick={fetchOpinions} icon name="refresh" loading={isWaitingForResponse}>
                  <Popup trigger={<Icon name="refresh" />} content="Manually refresh opinions"></Popup>
                </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                floated="right"
                circular
                size="small"
                color="teal"
                icon
                labelPosition="right"
                onClick={onNextStepClick}
                loading={isWaitingForResponse}
              >
                See Summary
                <Icon name="right arrow" />
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Confirm
          open={isConfirmOpen}
          onCancel={onConfirmCancelClick}
          onConfirm={onConfirmOkayClick}
          content="Are you sure you want to submit your votes? There is no return."
        />
      </Footer>
    </div>
  );
};

export default VoteStep;
