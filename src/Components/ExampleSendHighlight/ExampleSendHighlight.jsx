import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  exampleWrapper: {
    width: "100%",
  },
  exampleContainer: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    justifyContent: "center",
    margin: "auto",
    padding: "3rem",
  },
}));

const createHighlight = (text) => {
  console.log(document.title);
  console.log(document.URL);

  const payload = {
    url: document.URL,
    text: text,
    title: document.title,
    colour: "yellow",
  };
  sendHighlight(payload);
};

const sendHighlight = (data) => {
  axios
    .post(
      "https://z5aoi3hs0j.execute-api.ap-southeast-2.amazonaws.com/default/insertHighlightTest",
      data
    )
    .then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
};

export const ExampleSendHighlight = () => {
  const classes = useStyles();

  const [text, setText] = React.useState("");

  const handleClick = () => {
    createHighlight(text);
  };

  const handleTextInput = (e) => {
    setText(e.target.value);
  };

  return (
    <div className={classes.exampleWrapper}>
      <div className={classes.exampleContainer}>
        <TextField
          placeholder="Highlight text"
          multiline
          rows={2}
          rowsMax={10}
          value={text}
          onChange={handleTextInput}
        />
        <Button color="primary" variant="contained" onClick={handleClick}>
          Hello World
        </Button>
      </div>
    </div>
  );
};
