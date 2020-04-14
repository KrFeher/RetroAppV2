import React, { useState } from "react";
import {
  Breadcrumb,
  Container,
  Divider,
  Grid,
  Transition,
  Button,
  Icon,
} from "semantic-ui-react";
import OpinionStep from "./OpinionStep";
import VoteStep from "./VoteStep";
import SummaryStep from "./SummaryStep";

const Retro = () => {
  const [opinionStepVisibility, setOpinionStepVisibility] = useState(true);
  const [voteStepVisibility, setVoteStepVisibility] = useState(false);
  const [summaryStepVisibility, setSummaryStepVisibility] = useState(false);
  const [activeBreadCrumb, setActiveBreadCrumb] = useState(1);

  const onNextStepClick = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        setOpinionStepVisibility(false);
        setActiveBreadCrumb(2);
        setTimeout(function () {
          setVoteStepVisibility(true);
        }, 500); // delay needed so sections don't load on top of each other due to transition
        break;
      case 2:
        {
          setVoteStepVisibility(false);
          setActiveBreadCrumb(3);
          setTimeout(function () {
            setSummaryStepVisibility(true);
          }, 500); // delay needed so sections don't load on top of each other due to transition
        }
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
            <Breadcrumb.Section active={activeBreadCrumb === 1}>
              Add opinion
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right arrow" />
            <Breadcrumb.Section active={activeBreadCrumb === 2}>
              Vote for others
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right arrow" />
            <Breadcrumb.Section active={activeBreadCrumb === 3}>
              See summary
            </Breadcrumb.Section>
          </Breadcrumb>
          <Divider />
        </Grid.Column>
      </Grid>
      tomorrow: fix transitions or remove them.
      <Transition.Group transitionOnMount duration={{ hide: 500, show: 500 }} animation='fade'>
        {opinionStepVisibility && (
          <OpinionStep finishedAddingAction={onNextStepClick} />
        )}
        {voteStepVisibility && (
          <VoteStep finishedAddingAction={onNextStepClick}></VoteStep>
        )}
        {summaryStepVisibility && (
          <SummaryStep></SummaryStep>
        )}
      </Transition.Group>
    </Container>
  );
};

export default Retro;
