import React, {PropTypes} from 'react';
import { Link } from 'react-router';

const Item = (props) => {
    let {story} = props;
    console.log(story)
    return (
        <li className="news-item">
            <span className="score">{story.score}</span>
            <span className="title">
                <a href={story.url} target="_blank">{story.title}</a>
                <span className="host">{story.url}</span>
            </span>
            <br/>
            <span className="meta">
                <span className="by">
                    by <Link to={`/user/${story.by}`}>{story.by}</Link>
                </span>
                <span className="time">{`${story.time} ago`}</span>

                {!Object.is(story.type, 'job') &&
                    <span className="comments-link">
                        | <Link to={`/item/${story.id}`}>{story.descendants} comments</Link>
                    </span>
                }
            </span>
            {!Object.is(story.type, 'story') &&
                <span className="label">
                    {story.type}
                </span>
            }
        </li>
    )
}

Item.propTypes = {
    story : PropTypes.object.isRequired,
}

export default Item;