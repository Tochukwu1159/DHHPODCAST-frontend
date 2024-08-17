import React, { useState } from 'react';
import { useGetPodcastCategories } from '../api/podcastCategories';
import "./AddPodcastForm.css"
import { useCreatePodcast } from '../api/podcast';

function AddPodcastForm() {
  const [formData, setFormData] = useState({
    title: '',
    imageFile: null, 
    description: '',
    categoryId: ''
  });

  // const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b2NodWt3dS51ZG9jaHVrd3VjQGdtYWlsLmNvbSIsImlhdCI6MTcxMjgxMDAxNywiZXhwIjoxNzEyODY3NjE3fQ.SW9hKL5evYptcqV1ZD1HKSEzOPhtRlsOwFVJkhZTbKQ";

  const { data: categories, isLoading: loading, isError: error } = useGetPodcastCategories();
  const {mutate: createPodcast} = useCreatePodcast()


  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setFormData(prevState => ({
        ...prevState,
        imageFile: files[0]
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('imageFile', formData.imageFile);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('categoryId', formData.categoryId);

    try {
        await createPodcast(formDataToSend)
    //   const response = await axios.post(
    //     'http://localhost:8081/api/v1/podcasts',
    //     formDataToSend,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         'Content-Type': 'multipart/form-data'
    //       }
    //     }
    //   );
    //   console.log('Podcast added:', response.data);
      setFormData({
        title: '',
        imageFile: null,
        description: '',
        categoryId: ''
      });
    } catch (error) {
      console.error('Error adding podcast:', error);
    }
  };

  return (
    <div>
    <h2>Add New Podcast</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
      </div>
      <div>
        <label>Cover Photo:</label>
        <input type="file" name="imageFile" onChange={handleInputChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange} />
      </div>
      <div>
        <label>Category:</label>
        <select name="categoryId" value={formData.categoryId} onChange={handleInputChange}>
          <option value="">Select Category</option>
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <button type="submit" disabled={loading}>Add Podcast</button>
    </form>
    {loading && <p>Loading...</p>}
    {error && <p>Error fetching categories.</p>}
  </div>
  );
}

export default AddPodcastForm;
