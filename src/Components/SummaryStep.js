import React, { useState, useEffect } from "react";
import { Container, Divider, List, Icon, Label, Button } from "semantic-ui-react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import api from "../api";

const SummaryStep = (props) => {
  const [sortedGoodOpinions, setSortedGoodOpinions] = useState([]);
  const [sortedBadOpinions, setSortedBadOpinions] = useState([]);
  const retroId = queryString.parse(useLocation().search);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  useEffect(() => {
    fetchVotedOpinions();
  }, []);

  const fetchVotedOpinions = async () => {
    setIsWaitingForResponse(true);
    const { opinions } = await api.getRetro(retroId._id);
    setIsWaitingForResponse(false);
    const onlyGood = opinions.filter((opinion) => opinion.isPositive);
    const onlyBad = opinions.filter((opinion) => !opinion.isPositive);
    const sortedGood = onlyGood.sort((opinionA, opinionB) => opinionB.votes - opinionA.votes);
    const sortedBad = onlyBad.sort((opinionA, opinionB) => opinionB.votes - opinionA.votes);
    setSortedGoodOpinions(sortedGood);
    setSortedBadOpinions(sortedBad);
  };

  return (
    <div>
      <Container>
        <List>
          {sortedGoodOpinions.map((opinion) => {
            return (
              <List.Item style={{ padding: "5px" }} key={opinion._id}>
                <List.Content floated="left">
                  <List.Description>
                    {opinion.isPositive ? <Icon name="plus" color="green" /> : <Icon name="minus" color="red" />}
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
              <List.Item style={{ padding: "5px" }} key={opinion._id}>
                <List.Content floated="left">
                  <List.Description>
                    {opinion.isPositive ? <Icon name="plus" color="green" /> : <Icon name="minus" color="red" />}
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
        <Button circular floated="left" name="refresh" size="large" onClick={fetchVotedOpinions} loading={isWaitingForResponse} icon>
          <Icon name="refresh" />
        </Button>
      </Container>
    </div>
  );
};

export default SummaryStep;
