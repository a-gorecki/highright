import React from "react";
import logo from "../../logo.svg";

import { WebpageHighlights } from "../WebpageHighlights/WebpageHighlights";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    width: "100%",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    justifyContent: "left",
    margin: "auto",
    marginTop: "3rem",
    marginBottom: "3rem",
  },
  productName: {
    textAlign: "left",
  },
  logo: {
    width: "100px",
    height: "100px",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
  },
}));

export const ManagePage = () => {
  const [highlights, setHighlights] = React.useState([]);
  const [groupedHighlights, setGroupedHighlights] = React.useState([]);
  const [filteredTag, setFilteredTag] = React.useState("");

  const classes = useStyles();

  React.useEffect(() => {
    getHighlights();
  }, []);

  const getHighlights = () => {
    axios
      .post(
        "https://rhrj8icoq2.execute-api.ap-southeast-2.amazonaws.com/default/getHighlights",
        { key: "all" }
      )
      .then(
        (response) => {
          setHighlights(response.data.Items);
          groupHighlights(response.data.Items);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const groupHighlights = (highlights) => {
    const webpages = highlights.map((highlight) => highlight.webpageURL);
    const uniqueWebpages = new Set(webpages);

    const groupedHighlights = [];
    uniqueWebpages.forEach((page) => {
      groupedHighlights.push(
        highlights.filter((highlight) => highlight.webpageURL === page)
      );
    });
    setGroupedHighlights(groupedHighlights);
  };

  return (
    <div className={classes.pageContainer}>
      <div className={classes.contentContainer}>
        <div className={classes.logoContainer}>
          <img src={logo} className={classes.logo} alt="logo" />
          <Typography
            variant="h1"
            gutterBottom
            className={classes.productName}
            display="inline"
          >
            HighRight
          </Typography>
        </div>
        {groupedHighlights.map((group) => (
          <WebpageHighlights highlights={group} />
        ))}
      </div>
    </div>
  );
};
