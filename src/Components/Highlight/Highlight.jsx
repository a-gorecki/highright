import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  textLeft: {
    textAlign: "left",
  },
  highlightContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "left",
    margin: "auto",
    marginBottom: "2rem",
  },
}));

export const Highlight = ({ highlight }) => {
  const classes = useStyles();

  return (
    <div className={classes.highlightContainer}>
      <Typography variant="body1" gutterBottom className={classes.textLeft}>
        {highlight.highlightText}
      </Typography>
      <Typography variant="caption" gutterBottom className={classes.textLeft}>
        {highlight.highlightNotes ? highlight.highlightNotes : "No notes"}
      </Typography>
    </div>
  );
};
