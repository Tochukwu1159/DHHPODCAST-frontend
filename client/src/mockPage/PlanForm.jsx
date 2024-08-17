import React, { useState } from 'react';
import { useCreatePlan } from '../api/Plans';
import './PlanForm.css'; // Import your CSS file

const PlanForm = () => {
  const [planName, setPlanName] = useState('');
  const {mutate: createPlan} = useCreatePlan()
  const handleSubmit = async (event) => {
    event.preventDefault();
    let newPlan = (JSON.stringify({ name: planName }))
    console.log(planName, "plan")
    await createPlan(newPlan);

    // // Replace with your actual API call logic
    // const response = await fetch('/api/create-plan', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name: planName }),
    // });

    // // Handle response (success/error)
    // if (response.ok) {
    //   console.log('Plan created successfully!');
    //   setPlanName(''); // Clear form after successful submission
    // } else {
    //   console.error('Error creating plan:', response.statusText);
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="plan-form">
      <label htmlFor="plan-name">Plan Name:</label>
      <input
        type="text"
        id="plan-name"
        name="planName"
        value={planName}
        onChange={(e) => setPlanName(e.target.value)}
        placeholder="Enter your plan name"
        required
      />
      <button type="submit">Create Plan</button>
    </form>
  );
};

export default PlanForm;
