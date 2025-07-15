import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskList from "./pages/TaskList";
import CreateTask from "./pages/ModalCreateTask";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/register" replace />}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path='/tasks' element={<TaskList/>}/>
                <Route path='/create' element={<CreateTask/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App