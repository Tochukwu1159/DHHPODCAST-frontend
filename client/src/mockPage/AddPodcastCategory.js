import React, { useState } from 'react';
import { useCreatePodcastCategories } from '../api/podcastCategories';

import './AddPodcastCategory.css';
import { useGetAllPlans } from '../api/Plans';

function AddPodcastCategory() {

const {mutate: createPodcast} = useCreatePodcastCategories()
const { data: allPlans, isLoading: plansLoading, isError: plansError } = useGetAllPlans();

  const [formData, setFormData] = useState({
    name: '',
    userPlan: '',
    imageFile: null, // Initialize imageFile as null
  });

 
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'imageFile' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await createPodcast(formData);
      setFormData({
        name: '',
        userPlan: '',
        imageFile: null,
      });
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };
  return (
    <div className="add-podcast-category-container">
      <h1>Add Podcast Category</h1>
      <form className="add-podcast-category-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userPlan">Subscription Plan:</label>
          <select
            id="userPlan"
            name="userPlan"
            value={formData.userPlan}
            onChange={handleChange}
            required
          >
            <option value="">Select Plan</option>
            {plansLoading ? (
              <option disabled>Loading...</option>
            ) : plansError ? (
              <option disabled>Error loading plans</option>
            ) : (
              allPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="imageFile">Cover Photo:</label>
          <input
            type="file"
            id="imageFile"
            name="imageFile"
            accept="image/*" // Specify accepted file types
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}

export default AddPodcastCategory;
