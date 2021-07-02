import Grid from '@material-ui/core/Grid';
import { GoQuote } from 'react-icons/go';
import { AiOutlineTag } from 'react-icons/ai';
import { RiDeleteBinLine } from "react-icons/ri";
import { IconContext } from "react-icons";

import Comments from './Comments';
import Similarity from './Similarity';

const Highlight = ({ highlight, allHighlights, onDelete }) => {
    var colours = {
        'yellow': '#FDFFA8',
        'green': '#CBF9E5',
        'red': '#FFB2B2',
        'blue': '#A9DEFC',
        'grey': '#C4C4C4'
    }

    return (
        <Grid container className="Highlight" style={{ borderLeft: '5px solid ' + colours[highlight.highlightColour] }}>
            <Grid item xs={1}>
                <GoQuote className="QuoteIcon" style={{ backgroundColor: colours[highlight.highlightColour]}} />
            </Grid>
            <Grid item xs={10} className="HighlightInfoContainer">
                <p className="HighlightText">{highlight.highlightText}</p>
                {highlight.webpageTopic &&
                    <div>
                        <label>
                            <IconContext.Provider value={{ color: "#AAAAAA", size: '17px' }}>
                                <AiOutlineTag className="TagIcon"/>
                            </IconContext.Provider>
                            <span className="TagText">{highlight.webpageTopic}</span>
                        </label>
                        <Similarity highlight={highlight} allHighlights={allHighlights} />
                    </div>
                }
                {highlight.highlightNotes &&
                    <Comments comments={highlight.highlightNotes} />
                }
            </Grid>
            <Grid item xs={1} className="DeleteButtonContainer">
                <IconContext.Provider value={{ color: '#DD5151', size: '15px' }}>
                    <RiDeleteBinLine className="DeleteButton" onClick={() => onDelete(highlight.webpageURL, highlight.highlightID)} />
                </IconContext.Provider>
            </Grid>
        </Grid>
    );
}

export default Highlight;