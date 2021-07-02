import axios from "axios";
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import { IconContext } from "react-icons";
import { VscTriangleRight } from 'react-icons/vsc';
import { VscTriangleDown } from 'react-icons/vsc';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '8px',
        marginTop: '13px',
        padding: '10px 10px 12px 10px',
        backgroundColor: '#F7F7F7',
        borderRadius: '10px',
    },
    button: {
        border: 'none',
        backgroundColor: '#F7F7F7',
        padding: '0',
    },
    container: {
        display: 'flex',
    },
}));

const Similarity = ({ highlight, allHighlights }) => {

    var similarities = [];
    var highSimilarities = [];

    function checkIfSimilar(hl, partnerhl) {
        const options = {
            method: 'GET',
            url: 'https://twinword-text-similarity-v1.p.rapidapi.com/similarity/',
            params: {
                text1: hl.highlightText,
                text2: partnerhl.highlightText
            },
            headers: {
                'x-rapidapi-key': '6dee57135amsh311ba314ad5feb9p1e79cdjsn82737d590ca8',
                'x-rapidapi-host': 'twinword-text-similarity-v1.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            var similarity = response.data.similarity;
            var similarityScore = Math.round((-similarity * (similarity - 2)) * 100);
            similarities.push({ highlight: partnerhl, score: similarityScore });
            if (similarityScore >= 80) {
                highSimilarities.push({ highlight: partnerhl, score: similarityScore });
            }
        }).catch(function (error) {
            console.error(error);
        });
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    for (let i = 0; i < allHighlights.length; i++) {
        var highlightPartner = allHighlights[i];
        if (highlightPartner.webpageTopic && highlightPartner.webpageTopic == highlight.webpageTopic && highlightPartner.highlightID != highlight.highlightID) {
            /* find similarity between highlight.highlightText and highlightPartner.highlightText */
            checkIfSimilar(highlight, highlightPartner);
        }
    }

    async function demo() {
        await sleep(3000);
    }

    demo();

    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    const [sim, setSim] = React.useState(similarities);
    const [highsim, setHighsim] = React.useState(highSimilarities);

    var highestSimilarityScore = sim.length == 0 ? 0 : Math.max.apply(Math, sim.map(function (s) { return s.score; }));

    var similarityLabel = "";
    if (highestSimilarityScore >= 80) {
        similarityLabel = "Bad";
    } else if (highestSimilarityScore >= 60) {
        similarityLabel = "Average";
    } else {
        similarityLabel = "Good";
    }

    return (
        <div className={classes.root}>
            <button onClick={handleChange} className={classes.button}>
                <IconContext.Provider value={{ size: '17px' }}>
                    {!checked ?
                        <VscTriangleRight style={{ marginRight: '4px', position: 'relative', top: '3px' }} /> :
                        <VscTriangleDown style={{ marginRight: '4px', position: 'relative', top: '3px' }} />
                    }
                </IconContext.Provider>
                Check similarity score:
            </button>
            <div className={classes.container}>
                <Collapse in={checked}>
                    <div style={{ paddingLeft: '20px', width: '240px'}}>
                        {highsim.length == 0 ? (
                            <p><b style={{color: '#42C622'}}>{similarityLabel}</b> | highest similarity is {highestSimilarityScore}%</p>
                        ) : (
                            <p><b style={{color: '#C62922'}}>{similarityLabel}</b> | very similar to {highsim.length} other highlights with the same tag. </p>
                        )
                        }
                        {highsim.length != 0 &&
                        <div>
                            {highsim.map((h) => (
                                <div>
                                <p style={{ paddingRight: '20px'}}>
                                    <b style={{color: '#C62922'}}>{h.score}%</b> | "
                                {h.highlight.highlightText}"
                                <br></br>
                                <a target="_blank" href={h.highlight.webpageURL} style={{fontSize:'10px', color:'#505098', width: '240px', overflowWrap:"break-word"}}>{h.highlight.webpageURL}</a>
                                </p>
                                
                                </div>
                            ))}
                        </div>
                        }
                    </div>
                </Collapse>
            </div>
        </div>
    );
}

export default Similarity;