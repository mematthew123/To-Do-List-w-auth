import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useUser, UserButton } from "@clerk/nextjs";
import { supabaseClient } from "../supabase/client";

export default function Home() {
  const { firstName } = useUser();
  const [todos, setTodos] = useState(null);

  // load todos
  useEffect(() => {
    const loadTodos = async () => {
      const sc = await supabaseClient();
      try {
        const { data: todos } = await sc.from("todos").select("*");
        console.log(todos);
        setTodos(todos);
      } catch (e) {
        alert(e);
      }
    };

    loadTodos();
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <>
      <header className={styles.header}>
        <div>Todo app</div>
        <UserButton />
      </header>
      <main>
        <div className={styles.container}>
          {firstName ? `Welcome ${firstName}!` : "Welcome!"}
          <AddTodoForm addTodo={addTodo} />
          {todos?.length > 0 ? (
            <ol>
              {todos.map((todo) => (
                <li key={todo.id}>{todo.title}</li>
              ))}
            </ol>
          ) : (
            <p>You don't have anything to do!</p>
          )}
        </div>
      </main>
    </>
  );
}

function AddTodoForm({ addTodo }) {
  const { id } = useUser();
  const [newTodo, setNewTodo] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTodo === "") {
      alert("If you have nothing to do, you don't need me!");
      return;
    }
    const sc = await supabaseClient();
    const resp = await sc.from("todos").insert({ title: newTodo, user_id: id });
    addTodo(resp.data[0]);
    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={(e) => setNewTodo(e.target.value)} value={newTodo} />{" "}
      <button>Add Todo</button>
    </form>
  );
}