import axios from "axios";
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { axiosInstance } from "./index1";
import toast from 'react-hot-toast'
import { queryClient } from "..";
import { token } from "./index1";

export function useGetAllEpisodes() {
    return useQuery({
        queryKey: ['podcast-episodes'],
        queryFn: function () {
            const result = axios.get('http://localhost:8081/api/v1/podcast/episodes/all', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        
            return result.then(response => response.data);
        }
    });
}

export function useCreateEpisode() {
    return useMutation({
        mutationFn: (payload) => axios.post('http://localhost:8081/api/v1/podcast/episodes', payload, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'     
            }
        }),
        onSuccess: function () {
            toast.success('Rate added successfully');
        },
        onError: function (error) {
            console.log('there is error', error)
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["podcast-episodes"] });
        },
    });
}
export function useUpdateEpisode(episodeId) {
    return useMutation({
        mutationFn: (payload) => axios.put(`http://localhost:8081/api/v1/podcast/episodes?episodeId=${episodeId}update`,

        { ...payload,
             content:payload.content
            }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'     
            }
        }),
        onSuccess: function () {
            toast.success('Plan  added successfully');
        },
        onError: function (error) {
            console.log('there is error', error)
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["all_plans"] });
        },
    });
}

export function useGetEpisodesByPodcastId(podcastId) {
    return useQuery({
        queryKey: ['podcast-episodes'],
        queryFn: function () {
            const result = axios.get(`http://localhost:8081/api/v1/podcast/episodes?podcastId=${podcastId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            return result.then(response => response.data);
        }
    });
}

export function useDeleteCommentById() {
    return useMutation(
      (episodeId) =>
        axiosInstance.delete(`http://localhost:8081/api/v1/podcast/episodes/${episodeId}/delete`),
      {
        onSuccess: function (data) {
        //   showNotification({
        //     title: "Operation successful",
        //     message: "Episode deleted successfully",
        //     color: "green",
        //   });
        },
        onError: function (data) {
          const response = data.response?.data;
        //   showNotification({
        //     message: response?.detail || "Unable to delete episode ",
        //     color: "red",
        //   });
        },
        onSettled: function () {
          queryClient.invalidateQueries(["podcast-comment"]);
        },
      }
    );
  }


