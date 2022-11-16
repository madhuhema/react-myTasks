import { useState, useRef } from 'react';
import { Storage, Task } from './localstorage'
import './App.css'

const storage = Storage.getInstance();

function App() {

  const titleRef = useRef(null);
  const descRef = useRef(null);
  const [tasks, setTasks] = useState(storage.getAll());

  function addTask() {
    if (!!(titleRef.current as any)?.value && !!(descRef.current as any)?.value) {
      storage.add({
        title: (titleRef.current as any).value,
        description: (descRef.current as any).value
      })
      setTasks(storage.getAll());
    }
  }

  function deleteTask(id: string) {
    storage.delete(id);
    setTasks(storage.getAll());
  }

  function updateTask(task: Task) {
    storage.update({ ...task, completed: true });
    setTasks(storage.getAll());
  }

  return (
    <>
      <div className='App column'>
        <div className='App'>
          <div className="space-around"></div>
          <div className="space-around column">
            <h2>My Task List</h2>
            <input type="text" placeholder='title' name="title" ref={titleRef}></input>
            <textarea rows={3} placeholder='description' name="description" ref={descRef} />
            <button onClick={addTask}>Add</button></div>
          <div className="space-around"></div>

        </div>
        <div className='space-around'>
          {tasks.map((item) =>
            <div key={item.id} className='card'>
              <p><b>{item.title}{item.completed && <>✔️</>}</b></p>
              <p style={{ width: '20ch' }}>{item.description}</p>

              <div className='App column'>
                <button onClick={() => deleteTask(item.id)}>Delete</button>
                {!item.completed && <button onClick={() => updateTask(item)}>Mark Complete</button>}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
