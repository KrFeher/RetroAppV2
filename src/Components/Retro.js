import React, { useState, useEffect } from "react";
import { Breadcrumb, Container, Divider, Grid } from "semantic-ui-react";
import OpinionStep from "./OpinionStep";
import VoteStep from "./VoteStep";
import SummaryStep from "./SummaryStep";

const Retro = () => {
  const [opinionStepVisibility, setOpinionStepVisibility] = useState(true);
  const [voteStepVisibility, setVoteStepVisibility] = useState(false);
  const [summaryStepVisibility, setSummaryStepVisibility] = useState(false);

  const onNextStepClick = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        setOpinionStepVisibility(false);
        setVoteStepVisibility(true);
        break;
      case 2:
        setVoteStepVisibility(false);
        setSummaryStepVisibility(true);
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      {opinionStepVisibility && <OpinionStep finishedAddingAction={onNextStepClick} />}
      {voteStepVisibility && <VoteStep finishedAddingAction={onNextStepClick}></VoteStep>}
      {summaryStepVisibility && <SummaryStep></SummaryStep>}
    </React.Fragment>
  );
};

export default Retro;
