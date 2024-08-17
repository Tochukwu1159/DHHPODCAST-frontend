import axios from 'axios';
//https://podstream.onrender.com/api
// const API = axios.create({ baseURL: `https://podstream.onrender.com/api` }); 
const API = axios.create({ baseURL: `http://localhost:8081/api` }); 
const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b2NodWt3dS51ZG9jaHVrd3UxQGdtYWlsLmNvbSIsImlhdCI6MTcxMjUzMDM5NywiZXhwIjoxNzEyNTg3OTk3fQ.PtdxeWFkTOiRmN0MKI3A7T1He3fS9OWyHVvdIc6JO4s";



//auth
export const signIn = async ({ email, password }) => await API.post('/auth/signin', { email, password });
export const signUp = async ({
    name,
    email,
    password,
}) => await API.post('/auth/signup', {
    name,
    email,
    password,
});
export const googleSignIn = async ({
    name,
    email,
    img,
}) => await API.post('/auth/google', {
    name,
    email,
    img,
});
export const findUserByEmail = async (email) => await API.get(`/auth/findbyemail?email=${email}`);
export const generateOtp = async (email,name,reason) => await API.get(`/auth/generateotp?email=${email}&name=${name}&reason=${reason}`);
export const verifyOtp = async (otp) => await API.get(`/auth/verifyotp?code=${otp}`);
export const resetPassword = async (email,password) => await API.put(`/auth/forgetpassword`,{email,password});

//user api
export const getUsers = async (token) => await API.get('/user', { headers: { "Authorization" : `Bearer ${token}` }},{
    withCredentials: true
    });
export const searchUsers = async (search,token) => await API.get(`users/search/${search}`,{ headers: { "Authorization" : `Bearer ${token}` }},{ withCredentials: true });


//podcast api
export const createPodcast = async (podcast,token) => await API.post('/podcasts', podcast, { headers: { "Authorization" : `Bearer ${token}` } },{ withCredentials: true });
export const getPodcasts = async () => await API.get('/podcasts');
export const addEpisodes = async (podcast,token) => await API.post('/podcasts/episode', podcast, { headers: { "Authorization" : `Bearer ${token}` } },{ withCredentials: true });
export const favoritePodcast = async (id,token) => await API.post(`/podcasts/favorit`,{id: id}, { headers: { "Authorization" : `Bearer ${token}` } },{ withCredentials: true });
export const getRandomPodcast = async () => await API.get('/podcasts/random');
export const getPodcastByTags = async (tags) => await API.get(`/podcasts/tags?tags=${tags}`);
export const getPodcastByCategory = async (category) => await API.get(`/podcasts/category?q=${category}`);
export const getMostPopularPodcast = async () => await API.get('/podcasts/mostpopular');
export const getPodcastById = async (id) => await API.get(`/podcasts/get/${id}`);
export const addView = async (id) => await API.post(`/podcasts/addview/${id}`);
export const searchPodcast = async (search) => await API.get(`/podcasts/search?q=${search}`);







//podcast categories api
export const createPodcastCategory = async (categorydto,token) => await API.post(`/podcast-categories`,  categorydto, { headers: { "Authorization" : `Bearer ${token}` } },{ withCredentials: true });
export const getAllPodcastCategories = async () => await API.get(`/podcast-categories`, { headers: { "Authorization" : `Bearer ${token}` }});

export const updatePodcastCategory = async (categorydto,token) => await API.post(`/podcast-categories`,  categorydto, { headers: { "Authorization" : `Bearer ${token}` } },{ withCredentials: true });
export const getPodcastCategoryById = async (categoryId,token) => await API.post(`/podcast-categories/${categoryId}`, { headers: { "Authorization" : `Bearer ${token}` } },{ withCredentials: true });

