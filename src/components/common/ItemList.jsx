import React from 'react';
import { Link } from 'react-router';
import Spinner from './Spinner.jsx';
import Item from './Item.jsx';

export default class ItemList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stories: [],
        }
    }

    componentDidMount() {
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
        .then(res => res.json())
        .then(ids => {
            ids.slice(0, 50).forEach((id, index) => {
                fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                .then(res => res.json())
                .then(story => {
                    story.rank = index + 1;
                    this.setState({
                        stories: this.state.stories.concat([story]).sort((a, b) => a.rank - b.rank),
                    });
                })
            })
        });
    }

    render() {
        let {stories} = this.state
        return (
            <div>
              <Spinner show={true}></Spinner>
              <div className="news-list">
                {stories.map(story => (
                    <Item story={story}></Item>
                ))}
              </div>
            </div>
        )
    }
}