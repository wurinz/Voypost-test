import React from 'react';

const ShowList = ({
    list
}) => {
    let listArray = [];
    for(let item in list.items){
        listArray.push(list.items[item]);
    }

    const renderList = listArray.map((item) => {
        return <div className="task">{item.name}</div>
    })

    return(

        <div className="list">
            <h2 className="list_title">{list.name}</h2>
            {renderList}
        </div>
    )
}

export default ShowList;