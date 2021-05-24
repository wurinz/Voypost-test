import { useEffect, useState } from 'react';
import firebase from './firebaseConfig';
import ShowList from './components/showList';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';





const reorder = (list, startIntdex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIntdex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destinationClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destinationClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destinationClone;

  return result;
}

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  background: isDragging ? 'lightgreen' : 'grey',

  ...draggableStyle
})

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid, 
  width: 250
})

function App() {

  const [ todoList, setTodoList ] = useState([]);
  const [ inProgressList, setinProgressList] = useState([]);

  const [ list, setList ] = useState([]);
  console.log(list)

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("groups").get();
      const listTodo = data.docs[0].data();
      const listInProgress = data.docs[1].data();

      const list = [listTodo, listInProgress];

      setList(list);
    }
    fetchData();
  }, []);

  let todoListArray = [];
  let inProgressListArray = [];

  for(let item in list[0].items){
    todoListArray.push(list[0].items[item])
  }
  for(let item in list[1].items){
    inProgressListArray.push(list[1].items[item])
  }






  let dragAndDropComparison = {
    droppable: 'items',
    droppable2: 'selected'
  }

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if(!destination){
      return;
    }

    if(source.droppableId === destination.droppableId){
      const items = reorder(
        todoList,
        //id?
        source.index,
        destination.index
      );

      let state = { items };

      if(source.droppableId === 'droppable2') {
        state = { selected: items }
      }

      setTodoList(state);

    } else {
      const result = move({
          todoList,
          inProgressList,
          source, 
          destination
      });

      // setTodoList(result.),
      // setinProgressList(result.droppable2)

    }
  }



  
  return (
    <div className="App">
      <div className="container">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div 
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}>
                  {todoList.map((item, index) => (
                    <Draggable 
                      key={item.id}
                      draggableId={item.id}
                      index={index}>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.name}
                        </div>
                      </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="droppable2">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}       
                style={getListStyle(snapshot.isDraggingOver)}>
                  {inProgressList.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}>
                              {item.name}
                          </div>
                        )}
                      </Draggable>
                  ))}
                  {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <ShowList list={todoListArray} name={list[0].name}/>
        <ShowList list={inProgressListArray} name={list[1].name} />
      </div>
    </div>
  );
}

export default App;
