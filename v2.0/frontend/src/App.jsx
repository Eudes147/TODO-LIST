import React, { useEffect, useState } from 'react';
import './App.css'


function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
  fetch('http://127.0.0.1:8000/api/tasks')
    .then(response => {
      return response.json(); // on retourne le JSON ici
    })
    .then(data => {
      setTasks(data);
      setLoading(false);
    })
    .catch(error => {
      setLoading(false);
    });
}, []);
  const handleToggle = (id, currentStatus,currentTitle) => {
  fetch(`http://127.0.0.1:8000/api/tasks/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: currentTitle,
      completed: !currentStatus,
    }),
  })
    .then((res) => res.json())
    .then((updatedTask) => {
      // Met à jour la tâche dans la liste locale
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    })
    .catch((error) => console.error("Erreur de mise à jour :", error));
};
const handleAddTask = () => {
  if (!newTitle.trim()) return; // éviter les titres vides

  const normaliser = (texte) =>
  texte.trim().toLowerCase().replace(/\s+/g, ' ');

  const existeDeja = tasks.some(task =>
  normaliser(task.title) === normaliser(newTitle)
  );

  if (existeDeja) {
    alert("Cette tâche existe déjà !");
    return; // ici tu arrêtes la fonction qui appelle ça
  }
// éviter les doublons
  fetch("http://127.0.0.1:8000/api/tasks/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newTitle,
      completed: false,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      setTasks((prevTasks) => [data, ...prevTasks]); // ajout immédiat
      setNewTitle(""); // vider le champ
    })
    .catch((error) => console.error("Erreur lors de l'ajout :", error));
};
const handleDelete = (id) => {
  fetch(`http://127.0.0.1:8000/api/tasks/delete/${id}`, {
    method: "DELETE",
  })
    .then((res) => {  
      if (res.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      } else {
        console.error("Erreur lors de la suppression de la tâche");
      }
    })
    .catch((error) => console.error("Erreur de suppression :", error));
};
const deleteListTasks = (tasksToDelete) => {
  if (tasksToDelete.length === 0) return;

  const idsToDelete = tasksToDelete.map(task => task.id);
  idsToDelete.forEach(id => {
    handleDelete(id);
  })

}
const filteredTasks = tasks.filter(task => {
  if (filter === "All") return true;
  if (filter === "Completed") return task.completed;
  if (filter === "Pending") return !task.completed;
  return true; // fallback
});
  if (loading) return(
    <div className="flex flex-col justify-center items-center h-screen">
      <span className="loading loading-spinner loading-xl"></span>
      <p>Loading Tasks...</p>
    </div>
  );
  return (
    <>
      <div className='text-center mt-20'>
        <input type="text" placeholder="Type task here..." 
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        className="input input-bordered focus:outline-none mr-5" />
        <button className="btn btn-success" onClick={handleAddTask}>Add Task</button>

        <div className='mt-15'>
          <select defaultValue="All" value={filter} onChange={e=>setFilter(e.target.value)} className="select focus:outline-none">
          <option value='All'>All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
        </div>
      </div>
      <div className="w-screen flex justify-center items-center mt-10">
        <div className="w-full lg:w-[50vw] mx-5 text-white p-6 border-2 border-gray-300 padding-10 rounded-lg shadow-lg relative text-center">
          <span className='absolute top-0 right-0 color-red mr-4'>{filteredTasks.length}/{tasks.length}</span>
          {filteredTasks.length === 0 ? (
            <div className="text-center">
              <p>Aucune tâche {filter=="All" ? (""):(
                filter=="Completed" ? ('déja completée') : ('en cours')
              )} pour le moment...</p>
              <span className="loading loading-spinner text-info"></span>
            </div>
          ) : (
          <div>
            {filteredTasks.map(task => (
              <div key={task.id} className='w-full h-auto flex justify-between items-center p-3 rounded-lg border-2 border-blue-300 mb-3'>
                <p>{task.title}</p>
                <p>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggle(task.id, task.completed, task.title)}
                    className="checkbox"
                  />
                  <button
                    className="btn btn-active btn-error ml-5"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </p>
              </div>
            ))}
            <button className="btn btn-warning" onClick={()=>deleteListTasks(filteredTasks)}>Clear All</button>
          </div>
)}

        </div>
      </div>
    </>
  );
}

export default App;

