import { useState } from "react";
import NewProject from "./Components/NewProject.jsx";
import NoProjectSelected from "./Components/NoProjectSelected.jsx";
import ProjectsSideBar from "./Components/ProjectsSideBar.jsx";
import SelectedProject from "./Components/SelectedProject.jsx";
import LoginUser from "./Components/LoginPage.jsx";
import Register from "./Components/Register.jsx";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [projectsState, setProjectsState] = useState({
    selectedProjectId : undefined,
    projects : [],
    tasks : []
  });

  const handleEditTask = (projectId, taskId) => {
    const newTaskText = prompt("Enter new task text:");
    if (newTaskText) {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId
            ? {
                ...project,
                tasks: project.tasks.map((task) =>
                  task.id === taskId ? { ...task, text: newTaskText } : task
                ),
              }
            : project
        )
      );
    }
  }; 

  function handleLogin (){
    setIsLoggedIn (true);
  }

  function handleStartRegister() {
    setIsRegistering(true);
  }

  function handleCompleteRegister() {
    setIsRegistering(false);
    alert("Registration successful! You can now log in.");
  }

  function handleCancelRegister() {
    setIsRegistering(false);
  }

  function handleAddTask (text) {
    setProjectsState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text : text,
        projectId : prevState.selectedProjectId,
        id : taskId,
      };
      
      return {
        ...prevState,
        tasks : [...prevState.tasks, newTask] 
      };
    });
  };

  function handleDeleteTask (id) {
    setProjectsState (prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    })
  };

  function handleSelectedProject (id) {
    setProjectsState (prevState => {
      return {
        ...prevState,
        selectedProjectId : id,
      };
    });
  }

  function handleStartAddProject () {
    setProjectsState (prevState => {
      return {
        ...prevState,
        selectedProjectId : null,
      };
    });
  }

  function handleCancelAddProject (){
    setProjectsState (prevState => {
      return {
        ...prevState,
        selectedProjectId : undefined,
      };
    });
  }

  function handleAddProject (projectData){
    setProjectsState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id : projectId,
      };
      
      return {
        ...prevState,
        selectedProjectId : undefined,  
        projects : [...prevState.projects, newProject ]
      };
    });
  }

  function handleDeleteProject () {
    setProjectsState (prevState => {
      return {
        ...prevState,
        selectedProjectId : undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    })
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content = <SelectedProject 
  project={selectedProject} 
  onDelete={handleDeleteProject} 
  onAddTask={handleAddTask}
  onDeleteTask={handleDeleteTask}
  onEditTask={handleEditTask}
  tasks = {projectsState.tasks}/>; 

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }
  
  if (!isLoggedIn) {
    return (
      <main className="h-screen flex items-center justify-center bg-gray-100">
        {isRegistering ? (
          <Register
            onComplete={handleCompleteRegister}
            onCancel={handleCancelRegister}
          />
        ) : (
          <div>
            <LoginUser onLogin={handleLogin} />
            <button
              onClick={handleStartRegister}
              className="felx mt-4 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 hover:scale-110 justify-center"
            >
              Register
            </button>
          </div>
        )}
      </main>
    );
  }
  
  return (
    <main className="h-screen my-8 flex gap-8">
      {isLoggedIn ? (
        <>
          <ProjectsSideBar
            onStartAddProject={handleStartAddProject}
            projects={projectsState.projects}
            onSelectProject={handleSelectedProject}
            selectedProjectId={projectsState.selectedProjectId}
          />
          {content}
        </>
      ) : (
        <LoginUser onLogin={handleLogin} />
      )}
    </main>
  );
}

export default App;
