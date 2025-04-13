"use client"

export default function GoalItem({ goal, onDelete }) {
  return (
    <div className="bg-[#19344256] p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="flex-1">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-[#F5E8B1] rounded-full mr-2"></div>
            <h4 className="text-lg font-semibold text-[#F5E8B1]">{goal.heading}</h4>
          </div>
          <p className="text-white mt-1 text-sm">{goal.body}</p>
        </div>
        <button
          onClick={() => onDelete(goal._id)}
          className="text-sm px-3 py-1 bg-[#F5E8B1] border border-[#193442] text-[#193442] rounded-md hover:bg-[#193442] hover:text-white hover:border-[#F5E8B1] transition-colors duration-200 self-end sm:self-center"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
