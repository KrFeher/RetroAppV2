import React, { useEffect, useState } from "react";
import {
  Container,
  Divider,
  Grid,
  Input,
  Button,
  List,
  Icon,
  Transition,
} from "semantic-ui-react";

export const VoteStep = (props) => {
  const onNextStepClick = () => {
    props.finishedAddingAction(2);
  };

  return (
    <React.Fragment>
      <Container>
        <List>
          <List.Item>Vote step here</List.Item>
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

export default VoteStep;
