import React from 'react';

const ShowList = ({
    list, name
}) => {
    
    const renderList = list.map((item) => {
        return <div className="task" key={item.id}>{item.name}</div>
    })

    return(
        <div className="list">
            <h2 className="list_title">{name}</h2>
            {renderList}
        </div>
    )
}

export default ShowList;