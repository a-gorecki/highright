import './App.css';
import logo from './logo.png';
import React from 'react';
import Header from './components/Header';
import Highlights from './components/Highlights';
import axios from 'axios';

function App() {

    const [allHighlights, setAllHighlights] = React.useState([]);
    const [pageHighlights, setPageHighlights] = React.useState([]);

    React.useEffect(() => {        
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let url = tabs[0].url;
            axios.post('https://rhrj8icoq2.execute-api.ap-southeast-2.amazonaws.com/default/getHighlights', {'key': 'all'}).then(res => {
                setAllHighlights(res.data.Items);
                setPageHighlights(res.data.Items.filter((highlight) => highlight.webpageURL === url));
            }, () => console.log('Error'));
        });
    }, []);

    const deletePageHighlight = (url, id) => {
        setPageHighlights(pageHighlights.filter((highlight) => highlight.highlightID !== id));
        axios.delete('https://d8jcc124te.execute-api.ap-southeast-2.amazonaws.com/default/deleteHighlight', {data: {'url': url, 'highlightID': id}}).then(res => {
            console.log(res);
            console.log(url, id);
        }, () => console.log('Error'));
    }

    return (
        <div className="App">
            <Header />
            {pageHighlights.length > 0 ? (
                <Highlights highlights={pageHighlights} allHighlights={allHighlights} onDelete={deletePageHighlight} />) : (
                <div className="NoHighlights">
                    <h1>LET'S START HIGHRIGHTING!</h1>
                    <img src={logo}></img>
                </div>)
            }
        </div>
    );
}

export default App;
