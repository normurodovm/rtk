import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetTodoQuery, useUpdateTodoMutation } from '../redux/service/todo-api';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetTodoQuery(id);
  const [updateTodo] = useUpdateTodoMutation();
  const { handleSubmit, register, reset } = useForm({
    defaultValues: data
  });

  const onSubmit = (updatedData) => {
    updateTodo({
      id,
      ...updatedData
    })
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoading) return <div className="text-center text-xl text-gray-700">Loading...</div>;
  if (error) return <div className="text-center text-xl text-red-500">Error loading todo</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Todo</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 border border-gray-300 rounded shadow">
        <div className="mb-2">
          <input
            className="bg-blue-100 p-2 w-full rounded border border-gray-300"
            {...register("title", { required: true })}
            type="text"
            defaultValue={data.title}
          />
        </div>
        <div className="mb-2">
          <input
            className="bg-blue-100 p-2 w-full rounded border border-gray-300"
            {...register("description", { required: true })}
            type="text"
            defaultValue={data.description}
          />
        </div>
        <button className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-600" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditPage;
