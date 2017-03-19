import React from 'react';
import { Link } from 'react-router';
import Spinner from './Spinner.jsx';

export default class ItemList extends React.Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
        .then(res => res.json())
        .then(ids => {

            fetch(`https://hacker-news.firebaseio.com/v0/item/${ids[0]}.json?print=pretty`)
            .then(res => res.json())
            .then(story => console.log(story))

        });
    }


    render() {
        return (
            <div>
              <Link to="/top">top</Link>
              <Spinner show={true}></Spinner>
            </div>
        )
    }
}