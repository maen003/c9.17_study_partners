import React from 'react';

export default props => {
    const {info} = props;
    console.log('info passed down: ', info);

    return (
        <div>
            <h3>{info.title}</h3>
            <p>{info.subject}</p>
            <p>{`On ${info.date} at ${info.time}`}</p>
            <button className="btn btn-danger" type="button">Delete</button>
        </div>
    );
}