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