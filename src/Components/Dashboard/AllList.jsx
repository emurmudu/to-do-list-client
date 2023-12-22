import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const AllList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/tasks')
            .then(res => res.json())
            .then(data => setTasks(data));
    }, []);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const updatedTasks = Array.from(tasks);
        const [removedTask] = updatedTasks.splice(result.source.index, 1);
        updatedTasks.splice(result.destination.index, 0, removedTask);

        setTasks(updatedTasks);
    };

    return (
        <div>
            <Helmet>
                <title>Task Manager | AllList</title>
            </Helmet>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="allList" direction="vertical">
                    {(provided) => (
                        <div className="md:flex gap-4" {...provided.droppableProps} ref={provided.innerRef}>
                            <div className="flex-grow border bg-green-300">
                                <h1 className="text-2xl font-bold p-2 border-b">To-Do</h1>
                                {tasks.map((task, index) => (
                                    <Draggable key={task._id} draggableId={task._id} index={index}>
                                        {(provided) => (
                                            <div
                                                className='bg-green-200 border p-4'
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <p>Task : {task.task_name}</p>
                                                <p>Description : {task.description}</p>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>

                            <Droppable droppableId="ongoing" direction="vertical">
                                {(provided) => (
                                    <div
                                        className="flex-grow bg-blue-300 border"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        <h1 className="text-2xl font-bold p-2 border-b">Ongoing</h1>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            <Droppable droppableId="completed" direction="vertical">
                                {(provided) => (
                                    <div
                                        className="flex-grow bg-red-300 border"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        <h1 className="text-2xl font-bold p-2 border-b">Completed</h1>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default AllList;
