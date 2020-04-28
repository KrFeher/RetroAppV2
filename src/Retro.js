import React, { useState } from "react";
import {
  Breadcrumb,
  Container,
  Divider,
  Grid,
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
        setVoteStepVisibility(true);
        break;
      case 2:
        setVoteStepVisibility(false);
        setActiveBreadCrumb(3);
        setSummaryStepVisibility(true);
        break;
      default:
        break;
    }
  };

  return (
    <Container
      style={{
        width: "600px",
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
      {opinionStepVisibility && (
        <OpinionStep finishedAddingAction={onNextStepClick} />
      )}
      {voteStepVisibility && (
        <VoteStep finishedAddingAction={onNextStepClick}></VoteStep>
      )}
      {summaryStepVisibility && <SummaryStep></SummaryStep>}
    </Container>
  );
};

export default Retro;
