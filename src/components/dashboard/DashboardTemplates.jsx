import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../../CustomAxios/customAxios';
import { useSelector } from 'react-redux';

export const DashboardTemplates = () => {
    const [selectedProject, setSelectedProject] = useState("Select Project");
    const [selectedTemplate, setSelectedTemplate] = useState("Select Template");
    const [projects, setProjects] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const user = useSelector((state) => state.login);

    useEffect(() => {
        const fetchProjectsAndTemplates = async () => {
            try {
                const { data } = await axiosPrivate.get("/api/projects");
                const projectData = data.Data.map((project) => ({
                    id: project._id,
                    name: project.projectName
                }));

                // Dummy template data
                const templateData = [
                    { id: 'Simple-Template', name: 'Simple Template' },
                ];

                setProjects(projectData);
                setTemplates(templateData);
            } catch (err) {
                console.error("Error fetching projects and templates:", err);
            }
        };
        fetchProjectsAndTemplates();
    }, []);

    const handleToggleEdit = () => setIsEditing(prev => !prev);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (name === "project") {
            setSelectedProject(value);
        } else if (name === "template") {
            setSelectedTemplate(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedProject === "Select Project" || selectedTemplate === "Select Template") {
            alert("Please select both Project and Template");
            return;
        }

        try {
            const response = await axiosPrivate.post("/api/dashboards", {
                templateName: selectedTemplate,
                dashboardProject: selectedProject,
                owner: user.user._id,
            }, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.data.success) {
                alert("Dashboard created successfully");
                console.log(selectedProject, selectedTemplate);
            }
        } catch (err) {
            console.error("Error creating dashboard:", err);
        } finally {
            setIsEditing(false);
            setSelectedProject("Select Project");
            setSelectedTemplate("Select Template");
        }
    };

    return (
        <>
            <div className="items-center text-gray-800 dark:text-gray-200 flex mb-10">
                <div className="p-4 w-full">
                    <div className="grid grid-cols-12 gap-4 px-4 sm:px-8 md:px-16">
                        <div className="col-span-12 sm:col-span-6 md:col-span-3">
                            <div className="flex flex-row bg-white dark:bg-gray-800 shadow-sm rounded p-4 hover:cursor-pointer">
                                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-600 text-blue-500">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <div
                                    className="flex flex-col flex-grow ml-4 hover:cursor-pointer"
                                    onClick={handleToggleEdit}
                                >
                                    <div className="font-bold text-lg">Simple Dashboard</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Easily manage and prioritize daily tasks.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isEditing && (
                <div className='bg-gray-900 bg-opacity-50 w-full h-screen fixed top-0 left-0 z-50'>
                    <div className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center sm:py-12">
                        <div className="p-10 xs:p-0 mx-auto md:w-auto">
                            <div className="bg-white dark:bg-gray-800 shadow w-full rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                                <div className='flex flex-wrap flex-col text-start px-5 py-3 max-w-md'>
                                    <h1 className="font-bold text-xl pt-3 dark:text-gray-200">What data do you want to visualize?</h1>
                                    <p className='text-sm pt-1 dark:text-gray-400'>ClickUp Dashboards help you visualize data from your tasks. Select a location(s) to source your data from.</p>
                                </div>
                                <form onSubmit={handleSubmit} className="px-14 py-10 space-y-4">
                                    <label className="block">
                                        <span className="text-gray-700 dark:text-gray-300">Select Project:</span>
                                        <select
                                            name="project"
                                            value={selectedProject}
                                            onChange={handleFormChange}
                                            className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                        >
                                            <option>Select Project</option>
                                            {projects.map((project) => (
                                                <option key={project.id} value={project.id}>{project.name}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className="block">
                                        <span className="text-gray-700 dark:text-gray-300">Select Template:</span>
                                        <select
                                            name="template"
                                            value={selectedTemplate}
                                            onChange={handleFormChange}
                                            className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                        >
                                            <option>Select Template</option>
                                            {templates.map((template) => (
                                                <option key={template.id} value={template.id}>{template.name}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleToggleEdit}
                                        className="m-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
