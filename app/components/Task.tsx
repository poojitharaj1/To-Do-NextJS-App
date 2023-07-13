"use client";
import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
import { update } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const [DescToEdit, setDescToEdit] = useState<string>(task.desc);
  const [checkedit, setcheckedit] = useState<boolean>(task.done);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      done: checkedit,
      text: taskToEdit,
      desc: DescToEdit
    });
    setOpenModalEdit(false);
    router.refresh();
  };
  const onChangeCheckBox = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setcheckedit(e.target.checked)
     await update({
      id: task.id,
      done: e.target.checked,
      text: task.text,
      desc: task.desc
    });
    router.refresh();
  };
  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <tr className="bg-blue-100 pl-50" key={task.id}>
         <td className='flex gap-5 bg-blue-100 px-8'>
           <input type="checkbox" checked={checkedit} onChange={onChangeCheckBox} className="checkbox" />
         </td>
      <td className='w-full bg-blue-100 px-8'>{task.text}</td>
      <td className='w-full bg-blue-100 px-8'>{task.desc}</td>
      <td className='flex gap-5 bg-blue-100 px-8'>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor='pointer'
          className='text-blue-500'
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-lg'>Edit your Task details</h3>
            <div className='modal-action'>
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type='text'
                placeholder='Type here'
                className='input input-bordered w-full'
              />
                  <input
                value={DescToEdit}
                onChange={(e) => setDescToEdit(e.target.value)}
                type='text'
                placeholder='Edit Description here'
                className='input input-bordered w-full'
              />
              <button type='submit' className='btn'>
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor='pointer'
          className='text-red-500'
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className='text-lg'>
            Are you sure, you want to delete this task?
          </h3>
          <div className='modal-action'>
            <button onClick={() => handleDeleteTask(task.id)} className='btn'>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
