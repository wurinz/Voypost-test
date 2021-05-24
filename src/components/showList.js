import React from 'react';

const ShowList = ({
    list, name
}) => {
    // let listArray = [];
    // for(let item in list.items){
    //     listArray.push(list.items[item]);
    // }

    const renderList = list.map((item) => {
        return <div className="task">{item.name}</div>
    })

    return(
        <div className="list">
            <h2 className="list_title">{name}</h2>
            {renderList}
        </div>
    )
}

export default ShowList;