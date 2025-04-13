"use client"

import { useState, useEffect } from "react"
import GoalForm from "../../components/GoalForm"
import GoalItem from "../../components/GoalItem"
import Spinner from "../../components/Spinner"
import { getGoals, deleteGoal } from "../../lib/api"

export default function Goals() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No token found")
      }
      const data = await getGoals(token)
      setGoals(data)
      setLoading(false)
    } catch (err) {
      setError("Failed to load goals")
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No token found")
      }
      await deleteGoal(id, token)
      setGoals(goals.filter((goal) => goal._id !== id))
    } catch (err) {
      setError("Failed to delete goal")
    }
  }

  if (loading) return <Spinner />
  if (error) return <p className="text-red-500 text-center p-4">{error}</p>

  return (
    <div className="bg-[#193442] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <div className="w-3 h-3 bg-[#F5E8B1] rounded-full mr-3"></div>
            <h2 className="text-2xl font-bold text-[#193442]">Your Goals</h2>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <GoalForm setGoals={setGoals} goals={goals} />

            <div className="space-y-4">
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-medium text-[#193442]">
                  {goals.length > 0 ? "Current Goals" : "No goals yet"}
                </h3>
                {goals.length > 0 && (
                  <span className="ml-2 bg-[#F5E8B1] text-[#193442] text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {goals.length}
                  </span>
                )}
              </div>

              {goals.length > 0 ? (
                <div className="grid gap-4">
                  {goals.map((goal) => (
                    <GoalItem key={goal._id} goal={goal} onDelete={handleDelete} />
                  ))}
                </div>
              ) : (
                <div className="bg-[#193442] p-8 rounded-lg shadow-md text-center border border-dashed border-[#F5E8B1]">
                  <p className="text-[#F5E8B1]">No goals yet. Add one above!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
