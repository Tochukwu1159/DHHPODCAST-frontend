import React, { useState } from 'react';
import { useUpdatePodcastCategory } from '../api/podcastCategories';
import { useParams } from 'react-router-dom';
import "./updateCategoryForm.css"
import { useGetAllPlans } from '../api/Plans';

function UpdateCategoryForm({setShowForm}) {
    const { categoryId } = useParams();

    const [formData, setFormData] = useState({
        name: '',
        userPlan: '',
        imageFile: null
    });

    const { mutate: updateCategory, isLoading: categoryLoading } = useUpdatePodcastCategory(categoryId);
    const { data: allPlans, isLoading: plansLoading, isError: plansError } = useGetAllPlans();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'imageFile' ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateCategory({ categoryId, ...formData });
            setFormData({
                name: '',
                userPlan: '',
                imageFile: null
            });
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
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
            <div >
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
            <button type="submit" disabled={categoryLoading}>Update</button>
            <button onClick={()=>setShowForm(false)}>Close</button>
        </form>
    );
}

export default UpdateCategoryForm;
