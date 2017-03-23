import React from 'react';
import { Link } from 'react-router';
import Spinner from './Spinner.jsx';
import Item from './Item.jsx';

import makeCancelable from 'UTIL/cancelablePromise'

export default class ItemList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stories: [],
        };
        this.cancelablePromises = [];
    }

    componentDidMount() {
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
        .then(res => res.json())
        .then(ids => {
            ids.slice(0, 50).forEach((id, index) => {

                // make sure the fetch is canceled before the fetch Promise is rejected after the component is unmounted.
                let cancelablePromise = makeCancelable(fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`));
                this.cancelablePromises.push(cancelablePromise);

                cancelablePromise
                .promise
                .then(res => res.json())
                .then(story => {
                    story.rank = index + 1;
                    this.setState({
                        stories: this.state.stories.concat([story]).sort((a, b) => a.rank - b.rank),
                    });
                })
                .catch(err => console.log(err))
            })
        });
    }

    componentWillUnmount() {
        this.cancelablePromises.forEach(p => p.cancel())
    }

    render() {
        let {stories} = this.state
        return (
          <div className="news-list">
            <Spinner show={true}></Spinner>
            {stories.map(story => (
                <Item story={story} key={story.id}></Item>
            ))}
          </div>
        )
    }
}