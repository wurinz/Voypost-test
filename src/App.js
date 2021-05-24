import { useEffect, useState } from 'react';
import firebase from './firebaseConfig';
import ShowList from './components/showList';


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

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("groups").get();
      const todo = data.docs[0].data();
      const inProgress = data.docs[1].data();


      setTodoList(todo);
      setinProgressList(inProgress);
    }
    fetchData();
  }, []);
  
  return (
    <div className="App">
      <div className="container">
        <ShowList list={todoList}/>
        <ShowList list={inProgressList} />
      </div>
    </div>
  );
}

export default App;