//podcast api
export const createAPodcast = async (podcast,token) => await API.post('/podcasts', podcast, { headers: { "Authorization" : `Bearer ${token}` } },{ withCredentials: true });
export const editPodcast = async (podcast,token) => await API.post('/podcasts', podcast, { headers: { "Authorization" : `Bearer ${token}` } },{ withCredentials: true });
export const getAPodcasts = async () => await API.get('/podcasts');
export const searchPodcastByName = async (search) => await API.get(`/podcasts/search?title=${search}`);
export const findPodcastById = async (id) => await API.get(`/podcasts/${id}`);
export const deletePodcast = async (id) => await API.delete(`/podcasts/${id}`);

//fovorite podcast api
export const addPodcastToFavorite = async (podcastId) => await API.post(`/likes/${podcastId}`);
export const getFavoritePodcast = async (id,token) => await API.get(`/likes/favorite`,{id: id}, { headers: { "Authorization" : `Bearer ${token}` } },{ withCredentials: true });

//episode api
export const addEpisodesToPodcast = async (episodeDto,token) => await API.post('/podcasts/episodes', episodeDto, { headers: { "Authorization" : `Bearer ${token}` } },{ withCredentials: true });
export const updateEpisode = async (episodeDto,token) => await API.post('/podcasts/episodes', episodeDto, { headers: { "Authorization" : `Bearer ${token}` } },{ withCredentials: true });
export const getAllEpisodes = async () => await API.get(`/podcasts/episodes/all`);
export const getAllEpisodesByPodcatsId = async (podcastId) => await API.get(`/podcasts/episodes?podcastId=${podcastId}`);
export const getEpisodeByEpisodeId = async (episodeId) => await API.get(`/podcasts/episodes/${episodeId}`);
export const deleteEpisode = async (id) => await API.delete(`/podcasts/episodes/${id}`);


// comment api
export const adComment = async (podcastId) => await API.post(`/comments/add/${podcastId}`);
export const deleteComment = async (commentId) => await API.post(`comments/delete/${commentId}`);
export const getCommentById = async (podcastId) => await API.get(`/comments/${podcastId}`);
// export const deleteEpisodeById = async (episodeId) => await API.post(`/episodes/${episodeId}/delete`);

// podcast views api
export const addAView = async () => await API.post('/episodes/create/');
export const getAllView = async () => await API.get(`/episodes/all`);
export const getEpisodeById = async (episodeId) => await API.get(`/episodes/${episodeId}`);
export const deleteEpisodeById = async (episodeId) => await API.delete(`/episodes/${episodeId}/delete`);

//user api
export const signInUser = async ({ email, password }) => await API.post('/auth/signin', { email, password });
export const signUpUser = async ({ name, email,password,}) => await API.post('/auth/signup', { name, email,password,
});
export const signUpAdmin = async ({ name, email,password,}) => await API.post('/auth/signup', { name, email,password,
});
export const verifyUser = async (token) => await API.get(`/auth/verify?token=${token}`);
export const logout = async () => await API.delete(`/auth/logout`);
export const forgotPassword = async (userDto) => await API.post(`/auth/forgot-password`, userDto);
export const editUserDetails = async (userDto,token) => await API.post('/auth/edit', userDto, { headers: { "Authorization" : `Bearer ${token}` } },{ withCredentials: true });
export const generateNewToken = async (token) => await API.get(`/auth/resend-verify?token=${token}`);
export const resetUserPassword = async (token, resetPasswordDto) => await API.put(`/auth/reset-password?token=${token}`,resetPasswordDto);
export const updatePassword = async (updatePasswordDto) => await API.put(`/auth/update`,updatePasswordDto);
export const searchAUsers = async (search,token) => await API.get(`users/search/${search}`,{ headers: { "Authorization" : `Bearer ${token}` }},{ withCredentials: true });
export const deleteUser = async (userId) => await API.get(`auth/${userId}`,{ headers: { "Authorization" : `Bearer ${token}` }},{ withCredentials: true });
export const getAllUser = async () => await API.get('/auth/getAll')
