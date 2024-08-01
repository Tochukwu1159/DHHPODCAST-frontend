import React, { useState } from 'react';
import axios from 'axios';
import { useGetPodcastpodcasts } from '../api/podcastCategories';
import "./AddPodcastForm.css"
import { useAllGetPodcast, useCreatePodcast } from '../api/podcast';
import { useCreateEpisode } from '../api/episodes';

function AddEpisodeForm() {
  const [formData, setFormData] = useState({
    title: '',
    audioFile: null, 
    description: '',
    podcastId: ''
  });

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b2NodWt3dS51ZG9jaHVrd3VjQGdtYWlsLmNvbSIsImlhdCI6MTcxMjgxMDAxNywiZXhwIjoxNzEyODY3NjE3fQ.SW9hKL5evYptcqV1ZD1HKSEzOPhtRlsOwFVJkhZTbKQ";

  const { data: podcasts, isLoading: loading, isError: error } = useAllGetPodcast();

  const {mutate: createPodcast, isPending: podcastPending} = useCreateEpisode()

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'audioFile') {
      setFormData(prevState => ({
        ...prevState,
        audioFile: files[0]
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
    formDataToSend.append('audioFile', formData.audioFile);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('podcastId', formData.podcastId);

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
        audioFile: null,
        description: '',
        podcastId: ''
      });
    } catch (error) {
      console.error('Error adding podcast:', error);
    }
  };

  return (
    <div>
    <h2>Add New Episode</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
      </div>
      <div>
        <label>Cover Photo:</label>
        <input type="file" name="audioFile" onChange={handleInputChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange} />
      </div>
      <div>
        <label>Episode:</label>
        <select name="podcastId" value={formData.podcastId} onChange={handleInputChange}>
          <option value="">Select Episode</option>
          {podcasts &&
            podcasts.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
        </select>
      </div>
      <button type="submit" disabled={loading}>Add Episode</button>
    </form>
    {loading && <p>Loading...</p>}
    {error && <p>Error fetching episode.</p>}
  </div>
  );
}

export default AddEpisodeForm;
