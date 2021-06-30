import React from "react";
import { Highlight } from "../Highlight/Highlight";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

const useStyles = makeStyles((theme) => ({
  webpageTitle: {
    textAlign: "left",
    paddingTop: "24px",
    paddingLeft: "24px",
    paddingBottom: "24px",
  },
  pageHighlightsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "left",
    margin: "auto",
  },
  paperWrapper: {
    marginBottom: "2rem",
  },
  pageLink: {
    textDecoration: "none",
    color: "black",
  },
}));

export const WebpageHighlights = ({ highlights, handleDelete }) => {
  const classes = useStyles();
  const webpageTitle = highlights[0].webpageTitle;

  return (
    <Paper className={classes.paperWrapper}>
      <div className={classes.pageHighlightsContainer}>
        <div>
          <Typography variant="h3" className={classes.webpageTitle}>
            <a href={highlights[0].webpageURL} className={classes.pageLink}>
              {webpageTitle} <OpenInNewIcon />
            </a>
          </Typography>
        </div>
        {highlights.map((highlight) => {
          return (
            <Highlight
              key={highlight.highlightID}
              highlight={highlight}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </Paper>
  );
};
