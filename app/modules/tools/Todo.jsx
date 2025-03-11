"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Trash,
  Edit,
  Check,
  X,
  Search,
  Calendar,
  Clock,
  Star,
  Tag,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [taskDueDate, setTaskDueDate] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskDescription, setEditingTaskDescription] = useState("");
  const [editingTaskPriority, setEditingTaskPriority] = useState("Medium");
  const [editingTaskDueDate, setEditingTaskDueDate] = useState(null);
  const [editingTaskTags, setEditingTaskTags] = useState("");
  const [editingTaskNotes, setEditingTaskNotes] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("dueDate");
  const [persistLoaded, setpersistLoaded] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const storedFilter = localStorage.getItem("filter");
    const storedSearchQuery = localStorage.getItem("searchQuery");
    const storedSortOption = localStorage.getItem("sortOption");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    if (storedFilter) {
      setFilter(storedFilter);
    }
    if (storedSearchQuery) {
      setSearchQuery(storedSearchQuery);
    }
    if (storedSortOption) {
      setSortOption(storedSortOption);
    }

    setpersistLoaded(true);
  }, []);

  useEffect(() => {
    if (persistLoaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      localStorage.setItem("filter", filter);
      localStorage.setItem("searchQuery", searchQuery);
      localStorage.setItem("sortOption", sortOption);
    }
  }, [tasks, filter, searchQuery, sortOption]);

  const addTask = () => {
    if (taskInput.trim() === "") return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        description: taskInput,
        completed: false,
        priority: taskPriority,
        dueDate: taskDueDate,
        tags: "",
        notes: "",
      },
    ]);
    setTaskInput("");
    setTaskPriority("Medium");
    setTaskDueDate(null);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditingTask = (
    id,
    description,
    priority,
    dueDate,
    tags,
    notes
  ) => {
    setEditingTaskId(id);
    setEditingTaskDescription(description);
    setEditingTaskPriority(priority);
    setEditingTaskDueDate(dueDate);
    setEditingTaskTags(tags);
    setEditingTaskNotes(notes);
  };

  const saveEditedTask = (id) => {
    if (editingTaskDescription.trim() === "") return;
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              description: editingTaskDescription,
              priority: editingTaskPriority,
              dueDate: editingTaskDueDate,
              tags: editingTaskTags,
              notes: editingTaskNotes,
            }
          : task
      )
    );
    setEditingTaskId(null);
    setEditingTaskDescription("");
    setEditingTaskPriority("Medium");
    setEditingTaskDueDate(null);
    setEditingTaskTags("");
    setEditingTaskNotes("");
  };

  const cancelEditingTask = () => {
    setEditingTaskId(null);
    setEditingTaskDescription("");
    setEditingTaskPriority("Medium");
    setEditingTaskDueDate(null);
    setEditingTaskTags("");
    setEditingTaskNotes("");
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOption === "dueDate") {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortOption === "priority") {
      const priorityOrder = { Low: 1, Medium: 2, High: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  const handleTaskInputKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const handleSearchInputKeyDown = (e) => {
    if (e.key === "Enter") {
      // Optionally, you can trigger a search action here if needed
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 p-8 grid place-items-center">
      <Card className="max-w-4xl w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-6 text-center primary-text-gradient">
            To-Do List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label
              htmlFor="task-input"
              className="block text-sm font-medium text-gray-700 primary-text-gradient"
            >
              Add a new task
            </Label>
            <div className="flex flex-col mt-1">
              <Input
                id="task-input"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={handleTaskInputKeyDown}
                className="mb-2"
                placeholder="Enter task"
              />
              <div className="flex items-center mb-2">
                <Label htmlFor="priority" className="mr-2">
                  Priority:
                </Label>
                <Select value={taskPriority} onValueChange={setTaskPriority}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center mb-2">
                <Label htmlFor="due-date" className="mr-2">
                  Due Date:
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-32">
                      {taskDueDate ? (
                        format(new Date(taskDueDate), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <DatePicker
                      selected={taskDueDate ? new Date(taskDueDate) : null}
                      onChange={(date) => setTaskDueDate(date)}
                      className="w-full"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button className="primary-gradient" onClick={addTask}>Add</Button>
            </div>
          </div>
          <div className="mb-4">
            <Label
              htmlFor="search-input"
              className="block text-sm font-medium text-gray-700"
            >
              Search tasks
            </Label>
            <div className="flex mt-1">
              <Input
                id="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchInputKeyDown}
                className="flex-1 mr-2"
                placeholder="Search..."
              />
              <Button variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mb-4">
            <Label className="block text-sm font-medium text-gray-700">
              Filter tasks
            </Label>
            <RadioGroup
              defaultValue="all"
              className="flex items-center space-x-2 mt-1"
              value={filter}
              onValueChange={setFilter}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="completed" id="completed" />
                <Label htmlFor="completed">Completed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pending" id="pending" />
                <Label htmlFor="pending">Pending</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="mb-4">
            <Label className="block text-sm font-medium text-gray-700">
              Sort tasks
            </Label>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ul className="space-y-2">
            {sortedTasks.map((task) => (
              <motion.li
                key={task.id}
                className="flex flex-col bg-gray-100 rounded p-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {editingTaskId === task.id ? (
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <Input
                        value={editingTaskDescription}
                        onChange={(e) =>
                          setEditingTaskDescription(e.target.value)
                        }
                        className="flex-1 mr-2"
                        placeholder="Edit task"
                      />
                      <Button
                        variant="success"
                        onClick={() => saveEditedTask(task.id)}
                        className="mr-2 primary-gradient text-white"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" onClick={cancelEditingTask}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center mb-2">
                      <Label htmlFor="priority" className="mr-2">
                        Priority:
                      </Label>
                      <Select
                        value={editingTaskPriority}
                        onValueChange={setEditingTaskPriority}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center mb-2">
                      <Label htmlFor="due-date" className="mr-2">
                        Due Date:
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-32">
                            {editingTaskDueDate ? (
                              format(new Date(editingTaskDueDate), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <DatePicker
                            selected={
                              editingTaskDueDate
                                ? new Date(editingTaskDueDate)
                                : null
                            }
                            onChange={(date) => setEditingTaskDueDate(date)}
                            className="w-full"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="mb-2">
                      <Label
                        htmlFor="tags"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tags:
                      </Label>
                      <Input
                        id="tags"
                        value={editingTaskTags}
                        onChange={(e) => setEditingTaskTags(e.target.value)}
                        className="w-full"
                        placeholder="Enter tags"
                      />
                    </div>
                    <div className="mb-2">
                      <Label
                        htmlFor="notes"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Notes:
                      </Label>
                      <Textarea
                        id="notes"
                        value={editingTaskNotes}
                        onChange={(e) => setEditingTaskNotes(e.target.value)}
                        className="w-full"
                        placeholder="Enter notes"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(task.id)}
                          className="mr-2"
                        />
                        <span
                          className={`flex-1 ${
                            task.completed ? "line-through text-gray-500" : ""
                          } line-clamp-2`}
                        >
                          {task.description}
                        </span>
                      </div>
                      {task.dueDate && (
                        <span className="text-sm text-gray-500 mt-1 line-clamp-1">
                          <Calendar className="inline-block mr-1" />{" "}
                          {format(new Date(task.dueDate), "PPP")}
                        </span>
                      )}
                      {task.tags && (
                        <span className="text-sm text-gray-500 mt-1 line-clamp-1">
                          <Tag className="inline-block mr-1" /> {task.tags}
                        </span>
                      )}
                      {task.notes && (
                        <div className="mt-1 text-sm text-gray-500 line-clamp-3">
                          <span className="font-semibold">Notes:</span>{" "}
                          {task.notes}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center">
                      <div className="pr-3">
                        {task.priority === "High" && (
                          <Star className="ml-2 text-red-500" />
                        )}
                        {task.priority === "Medium" && (
                          <Star className="ml-2 text-yellow-500" />
                        )}
                        {task.priority === "Low" && (
                          <Star className="ml-2 text-green-500" />
                        )}
                      </div>
                      {editingTaskId !== task.id && (
                        <Button
                          variant="outline"
                          className="mr-2 primary-gradient text-white"
                          onClick={() =>
                            startEditingTask(
                              task.id,
                              task.description,
                              task.priority,
                              task.dueDate,
                              task.tags,
                              task.notes
                            )
                          }
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}

                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
