import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Divider, List, Icon, Label, Grid } from "semantic-ui-react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import api from "../api";
import Header from "./Header";
import Footer from "./Footer";

const SummaryStep = (props) => {
  const [sortedGoodOpinions, setSortedGoodOpinions] = useState([]);
  const [sortedBadOpinions, setSortedBadOpinions] = useState([]);
  const [retroId, setRetroId] = useState(queryString.parse(useLocation().search)._id);

  let retro = useSelector((state) => state.find((retro) => retro._id === retroId));

  useEffect(() => {
    fetchVotedOpinions();
  }, []);

  useEffect(() => {
    setOpinionsSorted(retro.opinions);
  }, [retro]);

  const fetchVotedOpinions = async () => {
    const { opinions } = await api.getRetro(retroId);
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
      <Header pageTitle={"Summary"}></Header>
      <Container style={{ width: "500px", padding: "20px 0px" }}>
        {sortedGoodOpinions.map((opinion) => {
          return (
            <Grid key={opinion._id}>
              <Grid.Row style={{ padding: "5px 0px 15px 0px" }} columns="2">
                <Grid.Column width="13" floated="left" textAlign="left">
                  {opinion.isPositive ? <Icon name="plus" color="green" /> : <Icon name="minus" color="red" />}
                  {opinion.description}
                </Grid.Column>
                <Grid.Column width="3" floated="right" textAlign="right">
                  <Label color='teal'>{opinion.votes}</Label>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          );
        })}
        <Divider />
        <List>
          {sortedBadOpinions.map((opinion) => {
            return (
              <Grid key={opinion._id}>
                <Grid.Row style={{ padding: "5px 0px 15px 0px" }} columns="2">
                  <Grid.Column width="13" floated="left" textAlign="left">
                    {opinion.isPositive ? <Icon name="plus" color="green" /> : <Icon name="minus" color="red" />}
                    {opinion.description}
                  </Grid.Column>
                  <Grid.Column width="3" floated="right" textAlign="right">
                    <Label color='teal'>{opinion.votes}</Label>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            );
          })}
        </List>
      </Container>
      <Footer style={{ paddingTop: "30px" }} />
    </div>
  );
};

export default SummaryStep;
