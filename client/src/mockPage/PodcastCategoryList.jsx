import React from 'react';
import { useGetPodcastCategories } from '../api/podcastCategories';
import "./podcastCategoryList.css"
import { Link } from 'react-router-dom';



function PodcastCategoryList() {
  const { data: categories } = useGetPodcastCategories(); 
  return (
    <div className="podcast-list-container">
      <div>hello</div>
      {categories?.map(podcast => (
        <div key={podcast.id} className="podcast-card">
          <Link to={`/all-categories/${podcast.id}`}>
          <img src={podcast.coverPhoto} alt={podcast.title} className="podcast-cover" />
          <div className="podcast-details">
            <h2 className="podcast-title">{podcast.name}</h2>
            <p className="podcast-description">{podcast.subscriptionPlan}</p>
          </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PodcastCategoryList;
