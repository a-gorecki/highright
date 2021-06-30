import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import SmsOutlinedIcon from "@material-ui/icons/SmsOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  textLeft: {
    textAlign: "left",
    marginLeft: "24px",
    width: "93%",
  },
  highlightContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingBottom: "16px",
    borderWidth: "1px 0 0 8px",
    borderStyle: "solid",
    paddingTop: "1rem",
    borderTopColor: "#AAAAAAAA",
  },
  taglist: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "0.5rem",
    marginLeft: "24px",
  },
  icon: {
    position: "relative",
    /* Adjust these values accordingly */
    top: "5px",
    left: "5px",
    marginRight: "8px",
  },
  greyIcon: {
    color: "#AAAAAAAA",
  },
  blue: {
    borderLeftColor: "#A9DEFC",
  },
  green: {
    borderLeftColor: "#CBF9E5",
  },
  yellow: {
    borderLeftColor: "#FDFFA8",
  },
  red: {
    borderLeftColor: "#FFB2B2",
  },
  grey: {
    borderLeftColor: "#C4C4C4",
  },
  quote: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  binHover: {
    position: "relative",
    top: "8px",
    marginRight: "24px",
    width: "40px",
    height: "40px",
  },
}));

export const Highlight = ({ highlight, handleDelete }) => {
  const classes = useStyles();

  return (
    <div
      className={`${classes.highlightContainer} ${
        classes[highlight.highlightColour]
      }`}
    >
      <div className={classes.quote}>
        <Typography variant="body1" gutterBottom className={classes.textLeft}>
          <FormatQuoteIcon className={classes.icon} /> {highlight.highlightText}
        </Typography>
        <IconButton
          className={classes.binHover}
          disableRipple={true}
          size="small"
          onClick={() =>
            handleDelete(highlight.highlightID, highlight.webpageURL)
          }
        >
          <DeleteOutlinedIcon className={` ${classes.greyIcon}`} />
        </IconButton>
      </div>

      <span className={classes.taglist}>
        <LocalOfferOutlinedIcon
          className={`${classes.icon} ${classes.greyIcon}`}
        />{" "}
        {highlight.webpageTopic ? <Chip label={highlight.webpageTopic} /> : ""}
      </span>

      <Typography variant="body1" gutterBottom className={classes.textLeft}>
        <SmsOutlinedIcon className={`${classes.icon} ${classes.greyIcon}`} />{" "}
        {highlight.highlightNotes ? highlight.highlightNotes : "(No notes)"}
      </Typography>
    </div>
  );
};
