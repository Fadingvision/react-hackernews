import React from 'react';
import 'ASSET/css/spinner.styl';

const Spinner = (props) => {
    let {show} = props;
    return (
        show &&
        <svg className={`spinner ${show ? 'show' : ''}`} width="44px" height="44px" viewBox="0 0 44 44">
          <circle className="path" fill="none" strokeWidth="4" strokeLinecap="round" cx="22" cy="22" r="20"></circle>
        </svg>
    )
}

export default Spinner;