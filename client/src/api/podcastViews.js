import axios from "axios";
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { axiosInstance } from "./index1";
import toast from "react-hot-toast";
import { queryClient } from "..";

import { token } from "./index1";

export function useGetAllPodcastView() {
    return useQuery({
        queryKey: ['podcast-view'],
        queryFn: function () {
            const result = axios.get('http://localhost:8081/api/v1/podcast-views', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('result', result);
            return result.then(response => response.data);
        }
    });
}

export function useCreatePodcastView(podcastId) {
    console.log('oppa')
    return useMutation({
        mutationFn: () => axios.post(`http://localhost:8081/api/v1/podcast-views/${podcastId}`,null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }),
        onSuccess: function () {
            toast.success('Podcast view added successfully');
        },
        onError: function (error) {
            console.log('there is error', error)
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["podcast-view"] });
        },
    });
}

export function useGetPodcastViewById(id) {
    return useQuery({
        queryKey: ['podcast-view', 'id'],
        queryFn: function () {
            const result = axios.get(`http://localhost:8081/api/v1/podcast-views/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('result', result);
            return result.then(response => response.data);
        }
    });
}

export function useUpdatePodcastView(params) {
    return useMutation({
        mutationFn: (payload) => axios.put(`http://localhost:8081/api/v1/podcast-views/${params}`,

        { ...payload,
    
            podcastId:payload.podcastId,
            views:payload.views

            }, {
            headers: {
                'Authorization': `Bearer ${token}`,   
            }
        }),
        onSuccess: function () {
            toast.success('Podcast view updated successfully');
        },
        onError: function (error) {
            console.log('there is error', error)
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["podcast-view"] });
        },
    });}


export function useDeletePodcastViewById() {
    return useMutation(
      (id) =>
        axiosInstance.delete(`http://localhost:8081/api/v1/podcast-views/${id}`),
      {
        onSuccess: function () {
        //   showNotification({
        //     title: "Operation successful",
        //     message: "Podcast view deleted successfully",
        //     color: "green",
        //   });
        },
        onError: function (data) {
          const response = data.response?.data;
        //   showNotification({
        //     message: response?.detail || "Unable to delete Podcast view ",
        //     color: "red",
        //   });
        },
        onSettled: function () {
          queryClient.invalidateQueries(['podcast-view']);
        },
      }
    );
  }
