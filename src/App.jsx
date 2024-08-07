import { nanoid } from "@reduxjs/toolkit";
import { Card } from "./components/card";
import { useForm } from "react-hook-form";
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation
} from "./redux/service/todo-api";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditPage from './components/editpage';

function App() {
  const { error, data, isLoading } = useGetTodosQuery();
  const [createTodo, { isLoading: createLoading }] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const { handleSubmit, register, reset } = useForm();

  const submit = (data) => {
    createTodo(data)
      .unwrap()
      .catch((error) => {
        console.log(error);
      });
    reset();
  };

  const handleDelete = (id) => {
    deleteTodo(id)
      .unwrap()
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        {createLoading && <h2 className="text-center text-xl text-gray-700">Loading...</h2>}
        <form onSubmit={handleSubmit(submit)} className="mb-6 p-4 border border-gray-300 rounded shadow">
          <div className="mb-4">
            <input
              className="bg-blue-100 p-4 w-full rounded border border-gray-300"
              {...register("title")}
              placeholder="Title"
              type="text"
            />
          </div>
          <div className="mb-4">
            <input
              className="bg-blue-100 p-4 w-full rounded border border-gray-300"
              {...register("description")}
              placeholder="Description"
              type="text"
            />
          </div>
          <button className="bg-red-500 text-white p-4 w-full rounded hover:bg-red-600" type="submit">
            Send
          </button>
        </form>
        {isLoading ? (
          <h1 className="text-center text-2xl text-gray-700">Loading...</h1>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item) => (
              <Card key={item.id} {...item} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      <Routes>
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </Router>
  );
}

export default App;
