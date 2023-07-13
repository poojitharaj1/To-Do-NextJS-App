import { getAllTodos } from "@/api";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";

export default async function Home() {
  const tasks = await getAllTodos();
  return (
    <main className='max-w-4xl mx-auto mt-4 bg-blue-900'>
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-center text-2xl font-bold text-white'>To-Do List </h1>
        <AddTask />
      </div>
      <TodoList tasks={tasks} />
    </main>
  );
}
