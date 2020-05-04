import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Divider, List, Icon, Label, Button } from "semantic-ui-react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import api from "../api";

const SummaryStep = (props) => {
  const [sortedGoodOpinions, setSortedGoodOpinions] = useState([]);
  const [sortedBadOpinions, setSortedBadOpinions] = useState([]);
  const [retroId, setRetroId] = useState(queryString.parse(useLocation().search)._id);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  let retro = useSelector((state) => state.find(retro => retro._id === retroId));

  useEffect(() => {
    fetchVotedOpinions();
  }, []);

  useEffect(() => {
    setOpinionsSorted(retro.opinions);
  }, [retro]);

  const fetchVotedOpinions = async () => {
    setIsWaitingForResponse(true);
    const { opinions } = await api.getRetro(retroId);
    setIsWaitingForResponse(false);
    setOpinionsSorted(opinions);
  };

  const setOpinionsSorted = (opinions) => {
    if (opinions) {
      const onlyGood = opinions.filter((opinion) => opinion.isPositive);
      const onlyBad = opinions.filter((opinion) => !opinion.isPositive);
      const sortedGood = onlyGood.sort((opinionA, opinionB) => opinionB.votes - opinionA.votes);
      const sortedBad = onlyBad.sort((opinionA, opinionB) => opinionB.votes - opinionA.votes);
      setSortedGoodOpinions(sortedGood);
      setSortedBadOpinions(sortedBad);
    }
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
      </Container>
    </div>
  );
};

export default SummaryStep;
