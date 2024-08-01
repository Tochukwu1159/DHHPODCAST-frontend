import axios from "axios";
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { axiosInstance } from "./index1";
import toast from "react-hot-toast";
import { queryClient } from "..";

import { token } from "./index1";

export function useAllGetPodcast() {
    return useQuery({
        queryKey: ['all-podcast'],
        queryFn: function () {
            const result = axios.get('http://localhost:8081/api/v1/podcasts', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            return result.then(response => response.data);
        }
    });
}
export function useGetPodcastByName(title) {
    return useQuery({
        queryKey: ['podcast-By-name'],
        queryFn: function () {
            const result = axios.get(`http://localhost:8081/api/v1/podcast-categories/search/${title}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
         
            return result.then(response => response.data);
        }
    });
}

export function useGetPodcastByTitle(title) {
    return useQuery({
        queryKey: ['podcast-By-title'],
        queryFn: function () {
            const result = axios.get(`http://localhost:8081/api/v1/podcasts/search?title=${title}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
          
            return result.then(response => response.data);
        }
    });
}

export function useGetPodcastById(id) {
    return useQuery({
        queryKey: ['podcast-ById'],
        queryFn: function () {
            const result = axios.get(`http://localhost:8081/api/v1/podcast-categories/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
           
            return result.then(response => response.data);
        }
    });
}

export function useCreatePodcast() {
    return useMutation({
        mutationFn: (payload) => axios.post('http://localhost:8081/api/v1/podcasts', payload, {
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
            queryClient.invalidateQueries({ queryKey: ["podcast-categories"] });
        },
    });
}

//params
export function useUpdatePodcast(params) {
    return useMutation({
        mutationFn: (payload) => axios.put(`http://localhost:8081/api/v1/podcasts/${params}`,

        { ...payload,
    
             imageFile:payload.imageFile,
             title:payload.title,
             description:payload.description,
             categoryId:payload.categoryId

            }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'     
            }
        }),
        onSuccess: function () {
            toast.success('Podcast  updated successfully');
        },
        onError: function (error) {
            console.log('there is error', error)
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["all-podcast"] });
        },
    });
}

export function useDeletePlanById() {
    return useMutation(
      (id) =>
        axiosInstance.delete(`http://localhost:8081/api/v1/podcasts/${id}`),
      {
        onSuccess: function (data) {
        //   showNotification({
        //     title: "Operation successful",
        //     message: "Podcast deleted successfully",
        //     color: "green",
        //   });
        },
        onError: function (data) {
          const response = data.response?.data;
        //   showNotification({
        //     message: response?.detail || "Unable to delete Podcast ",
        //     color: "red",
        //   });
        },
        onSettled: function () {
          queryClient.invalidateQueries(["all-podcast"]);
        },
      }
    );
  }

