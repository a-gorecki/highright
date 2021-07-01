import { FaRegCommentDots } from 'react-icons/fa';
import { IconContext } from "react-icons";

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '8px',
        marginTop: '3px',
    },
    button: {
        border: 'none',
        backgroundColor: 'white',
        padding: '0',
    },
    container: {
        display: 'flex',
    },
}));

const Comments = ({ comments }) => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);
    const [bgcolour, setBgcolour] = React.useState('white');
    const [colour, setColour] = React.useState('#444444');

    const handleChange = () => {
        setChecked((prev) => !prev);
        setBgcolour(checked ? 'white' : '#444444');
        setColour(!checked ? 'white' : '#444444');
    };

    return (
        <div className={classes.root}>
            <button onClick={handleChange} className={classes.button}>
                <IconContext.Provider value={{ size: '17px' }}>
                    <FaRegCommentDots style={{padding: '3px', borderRadius: '12px', backgroundColor: bgcolour, color: colour}}/>
                </IconContext.Provider>
            </button>
            <div className={classes.container}>
                <Collapse in={checked}>
                    <h1 className="CommentsHeading">Comments:</h1>
                    <p style={{marginTop: '5px'}}>{comments}</p>
                </Collapse>
            </div>
        </div>
    );
}

export default Comments;