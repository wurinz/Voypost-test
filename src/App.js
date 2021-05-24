import { useEffect, useState } from 'react';
import firebase from './firebaseConfig';
import ShowList from './components/showList';
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
  }, [])

  // console.log(todoList);
  // console.log(inProgressList);

  
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
