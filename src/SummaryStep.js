import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import {
  Container,
  Divider,
  Grid,
  Input,
  Button,
  List,
  Icon,
  Label,
} from "semantic-ui-react";

const SummaryStep = (props) => {
  const [opinions, setOpinions] = useState([
    {
      id: uuid(),
      description: "Example Positive Feedback1",
      isPositive: true,
      votes: 5,
    },
    {
      id: uuid(),
      description: "Example Positive Feedback2",
      isPositive: true,
      votes: 2,
    },
    {
      id: uuid(),
      description: "Example Positive Feedback3",
      isPositive: true,
      votes: 1,
    },
    {
      id: uuid(),
      description: "Example Positive Feedback4",
      isPositive: true,
      votes: 4,
    },
    {
      id: uuid(),
      description: "Example Negative Feedback1",
      isPositive: false,
      votes: 0,
    },
    {
      id: uuid(),
      description: "Example Negative Feedback2",
      isPositive: false,
      votes: 0,
    },
    {
      id: uuid(),
      description: "Example Negative Feedback3",
      isPositive: false,
      votes: 3,
    },
    {
      id: uuid(),
      description: "Example Negative Feedback4",
      isPositive: false,
      votes: 2,
    },
  ]);

  const [sortedGoodOpinions, setSortedGoodOpinions] = useState([]);
  const [sortedBadOpinions, setSortedBadOpinions] = useState([]);

  useEffect(() => {
    const onlyGood = opinions.filter(opinion => opinion.isPositive);
    const onlyBad = opinions.filter(opinion => !opinion.isPositive)
    const sortedGood = onlyGood.sort((opinionA, opinionB) => opinionB.votes - opinionA.votes);
    const sortedBad = onlyBad.sort((opinionA, opinionB) => opinionB.votes - opinionA.votes);
    setSortedGoodOpinions(sortedGood);
    setSortedBadOpinions(sortedBad);
  }, []);

  return (
    <div>
      <Container>
        <List>
          {sortedGoodOpinions.map((opinion) => {
            return (
              <List.Item
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
                  <Label>{opinion.votes}</Label>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
        <Divider />
        <List>
          {sortedBadOpinions.map((opinion) => {
            return (
              <List.Item
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
                  <Label>{opinion.votes}</Label>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      </Container>
    </div>
  );
};

export default SummaryStep;
