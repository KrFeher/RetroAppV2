import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Container, Divider, Grid, Input, Button, List, Icon, Confirm } from "semantic-ui-react";
import api from "../api";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { toast } from "react-toastify";
import Footer from "./Footer";

const OpinionStep = (props) => {
  // States
  let location = useLocation();
  const retroId = queryString.parse(location.search);

  const [opinions, setOpinions] = useState([
    {
      _id: uuid(),
      description: "Example Positive Feedback",
      isPositive: true,
      example: true,
    },
    {
      _id: uuid(),
      description: "Example Negative Feedback",
      isPositive: false,
      example: true,
    },
  ]);

  const [currentIsPositive, setCurrentIsPositive] = useState("default");
  const [newOpinion, setNewOpinion] = useState("");
  const [currentRetro, setCurrentRetro] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await api.getRetro(retroId._id);
      setCurrentRetro(response);
    }
    fetchData();
  }, []);

  // Functions
  const onCurrentIconClick = () => {
    switch (currentIsPositive) {
      case "default":
        setCurrentIsPositive(true);
        break;
      case true:
        setCurrentIsPositive(false);
        break;
      case false:
        setCurrentIsPositive(true);
        break;
      default:
        break;
    }
  };

  const addOpinion = () => {
    if (!newOpinion) {
      toast("Enter something first.", { type: "info" });
      setInputError(true);
      return;
    }
    if (currentIsPositive === "default") {
      toast("Choose an intention.", { type: "info" });
      return;
    }

    setOpinions([...opinions, { _id: uuid(), description: newOpinion, isPositive: currentIsPositive }]);
  };

  const deleteOpinion = (id) => {
    const newArray = opinions.filter((opinion) => {
      return opinion._id !== id;
    });
    setOpinions([...newArray]);
  };

  const saveOpinions = async () => {
    const arrayWithoutExamples = opinions.filter((item) => !item.example);
    return arrayWithoutExamples ? await api.submitRetroOpinions(retroId._id, arrayWithoutExamples) : null;
  };

  const onOpinionInputChange = (event) => {
    if (inputError) setInputError(false);
    setNewOpinion(event.target.value);
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
    const isSuccess = await saveOpinions();
    setIsWaitingForResponse(false);
    if (isSuccess) {
      props.finishedAddingAction(1);
    } else {
      toast("Something went wrong saving your opinions. Please try again.", { type: "error" });
    }
  };

  return (
    <React.Fragment>
      <Container>
        <Grid>
          <Grid.Column>
            <Grid.Row style={{ paddingBottom: "10px" }}>
              <Input label="Write an opinion : " onChange={onOpinionInputChange} error={inputError}></Input>
            </Grid.Row>
            <Grid.Row style={{ paddingBottom: "10px" }}>
              {"Choose intention: "}
              {currentIsPositive === "default" ? (
                <Button circular size="tiny" style={{ marginLeft: "10px" }} onClick={onCurrentIconClick}>
                  Choose
                </Button>
              ) : currentIsPositive ? (
                <Button circular icon="plus" size="tiny" style={{ marginLeft: "10px" }} color="green" onClick={onCurrentIconClick}></Button>
              ) : (
                <Button circular icon="minus" size="tiny" style={{ marginLeft: "10px" }} color="red" onClick={onCurrentIconClick}></Button>
              )}
              <Button floated="right" size="tiny" color="olive" onClick={addOpinion}>
                Add opinion
              </Button>
            </Grid.Row>
            <Grid.Row></Grid.Row>
          </Grid.Column>
        </Grid>
        <Divider />
        <List>
          {opinions.map((opinion) => {
            return (
              <List.Item style={{ padding: "5px" }} key={opinion._id}>
                <List.Content floated="left">
                  <List.Description>
                    {opinion.isPositive ? <Icon name="plus" color="green" /> : <Icon name="minus" color="red" />}
                    {opinion.description}
                  </List.Description>
                </List.Content>
                <List.Content floated="right">
                  <Button size="mini" icon="trash" circular onClick={() => deleteOpinion(opinion._id)}></Button>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      </Container>
      <Footer>
        <Button size="small" circular color="teal" icon labelPosition="right" onClick={onNextStepClick} loading={isWaitingForResponse}>
          Submit opinions
          <Icon name="right arrow" />
        </Button>
        <Confirm
          open={isConfirmOpen}
          onCancel={onConfirmCancelClick}
          onConfirm={onConfirmOkayClick}
          content="Are you sure you want to submit your opinion? There is no return."
        />
      </Footer>
    </React.Fragment>
  );
};

export default OpinionStep;
