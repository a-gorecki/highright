import Grid from '@material-ui/core/Grid';
import Hamburger from './Hamburger';

const Header = () => {
    return (
        <Grid container className="Header">
            <Grid item xs={11}><h1 className="HeaderHeading">HIGHRIGHTED NOTES</h1></Grid>
            <Grid item xs={1}><Hamburger /></Grid>
        </Grid>
    );
}

export default Header;