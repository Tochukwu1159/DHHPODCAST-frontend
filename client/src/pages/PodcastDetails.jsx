import React, { useState } from 'react'
import styled from 'styled-components'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CircularProgress, IconButton } from '@mui/material';
// import { favoritePodcast, getPodcastById, getUsers } from '../api';
import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import Episodecard from '../components/Episodecard';
// import { openSnackbar } from '../redux/snackbarSlice';
// import Avatar from '@mui/material/Avatar';
import { format } from 'timeago.js';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { useGetEpisodesByPodcastId } from '../api/episodes';
import { useAddToFavorite } from '../api/favoritePodcast';
import { useCreatePodcastView } from '../api/podcastViews';

const Container = styled.div`
padding: 20px 30px;
padding-bottom: 200px;
height: 100%;
overflow-y: scroll;
display: flex;
flex-direction: column;
gap: 20px;
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.text_secondary};
  object-fit: cover;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
`;

const Episodes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 22px;
  font-weight: 540;
  display: flex;
  justify-content space-between;
  align-items: center;
`;

const EpisodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


const Favorite = styled(IconButton)`
  color:white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.text_secondary + 95} !important;
  color: ${({ theme }) => theme.text_primary} !important;
`

const Loader = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
`
const CreatorContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`
const Views = styled.div`
color: ${({ theme }) => theme.text_secondary};
font-size: 12px;
margin-left: 20px;
`
const Icon = styled.div`
color: white;
font-size: 12px;
margin-left: 20px;
border-radius: 50%;
background: #9000ff !important;
display: flex;
align-items: center;
justify-content: center;
padding: 6px;
`

const PodcastDetails = () => {
  const { id } = useParams();
  const [favouriteId, setFavouriteId] = useState(null)
  const { data: episodes, loading, refetch } = useGetEpisodesByPodcastId(id);

const {mutate: addToFavorite} = useAddToFavorite(favouriteId) 
const {mutate: addToView} = useCreatePodcastView(favouriteId) 


const handleClick = (id) => {
  setFavouriteId(id)
    addToFavorite();
    addToView();
    refetch();
  // setFavourite(!favourite);
};
  return (
    <Container>
      {loading ? (
        <Loader>
          <CircularProgress />
        </Loader>
      ) : (
        episodes?.map((podcast, index) => (
          <div key={index}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }} onClick={() => handleClick(podcast.id)}>
              <Favorite>
                {podcast.favorite ? (
                  <FavoriteIcon style={{ color: "#E30022", width: '16px', height: '16px' }}></FavoriteIcon>
                ) : (
                  <FavoriteIcon style={{ width: '16px', height: '16px' }}></FavoriteIcon>
                )}
              </Favorite>
            </div>
            <Image src={podcast?.coverPhoto} />
            <Details>
              <Title>{podcast?.title}</Title>
              <Description>{podcast?.description}</Description>
              <CreatorContainer>
                <Views>• {podcast?.totalViews} Views</Views>
                <Views>• {format(podcast?.createdAt)}</Views>
                <Icon>
                  {podcast?.type === "audio" ? <HeadphonesIcon /> : <PlayArrowIcon />}
                </Icon>
              </CreatorContainer>
            </Details>
            <Episodes>
              <Topic>All Episodes</Topic>
              <EpisodeWrapper>
                {podcast?.episodes?.map((episode, index) => (
                  <Episodecard key={index} episode={episode} podid={podcast} />
                ))}
              </EpisodeWrapper>
            </Episodes>
          </div>
        ))
      )}
    </Container >
  );
}

export default PodcastDetails