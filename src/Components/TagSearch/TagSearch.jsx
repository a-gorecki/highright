import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  exampleWrapper: {
    width: "100%",
  },
  searchbar: {
    float: "right",
  },
}));

export const TagSearch = ({ onSearch }) => {
  const classes = useStyles();

  const [text, setText] = React.useState("");

  const handleSearchInput = (e) => {
    onSearch(e.target.value);
    setText(e.target.value);
  };
  return (
    <div className={classes.exampleWrapper}>
      <TextField
        value={text}
        onChange={handleSearchInput}
        className={classes.searchbar}
        id="outlined-basic"
        label="Search by tag"
        variant="outlined"
      />
    </div>
  );
};
