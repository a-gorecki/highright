import Highlight from './Highlight';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Highlights = ({highlights, allHighlights, onDelete}) => {
    return (
        <div className="Highlights">
            <TransitionGroup>
                {highlights.sort((a, b) => (a.date < b.date) ? 1 : -1).map((highlight) => (
                    <CSSTransition key={highlight.highlightID} timeout={700} classNames="item">
                        <Highlight key={highlight.highlightID} highlight={highlight} allHighlights={allHighlights} onDelete={onDelete} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    
    );
}

export default Highlights;