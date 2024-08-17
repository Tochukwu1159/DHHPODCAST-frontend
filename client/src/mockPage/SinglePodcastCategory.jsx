import React from 'react';
import { useGetPodcastCategoryById } from '../api/podcastCategories';
import "./podcastCategoryList.css"
import { useParams } from 'react-router-dom';
import "./singlePodcastCategoryList.css"
import { useState } from 'react';
import UpdateCategoryForm from './UpdateCategoryForm';



function SinglePodcastCategory() {
    const { categoryId } = useParams()
    const { data: category } = useGetPodcastCategoryById(categoryId);

    const [showForm, setShowForm] = useState(false)

    const handleUpdateClick = () => {
        setShowForm(true)
    };
    return (
        <> 
        <div>
       { showForm && <UpdateCategoryForm setShowForm={setShowForm}/> }
</div>
         <div className="single-podcast-category">
            <h2>{category?.name}</h2>
            <p>Subscription Plan: {category?.subscriptionPlan}</p>
            <img src={category?.coverPhoto} alt={category?.name} className="category-cover" />
            {/* Update button */}
            <button onClick={handleUpdateClick}>Update</button>
            {/* Link to update page */}
            {/* <Link to={`/category-update/${category.id}`} className="update-link">Update</Link> */}
        </div>



        </>
    );
}

export default SinglePodcastCategory;
