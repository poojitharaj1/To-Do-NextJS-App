import { ITask } from "@/types/tasks";
import React from "react";
import Task from "./Task";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  console.log(tasks,"inside todolist")
  return (
    <div className='overflow-x-auto '>
      <table className='table w-full' >
        <thead>
          <tr className="bg-blue-100 pl-50">
          <th className="bg-blue-100 px-8">Mark As Complete</th>
            <th className="bg-blue-100 px-8" >Tasks</th>
            <th className="bg-blue-100 px-8">Description</th>
            <th className="bg-blue-100 px-8">Edit Task</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task}  />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
