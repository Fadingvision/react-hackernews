import React, {PropTypes} from 'react';
import { Link } from 'react-router';

import {timeAgo} from 'UTIL/filter/';

const pluralize = n => n + (n === 1 ? ' reply' : ' replies');

class CommentItem extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            comment: {},
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        let {id} = this.props;
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        .then(res => res.json())
        .then(comment => this.setState({comment}))
    }

    toggle() {
        this.setState({open: !this.state.open})
    }

    render() {
        let {open, comment} = this.state;
        return (
            <li className="comment">
                <div className="by">
                    <Link to={`/user/${comment.by}`}>{comment.by}</Link>
                    {timeAgo(comment.time)} ago
                </div>
                <div className="text" dangerouslySetInnerHTML={{__html: comment.text}}></div>
                {comment.kids && comment.kids.length && <div className={`toggle ${open ? 'open' : ''}`}>
                    <a onClick={this.toggle}>
                        {open ? '[-]' : `[+] ${pluralize(comment.kids.length)} collapsed`}
                    </a>
                </div>}
                <ul className={`comment-children ${open ? 'hidden' : ''}`}>
                    {comment.kids ? comment.kids.map(commentId => (<CommentItem key={commentId} id={commentId}></CommentItem>)) : null}
                </ul>
            </li>
        )
    }
}

export default CommentItem;