import React from "react";
import logo from "../../logo.svg";
import logoType from "../../Logo-Typography-3-07-07-07.svg";

import { WebpageHighlights } from "../WebpageHighlights/WebpageHighlights";
import { TagSearch } from "../TagSearch/TagSearch";

import { makeStyles } from "@material-ui/core/styles";

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
  logoType: {
    height: "100px",
    width: "auto",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
  },
  searchbar: {
    display: "float",
    float: "right",
  },
}));

export const ManagePage = () => {
  const [highlights, setHighlights] = React.useState([]);
  const [allHighlights, setAllHighlights] = React.useState([]);
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
          setAllHighlights(response.data.Items);
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

  const handleSearch = (term) => {
    setFilteredTag(term);
    if (term === "") {
      groupHighlights(allHighlights);
    } else {
      groupHighlights(
        allHighlights.filter((highlight) => {
          const tag = highlight.webpageTopic
            ? highlight.webpageTopic.toLowerCase()
            : "";
          return tag.includes(term.toLowerCase());
        })
      );
    }
  };

  const handleDelete = (id, url) => {
    axios
      .delete(
        "https://d8jcc124te.execute-api.ap-southeast-2.amazonaws.com/default/deleteHighlight",
        { data: { url: url, highlightID: id } }
      )
      .then((res) => {
        console.log(res);
        setGroupedHighlights(
          groupedHighlights
            .map((group) =>
              group.filter((highlight) => highlight.highlightID !== id)
            )
            .filter((group) => group.length > 0)
        );
      });
  };

  return (
    <div className={classes.pageContainer}>
      <div className={classes.contentContainer}>
        <div className={classes.logoContainer}>
          <img src={logo} className={classes.logo} alt="logo" />
          <img src={logoType} className={classes.logoType} alt="HighRight" />
        </div>
        <TagSearch onSearch={handleSearch} className={classes.searchbar} />
        {groupedHighlights.length > 0
          ? groupedHighlights.map((group) => (
              <WebpageHighlights
                highlights={group}
                key={group[0].highlightID}
                handleDelete={handleDelete}
              />
            ))
          : filteredTag !== ""
          ? `No highlights tagged "${filteredTag}"`
          : "No saved highlights available"}
      </div>
    </div>
  );
};
