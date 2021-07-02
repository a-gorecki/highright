# HighRight API



## GET highlights

### GET all highlights

API URL

```
https://rhrj8icoq2.execute-api.ap-southeast-2.amazonaws.com/default/getHighlights
```

Request body example

```json
{
    "key": "all"
}
```

Response body example

```json
{
    "Items": [
        {
            "date": 1624946671618,
            "webpageURL": "https://en.wikipedia.org/wiki/Melbourne",
            "highlightID": "0195072d-851d-4d1f-938b-dfd0367f939b",
            "highlightNotes": "could be used in introduction",
            "webpageTitle": "Accenture - Melbourne",
            "highlightColour": "blue",
            "webpageTopic": "melbourne",
            "highlightText": "Home to Indigenous Australians for over 40,000 years, the Melbourne area served as a popular meeting place for local Kulin nation clans."
        }
        ],
    "Count": 29,
    "ScannedCount": 29
}
```

### GET  highlights by search term

API URL

```
https://rhrj8icoq2.execute-api.ap-southeast-2.amazonaws.com/default/getHighlights
```

Request body example

```json
{
    "key": "webpageURL", //this matches the DB table keys (see below)
    "term": "https://en.wikipedia.org/wiki/Melbourne" // the search term (searches for string equality)
}
```

Response body example

```json
{
    "Items": [
        {
            "date": 1624946671618,
            "webpageURL": "https://en.wikipedia.org/wiki/Melbourne",
            "highlightID": "0195072d-851d-4d1f-938b-dfd0367f939b",
            "highlightNotes": "could be used in introduction",
            "webpageTitle": "Accenture - Melbourne",
            "highlightColour": "blue",
            "webpageTopic": "melbourne",
            "highlightText": "Home to Indigenous Australians for over 40,000 years, the Melbourne area served as a popular meeting place for local Kulin nation clans."
        }
    ],
    "Count": 1,
    "ScannedCount": 29
}
```

### DB key names

```
webpageURL
highlightID
date
highlightText
webpageTitle
webpageTopic
highlightColour
highlightNotes
```



## POST highlight

API URL

```
https://z5aoi3hs0j.execute-api.ap-southeast-2.amazonaws.com/default/insertHighlightTest
```

Request body example

```json
{
  "url": "https://en.wikipedia.org/wiki/Melbourne", //REQUIRED
  "text": "Home to Indigenous Australians for over 40,000 years, the Melbourne area served as a popular meeting place for local Kulin nation clans.", //REQUIRED
  "title": "Accenture - Melbourne",
  "topic": "melbourne",
  "colour": "blue",
  "notes": "could be used in introduction"
}
```

Response body example

```json
{
    "date": 1624949305258,
    "webpageURL": "https://en.wikipedia.org/wiki/Melbourne",
    "highlightID": "3ceae7ea-95c5-4156-9162-6eb14b4004d7",
    "highlightText": "Home to Indigenous Australians for over 40,000 years, the Melbourne area served as a popular meeting place for local Kulin nation clans.",
    "webpageTitle": "Accenture - Melbourne",
    "webpageTopic": "melbourne",
    "highlightColour": "blue",
    "highlightNotes": "could be used in introduction"
}
```

### POST update to highlight

API URL

```
https://eiqt6yl9ig.execute-api.ap-southeast-2.amazonaws.com/default/updateHighlight
```

Request body example

```json
{ // ALL FIELDS REQUIRED
  "url": "https://en.wikipedia.org/wiki/Melbourne",
  "highlightID": "3ceae7ea-95c5-4156-9162-6eb14b4004d7",
  "topic": "historyReport",
  "colour": "yellow",
  "notes": "could be used in para 2"
}
```

Response body example

```json
{
    "date": 1624949305258,
    "webpageURL": "https://en.wikipedia.org/wiki/Melbourne",
    "highlightID": "3ceae7ea-95c5-4156-9162-6eb14b4004d7",
    "highlightText": "Home to Indigenous Australians for over 40,000 years, the Melbourne area served as a popular meeting place for local Kulin nation clans.",
    "webpageTitle": "Accenture - Melbourne",
    "webpageTopic": "historyReport",
    "highlightColour": "yellow",
    "highlightNotes": "could be used in para 2"
}
```

### DELETE  highlight

API URL

```
https://d8jcc124te.execute-api.ap-southeast-2.amazonaws.com/default/deleteHighlight
```

Request body example

```json
{ // ALL FIELDS REQUIRED
  "url": "https://en.wikipedia.org/wiki/Melbourne",
  "highlightID": "3bc077c3-ef3e-4566-ab2a-969bc555fec0"
}
```

Response body example

```json
"deleted" //don't @ me, dynamoDBs delete function wont actually return anything, ever, by design...
```

### 