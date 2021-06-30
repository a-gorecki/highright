import React from "react";
import { Highlight } from "../Highlight/Highlight";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  webpageTitle: {
    textAlign: "left",
  },
  pageHighlightsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "95%",
    justifyContent: "left",
    margin: "auto",
    padding: "2rem",
  },
  paperWrapper: {
    marginBottom: "2rem",
  },
}));

export const WebpageHighlights = ({ highlights }) => {
  const classes = useStyles();
  const webpageTitle = highlights[0].webpageTitle;

  return (
    <Paper className={classes.paperWrapper}>
      <div className={classes.pageHighlightsContainer}>
        <div>
          <Typography
            variant="h3"
            gutterBottom
            className={classes.webpageTitle}
          >
            {webpageTitle}
          </Typography>
        </div>
        {highlights.map((highlight) => {
          return <Highlight highlight={highlight} />;
        })}
      </div>
    </Paper>
  );
};
