import React  from "react";
import './App.css'
import { Trash } from "lucide-react"; // Assuming deleteTask is exported from App.tsx

type Priority = 'Haute' | 'Moyenne' | 'Basse';

type Task ={
  id: number;
  text: string;
  priority: Priority;
  isChecked:boolean;
}
type Props ={
    task:Task,
    onDelete: () => void;
    onCheck:()=> void;
}

const TaskTtem =({task,onDelete,onCheck}:Props)=>{
    return (
        <li key={task.id} className="flex justify-between max-[700px]:text-sm items-center p-4 my-2 bg-base-100 rounded-lg shadow-md">
            <p>
                <input type="checkbox" checked={task.isChecked} onClick={onCheck} className={`checkbox checkbox-sm ${task.priority=="Haute"?"checkbox-success":(task.priority=="Moyenne"?"checkbox-warning":"checkbox-accent")} mr-5`}/>
                {task.text}</p>
            <div>
                <div className={`badge ${task.priority=="Haute"?"badge-success":(task.priority=="Moyenne"?"badge-warning":"badge-accent")} p-5 mr-5 max-[700px]:text-sm max-[700px]:mr-2 max-[700px]:p-2 cursor-pointer`}>{task.priority}</div>
                <button className="group btn btn-soft btn-error hover:text-white" onClick={onDelete} ><Trash className="w-5 h-5 text-red-500 group-hover:text-white cursor-pointer" />Delete</button>
            </div>
        </li>
    )
}

export default TaskTtem;