import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";
import { auth, addTask, db } from "../../firebaseconfig"; 
import { collection, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";

const Dashboard = () => {
  const [taskMessage, setTaskMessage] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  // Function to fetch tasks from Firestore
  const fetchTasks = async () => {
    const user = auth.currentUser;
    if (user) {
      const tasksRef = collection(db, "users", user.uid, "tasks");
      const q = query(tasksRef, orderBy("createdAt", "desc")); // Fetch tasks in descending order of creation time
      try {
        const snapshot = await getDocs(q);
        const fetchedTasks = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks: ', error);
      }
    }
  };

  // useEffect to fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []); // Only run once on component mount

  // Function to handle form submission (adding or updating a task)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user && taskMessage.trim() !== "") {
      // Capitalize the first letter of the task message
      const formattedMessage = taskMessage.charAt(0).toUpperCase() + taskMessage.slice(1);
      
      if (isEditing && editTaskId) {
        // Update the existing task
        const taskRef = doc(db, "users", user.uid, "tasks", editTaskId);
        await updateDoc(taskRef, { message: formattedMessage });
        setIsEditing(false);
        setEditTaskId(null);
      } else {
        // Add a new task
        await addTask(formattedMessage, user.uid);
      }
      setTaskMessage("");
      fetchTasks(); // Fetch tasks again after adding/updating a task
    }
  };

  // Function to handle editing a task
  const handleEdit = (taskId, taskMessage) => {
    setIsEditing(true);
    setEditTaskId(taskId);
    setTaskMessage(taskMessage);
  };

  // Function to handle deleting a task
  const handleDelete = async (taskId) => {
    const user = auth.currentUser;
    if (user) {
      const taskRef = doc(db, "users", user.uid, "tasks", taskId);
      await deleteDoc(taskRef);
      fetchTasks(); // Fetch tasks again after deleting
    }
  };

  return (
    <div>
      <div className="container mx-auto my-10">
        <div className="md:w-1/2 mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <form id="todo-form" onSubmit={handleSubmit}>
              <div className="flex mb-2">
                <input
                  type="text"
                  className="w-full px-3 py-2 mr-3 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
                  id="todo-input"
                  placeholder={isEditing ? "Edit task" : "Add new task"}
                  required
                  value={taskMessage}
                  onChange={(e) => setTaskMessage(e.target.value)}
                />
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md">
                  <FaPlus />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-gray p-2 rounded-md w-full md:w-1/2 mx-auto">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-500">
            No todos to display
          </div>
        ) : (
          <ul>
            {tasks.map(task => (
              <li key={task.id} className="flex items-center justify-between bg-white p-4 rounded shadow-md mb-3">
                <span className="text-m text-gray-500">
                  {task.message}
                </span>
                <div className="flex gap-3">
                  <button
                    className="bg-black text-white py-2 px-4 rounded-md hover:shadow-lg"
                    onClick={() => handleEdit(task.id, task.message)}
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    className="bg-red-600 py-2 px-4 rounded-md text-white hover:shadow-lg"
                    onClick={() => handleDelete(task.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
