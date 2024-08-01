import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useGetAllUsers } from '../api/user';
import { useAllGetPodcast } from '../api/podcast';
import { useGetPodcastCategories } from '../api/podcastCategories';
import { useGetAllEpisodes } from '../api/episodes';
import { useGetAllComments } from '../api/comments';
import { useGetAllPodcastView } from '../api/podcastViews';
// import { useGetAllUsers, useAllGetPodcast, useGetPodcastCategories, useGetAllEpisodes, useGetAllComments, useGetAllLikes, useGetAllPodcastViews } from '../api/podcast';

const stats = [
  { name: 'Users', image: '/users.png', key: 'users' },
  { name: 'Podcasts', image: '/Logo.png', key: 'podcasts' },
  { name: 'Episodes', image: '/episode.jpeg', key: 'episodes' },
  { name: 'Comments', image: '/comment.png', key: 'comments' },
  { name: 'Podcast Categories', image: '/Logo.png', key: 'categories' },
  { name: 'Podcast Views', image: '/view.jpeg', key: 'podcastViews' },
];

const StatsPage = () => {
  const { data: fetchedUsers = [], isLoading: isLoadingUsers, isError: isLoadingUsersError } = useGetAllUsers();
  const { data: fetchedPodcasts = [], isLoading: isLoadingPodcasts, isError: isLoadingPodcastsError } = useAllGetPodcast();
  const { data: fetchedCategories = [], isLoading: isLoadingCategories, isError: isLoadingCategoriesError } = useGetPodcastCategories();
  const { data: fetchedEpisodes = [], isLoading: isLoadingEpisodes, isError: isLoadingEpisodesError } = useGetAllEpisodes();
  const { data: fetchedComments = [], isLoading: isLoadingComments, isError: isLoadingCommentsError } = useGetAllComments();
//   const { data: fetchedLikes = [], isLoading: isLoadingLikes, isError: isLoadingLikesError } = useGetAllLikes();
  const { data: fetchedPodcastViews = [], isLoading: isLoadingPodcastViews, isError: isLoadingPodcastViewsError } = useGetAllPodcastView();

  const isLoading = isLoadingUsers || isLoadingPodcasts || isLoadingCategories || isLoadingEpisodes || isLoadingComments || isLoadingPodcastViews;
  const isError = isLoadingUsersError || isLoadingPodcastsError || isLoadingCategoriesError || isLoadingEpisodesError || isLoadingCommentsError || isLoadingPodcastViewsError;

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Error loading data</div>;

  const data = {
    users: fetchedUsers.length,
    podcasts: fetchedPodcasts.length,
    episodes: fetchedEpisodes.length,
    comments: fetchedComments.length,
    // likes: fetchedLikes.length,
    categories: fetchedCategories.length,
    podcastViews: fetchedPodcastViews.length,
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
      {stats.map((stat) => (
        <Card key={stat.name} sx={{ width: 200, textAlign: 'center' }}>
          <CardContent>
            <Box 
              component="img" 
              src={stat.image} 
              alt={stat.name} 
              sx={{ width: 80, height: 80, objectFit: 'cover', marginBottom: 2 }} 
            />
            <Typography variant="h6" component="div">{stat.name}</Typography>
            <Typography variant="h4" component="div">{data[stat.key]}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default StatsPage;
