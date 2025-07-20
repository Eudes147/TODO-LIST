import { useState,useEffect } from 'react'
import './App.css'
import TaskTtem from './taskItem';
import { Construction } from "lucide-react"; 

type Priority = 'Haute' | 'Moyenne' | 'Basse';

type Task ={
  id: number;
  text: string;
  priority: Priority;
  isChecked:boolean;
}

function App() {
  const [task, setTask] = useState<string>('');
  const [priority, setPriority] = useState<Priority>('Moyenne');
  const [tasks, setTasks] = useState<Task[]>([]);
  const savedTasks = localStorage.getItem('tasks');
  const initialTasks = savedTasks ? JSON.parse(savedTasks) : [];
  const [filter, setFilter] = useState<Priority | 'Tous'>("Tous");
  let filteredTasks: Task[] = [];
  let taskremove;
  let taskafterremove: Task[] = [];
  const urgentTasks=tasks.filter(t=>t.priority=='Haute').length;
  const mediumTasks=tasks.filter(t=>t.priority=='Moyenne').length;
  const lowTasks=tasks.filter(t=>t.priority=='Basse').length;
  const allTasks=tasks.length;
  if (filter === 'Tous') {
    filteredTasks = tasks;
  } else {
    filteredTasks = tasks.filter(task => task.priority === filter);
  }
  useEffect(()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },[tasks])
  
  function addTask() {
    if (task.trim() === '') return;

    const newTask: Task = {
      id: Date.now(),
      text: task.trim(),
      priority: priority,
      isChecked: false, // Initialize isChecked to false
    };

    const newTasks =[newTask,...tasks];
    setTasks(newTasks);
    setTask('');
    setPriority('Moyenne');
    console.log(tasks);
  }
  function deleteTask(id: number) {
    const newTasks =tasks.filter(t=>t.id !== id);
    setTasks(newTasks);
  }
  function checkTask(id: number){
    const taskToCheck = tasks.find(t => t.id === id);
    if (taskToCheck) {
      taskToCheck.isChecked = !taskToCheck.isChecked; // Toggle the isChecked state
      setTasks([...tasks]); // Update the state to trigger a re-render
    }
  }

  function selectionTasks(){
    return filteredTasks.filter(t=>t.isChecked).length
  }
  return (
    <>
    <div className='flex justify-center'>
      <div className='w-2/3 max-[1100px]:w-full max-[1100px]:mx-10 max-[700px]:mx-0 flex flex-col gap-4 bg-base-300 my-15 p-5 rounded-2xl'>
        <div className='flex gap-4 max-[1100px]:gap-2'>
          <input type="text" className='input w-full max-[1100px]:w-2/3 focus:outline-none' onKeyDown={(e)=>{if (e.key=="Enter") addTask();}} placeholder='Add Task Here...' value={task} onChange={e=>setTask(e.target.value)}/>
          <select name="" id="" className='select focus:outline-none max-[1100px]:w-1/6' value={priority} onChange={e=>setPriority(e.target.value as Priority)} >
            <option value="Haute">Haute</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <button onClick={addTask} className={`btn btn-soft max-[1100px]:w-1/6 max-[700px]:text-sm ${priority=="Haute"?"btn-success":(priority=="Moyenne"?"btn-warning":"btn-accent")}`}>Ajouter</button>
        </div>
        <div className='space-y-2 flex-1 h-fit'>
          <div className='flex flex-wrap gap-4'>
            <button className={`btn btn-soft focus:outline-none ${filter=="Tous"?"btn-info":""}`} onClick={()=>setFilter("Tous")}>Tous ({allTasks})</button>
            <button className={`btn btn-soft focus:outline-none ${filter=="Basse"?"btn-accent":""}`} onClick={()=>setFilter("Basse")}>Basse ({lowTasks})</button>
            <button className={`btn btn-soft focus:outline-none ${filter=="Moyenne"?"btn-warning":""}`} onClick={()=>setFilter("Moyenne")}>Moyenne ({mediumTasks})</button>
            <button className={`btn btn-soft focus:outline-none ${filter=="Haute"?"btn-success":""}`} onClick={()=>setFilter("Haute")}>Haute ({urgentTasks})</button>
            <button className={`btn focus:outline-none ${filter=="Haute"?"btn-success":""}`} disabled>Sélectionner({selectionTasks()})</button>
          </div>
          {filteredTasks.length > 0 ? (
            <ul className='divide-y divide-accent/20'>
              {filteredTasks.map(task =>(
                <li><TaskTtem task={task} onDelete={()=>deleteTask(task.id)} onCheck={()=>checkTask(task.id)} /></li>
              ))}
            </ul>
          ): (
            <div className='flex justify-center items-center flex-col'>
              <div><Construction strokeWidth={1} className={`w-50 h-50 ${
                filter=="Tous"?"text-info":
                (filter=="Basse"?'text-accent':(filter=="Moyenne"?"text-warning":"text-success"))}`}/></div>
                <p className={`text-sm ${
                filter=="Tous"?"text-info":
                (filter=="Basse"?'text-accent':(filter=="Moyenne"?"text-warning":"text-success"))}`}>Aucune tache pour ce filtre.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default App
