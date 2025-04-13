// Fetch all goals
export const getGoals = async (token) => {
  const response = await fetch('http://localhost:5000/api/goals', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch goals');
  }

  return data;
};

// Create a new goal
export const setGoal = async (goalData, token) => {
  const response = await fetch('http://localhost:5000/api/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(goalData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create goal');
  }

  return data;
};

// Delete a goal
export const deleteGoal = async (id, token) => {
  const response = await fetch(`http://localhost:5000/api/goals/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not delete goal');
  }

  return data;
};