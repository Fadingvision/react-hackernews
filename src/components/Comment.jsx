import React, {PropTypes} from 'react';
import Spinner from './common/Spinner.jsx';
import CommentItem from './common/CommentItem.jsx';

export default class Comment extends React.Component {
    static propTypes = {
        params: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            commentIds: [],
        }
    }

    componentDidMount() {
        let {params} = this.props;
        fetch(`https://hacker-news.firebaseio.com/v0/item/${params.id}.json?print=pretty`)
        .then(res => res.json())
        .then(story => this.setState({commentIds: story.kids}));
    }

    render() {
        const {commentIds} = this.state;
        return (
            <div className="comment-container">
                <Spinner show={true}></Spinner>
                {commentIds.map(id => (<CommentItem id={id} key={id}></CommentItem>))}
            </div>
        )
    }
}