import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Tasks from "./components/tasks/Tasks";
import AddTask from "./components/tasks/Util/AddTask";
import About from "./pages/about/About";
function App() {
	const [showTaskForm, setShowTaskForm] = useState(false);
	const [tasks, setTasks] = useState([]);
	useEffect(() => {
		const getTasks = async () => {
			const tasksFromServer = await fetchTasks();
			setTasks(tasksFromServer);
		};
		getTasks();
	}, []);
	const fetchTasks = async () => {
		const response = await fetch("http://localhost:5000/tasks");
		const data = await response.json();
		return data;
	};
	const fetchTask = async (taskID) => {
		const response = await fetch(`http://localhost:5000/tasks/${taskID}`);
		const data = await response.json();
		return data;
	};
	const addTask = async (task) => {
		const response = await fetch("http://localhost:5000/tasks", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(task),
		});
		const data = await response.json();
		setTasks([...tasks, data]);
		//const newTaskID = Math.floor(Math.random() * 10000) + 1;
		//const newTask = { id: newTaskID, ...task };
		//setTasks([...tasks, newTask]);
	};
	const deleteTask = async (taskID) => {
		await fetch(`http://localhost:5000/tasks/${taskID}`, {
			method: "DELETE",
		});
		setTasks(tasks.filter((task) => task.id !== taskID));
	};
	const ToggleReminder = async (taskID) => {
		const taskToToggle = await fetchTask(taskID);
		const updateTask = {
			...taskToToggle,
			reminder: !taskToToggle.reminder,
		};
		const response = await fetch(`http://localhost:5000/tasks/${taskID}`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(updateTask),
		});
		const data = await response.json();
		setTasks(
			tasks.map((task) =>
				task.id === taskID ? { ...task, reminder: data.reminder } : task
			)
		);
	};
	return (
		<Router>
			<div className="container">
				<Header
					title="Header Title"
					onClick={() => setShowTaskForm(!showTaskForm)}
					showForm={showTaskForm}
				/>
				<Routes>
					<Route
						path="/"
						exact
						element={
							<>
								{showTaskForm && (
									<AddTask onFormSubmit={addTask} />
								)}
								{tasks.length ? (
									<Tasks
										tasks={tasks}
										onDelete={deleteTask}
										onToggle={ToggleReminder}
									/>
								) : (
									"No Tasks To Show"
								)}
							</>
						}
					/>
					<Route path="/about" element={<About />} />
				</Routes>
				<Footer></Footer>
			</div>
		</Router>
	);
}

export default App;
