export default function TaskDetails() {
  return (
    <div className="flex flex-col items-center justify-start p-4 space-y-2 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-200 mb-4">Task Details</h2>
      <div className="bg-gray-700 text-gray-100 px-6 py-4 rounded shadow w-full max-w-md">
        <p className="text-sm font-medium">Task Name: Example Task</p>
        <p className="text-sm mt-2">
          Description: This is an example task description.
        </p>
        <p className="text-sm mt-2">Priority: Low</p>
        <p className="text-sm mt-2">State: To Do</p>
      </div>
    </div>
  );
}
