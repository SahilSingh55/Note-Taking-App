// import axios from "axios";
import React, {useState, useEffect} from "react";
import todos from "./apis";

import Form from "./components/Form";
import List from "./components/List";
import Section from "./components/Section";

const appTitle = "To-Do App";

// const list = [
//     { id: 1, title: "Test #1", completed: false },
//     { id: 2, title: "Test #2", completed: false },
//     { id: 3, title: "Test #3", completed: false }
// ];

const App = () => {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { data } = await todos.get("/todos");
            setTodoList(data);
        }
        
        fetchData();
        ////////////////////Simultaneous way to fetch the data/////////////////////////
        //     (async function () {
        //         const response = await axios.get("http://localhost:3030/todos/");
        //         console.log(response);
        //     })();
    }, []);

    const addTodo = async (item) => {
        const { data } = await todos.post("/todos", item);
        setTodoList((oldList) => [...oldList, data]);
    };

    const removeTodo = async (id) => {
        await todos.delete(`/todos/${id}`);
        setTodoList((oldList) => oldList.filter((item) => item._id !== id));
    };

    const editTodo = async (id, item) => {
        await todos.put(`/todos/${id}`, item);
    };

    return (
    <div className="ui container center aligned">
        <Section>
            <h1>{appTitle}</h1>
        </Section>
        
        <Section>
            <Form addTodo={addTodo}/>
        </Section>

        <Section>
            <List 
            editTodoListProp={editTodo}
            removeTodoListProp={removeTodo} 
            list={todoList}
            />
        </Section>
    </div>
        );
};

export default App;