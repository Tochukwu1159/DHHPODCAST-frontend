import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
// import { getMostPopularPodcast } from '../api/index';
// import { getPodcastByCategory } from '../api';
import { PodcastCard } from '../components/PodcastCard.jsx'
import { getUsers } from '../api/index';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useGetAllFavoritePodcast } from '../api/favoritePodcast';
// import { useGetPodcastByName } from '../api/podcast';
import { useGetPodcastByCategoryName } from '../api/podcastCategories';

const DashboardMain = styled.div`
padding: 20px 30px;
padding-bottom: 200px;
height: 100%;
overflow-y: scroll;
display: flex;
flex-direction: column;
gap: 20px;
@media (max-width: 768px){
  padding: 6px 10px;
}
`;
const FilterContainer = styled.div`
display: flex;
flex-direction: column;
${({ box, theme }) => box && `
background-color: ${theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`}
background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`;
const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @maedia (max-width: 768px){
    font-size: 18px;
  }
`;
const Span = styled.span`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  @media (max-width: 768px){
    font-size: 14px;
  }
  color: ${({ theme }) => theme.primary};
  &:hover{
    transition: 0.2s ease-in-out;
  }
  `;
const Podcasts = styled.div`
display: flex;
flex-wrap: wrap;
gap: 14px;
padding: 18px 6px;
//center the items if only one item present
@media (max-width: 550px){
  justify-content: center;
}
`;

const Loader = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
`
// const DisplayNo = styled.div`
// display: flex;
// justify-content: center;
// align-items: center;
// height: 100%;
// width: 100%;
// color: ${({ theme }) => theme.text_primary};
// `

const Dashboard = ({ setSignInOpen }) => {
  // const [mostPopular, setMostPopular] = useState([]);
  const [user, setUser] = useState();

  const [loading] = useState(false);

  //user
  const { currentUser } = useSelector(state => state.user);

  // const { data: favoritePodcast, isLoading, isError: favError, refetch:favRefetch } = useGetAllFavoritePodcast();
  // const { data: comedy, isLoading: isLoad, isError:comedyError, refetch: comRefetch } = useGetPodcastByCategoryName("gfgvxhgvxhgvsx");
  // const { data: crime, isLoading: loadingCirme, crimeError, refetch:criRefetch  } = useGetPodcastByCategoryName("Crime");
  // const { data: culture, isLoading: loadingCulture, cultureError, refetch:culRefetch  } = useGetPodcastByCategoryName("Culture");
  // const { data: development, isLoading: loadingDevelopment, devError, refetch:devRefetch  } = useGetPodcastByCategoryName("Development");
  // const { data: education, isLoading: loadingEducation, educationError, refetch:eduRefetch  } = useGetPodcastByCategoryName("Education");
  // const { data: health, isLoading: loadingHealth, healthError, refetch:heaRefetch  } = useGetPodcastByCategoryName("Health");
  // const { data: history, isLoading: loadingHistory, historyError,refetch:hisRefetch  } = useGetPodcastByCategoryName("History");
  // const { data: news, isLoading: loadingNews, newsError, refetch:newRefetch  } = useGetPodcastByCategoryName("News");
  // const { data: religion, isLoading: loadingReligoin, religiousError,refetch:relRefetch  } = useGetPodcastByCategoryName("Religion");
  // const { data: science, isLoading: loadingScience, scienceError, refetch:sciRefetch  } = useGetPodcastByCategoryName("Science");
  // const { data: sports, isLoading: loadingSports, sportsError, refetch:spoRefetch  } = useGetPodcastByCategoryName("Sports");

  const { data: favoritePodcast, refetch:favRefetch } = useGetAllFavoritePodcast();
  const { data: comedy,  refetch: comRefetch } = useGetPodcastByCategoryName("gfgvxhgvxhgvsx");
  const { data: crime,  refetch:criRefetch  } = useGetPodcastByCategoryName("Crime");
  const { data: culture, refetch:culRefetch  } = useGetPodcastByCategoryName("Culture");
  const { data: development, refetch:devRefetch  } = useGetPodcastByCategoryName("Development");
  const { data: education, refetch:eduRefetch  } = useGetPodcastByCategoryName("Education");
  const { data: health,  refetch:heaRefetch  } = useGetPodcastByCategoryName("Health");
  const { data: history,refetch:hisRefetch  } = useGetPodcastByCategoryName("History");
  const { data: news,  refetch:newRefetch  } = useGetPodcastByCategoryName("News");
  const { data: religion, refetch:relRefetch  } = useGetPodcastByCategoryName("Religion");
  const { data: science, refetch:sciRefetch  } = useGetPodcastByCategoryName("Science");
  const { data: sports,  refetch:spoRefetch  } = useGetPodcastByCategoryName("Sports");
  
  // const {mutate: addToFavorite, isPending: podcastPending} = useAddToFavorite()
 
  useEffect(() => {
   
  }, [user])


  const token = localStorage.getItem("podstreamtoken");
  // const getUser = async () => {
  //   await getUsers(token).then((res) => {
  //     setUser(res.data)
  //   }).then((error) => {
  //     console.log('there is error', error);    });
  // }

  return (
    <DashboardMain>
      {loading ?
        <Loader>
          <CircularProgress />
        </Loader>
        :
        <>
          {currentUser && user?.podcasts?.length > 0 &&
            <FilterContainer box={true}>
              <Topic>Your Uploads
                <Link to={`/profile`} style={{ textDecoration: "none" }}>
                  <Span>Show All</Span>
                </Link>
              </Topic>
              <Podcasts>
                {user?.podcasts.map((podcast) => (
                  <PodcastCard podcast={podcast} user={user} setSignInOpen={setSignInOpen}  />
                ))}
              </Podcasts>
            </FilterContainer>
          }
          <FilterContainer>
            <Topic>Most Popular
              <Link to={`/showpodcasts/mostpopular`} style={{ textDecoration: "none" }}>
                <Span>Show All</Span>
              </Link>
            </Topic>
           {favoritePodcast && (
      <Podcasts>
        {favoritePodcast?.podcast?.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} user={user} setSignInOpen={setSignInOpen} refresher={favRefetch}/>
        ))}
      </Podcasts>
    )}
          </FilterContainer>
          <FilterContainer>
            <Topic>Comedy
              <Link to={`/showpodcasts/comedy`} style={{ textDecoration: "none" }}>
                <Span>Show All</Span>
              </Link>
            </Topic>
            <Podcasts>
              {comedy?.podcast.map((podcast) => (
                <PodcastCard podcast={podcast} user={user} setSignInOpen={setSignInOpen} refresher={comRefetch} />
              ))}
            </Podcasts>
          </FilterContainer>
          <FilterContainer>
            <Link to={`/showpodcasts/news`} style={{ textDecoration: "none" }}>
              <Topic>News
                <Span>Show All</Span>
              </Topic>
            </Link>
            <Podcasts>
              {news?.podcast.map((podcast) => (
                <PodcastCard podcast={podcast} user={user} setSignInOpen={setSignInOpen} refresher={newRefetch}/>
              ))}
            </Podcasts>
          </FilterContainer>
          <FilterContainer>
            <Link to={`/showpodcasts/crime`} style={{ textDecoration: "none" }}>
              <Topic>Crime
                <Span>Show All</Span>
              </Topic>
            </Link>
            <Podcasts>
              {crime?.podcast.map((podcast) => (
                <PodcastCard podcast={podcast} user={user} setSignInOpen={setSignInOpen} refresher={criRefetch}/>
              ))}
            </Podcasts>
          </FilterContainer>
          <FilterContainer>
            <Link to={`/showpodcasts/sports`} style={{ textDecoration: "none" }}>
              <Topic>Sports
                <Span>Show All</Span>
              </Topic>
            </Link>
            <Podcasts>
              {sports?.podcast.map((podcast) => (
                <PodcastCard podcast={podcast} user={user} setSignInOpen={setSignInOpen} refresher={spoRefetch}/>
              ))}
            </Podcasts>
          </FilterContainer>
          <FilterContainer>
            <Link to={`/showpodcasts/culture`} style={{ textDecoration: "none" }}>
              <Topic>Cultures
                <Span>Show All</Span>
              </Topic>
            </Link>
            <Podcasts>
              {culture?.podcast.map((podcast) => (
                <PodcastCard podcast={podcast} user={user} setSignInOpen={setSignInOpen} refresher={culRefetch} />
              ))}
            </Podcasts>
          </FilterContainer>
          <FilterContainer>
            <Link to={`/showpodcasts/development`} style={{ textDecoration: "none" }}>
              <Topic>Developments
                <Span>Show All</Span>
              </Topic>
            </Link>
            <Podcasts>
              {development?.podcast.map((podcast) => (
                <PodcastCard podcast={podcast} user={user} setSignInOpen={setSignInOpen} refresher={devRefetch} />
              ))}
            </Podcasts>
          </FilterContainer>
          <FilterContainer>
            <Link to={`/showpodcasts/education`} style={{ textDecoration: "none" }}>
              <Topic>Educations
                <Span>Show All</Span>
              </Topic>
            </Link>
            <Podcasts>
              {education?.podcast.map((podcast) => (
                <PodcastCard podcast={podcast} user={user} setSignInOpen={setSignInOpen} refresher={eduRefetch}/>
              ))}
            </Podcasts>
          </FilterContainer>
          <FilterContainer>
            <Link to={`/showpodcasts/health`} style={{ textDecoration: "none" }}>
              <Topic>Health
                <Span>Show All</Span>
              </Topic>
            </Link>
            <Podcasts>
              {health?.podcast.map((podcast) => (
                <PodcastCard podcast={podcast} user={user} setSignInOpen={setSignInOpen} refresher={heaRefetch}/>
              ))}
            </Podcasts>
          </FilterContainer>
          <FilterContainer>
            <Link to={`/showpodcasts/sport`} style={{ textDecoration: "none" }}>
              <Topic>Educations
                <Span>Show All</Span>
              </Topic>
            </Link>
            <Podcasts>
              {education?.podcast.map((podcast) => (
                <PodcastCard podcast={podcast} user={user} setSignInOpen={setSignInOpen} refresher={eduRefetch}/>
              ))}
            </Podcasts>
          </FilterContainer>
          <FilterContainer>
            <Link to={`/showpodcasts/history`} style={{ textDecoration: "none" }}>
              <Topic>Histories
                <Span>Show All</Span>
              </Topic>
            </Link>
            <Podcasts>
              {history?.podcast.map((podcast) => (
                <PodcastCard podcast={podcast} user={user} setSignInOpen={setSignInOpen} refresher={hisRefetch}/>
              ))}
            </Podcasts>
          </FilterContainer>
          <FilterContainer>
            <Link to={`/showpodcasts/religion`} style={{ textDecoration: "none" }}>
              <Topic>Religions
                <Span>Show All</Span>
              </Topic>
            </Link>
            <Podcasts>
              {religion?.podcast.map((podcast) => (
                <PodcastCard podcast={podcast} user={user} setSignInOpen={setSignInOpen} refresher={relRefetch}/>
              ))}
            </Podcasts>
          </FilterContainer>
          <FilterContainer>
            <Link to={`/showpodcasts/science`} style={{ textDecoration: "none" }}>
              <Topic>Science
                <Span>Show All</Span>
              </Topic>
            </Link>
            <Podcasts>
              {science?.podcast.map((podcast) => (
                <PodcastCard podcast={podcast} user={user} setSignInOpen={setSignInOpen} refresher={sciRefetch}/>
              ))}
            </Podcasts>
          </FilterContainer>
        </>
      }
    </DashboardMain>
  )
}

export default Dashboard