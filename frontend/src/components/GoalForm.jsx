'use client';

import { useState } from 'react';
import { setGoal } from '../lib/api';

export default function GoalForm({ setGoals, goals }) {
  const [heading, setHeading] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const newGoal = await setGoal({ heading, body }, token);
      setGoals([...goals, newGoal]);
      setHeading(''); 
      setBody('');
    } catch (err) {
      setError('Failed to add goal');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#193442] p-4 md:p-6 rounded-lg shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-[#F5E8B1]">Add a New Goal</h3>
      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
      <div className="mb-4">
        <label className="block text-[#F5E8B1] text-sm font-medium mb-2" htmlFor="heading">
          Heading
        </label>
        <input
          type="text"
          id="heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#193442] focus:border-transparent"
          placeholder="Enter goal heading"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-[#F5E8B1] text-sm font-medium mb-2" htmlFor="body">
          Description
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#193442] focus:border-transparent"
          placeholder="Enter goal description"
          rows="3"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#F5E8B1] text-[#193442]  p-2 rounded-md  hover:text-[#F5E8B1] hover:border-2 hover:border-[#F5E8B1] hover:bg-[#193442] transition-colors duration-200 flex items-center justify-center"
      >
       + Add Goal
      </button>
    </form>
  );
}
