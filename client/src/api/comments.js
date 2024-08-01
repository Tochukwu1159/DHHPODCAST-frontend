import axios from "axios";
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { axiosInstance } from "./index1";
import toast from "react-hot-toast";
import { queryClient } from "..";
import { token } from "./index1";

export function useGetAllComments() {
    return useQuery({
        queryKey: ['podcast-comment'],
        queryFn: function () {
            const result = axios.get('http://localhost:8081/api/v1/podcasts/comments/all', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            return result.then(response => response.data);
        }
    });
}

export function useGetPodcastCategories() {
    return useQuery({
        queryKey: ['podcast-comment'],
        queryFn: function (commentId) {
            const result = axios.get(`http://localhost:8081/api/v1/podcasts/comments/add/${commentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('result', result);
            return result.then(response => response.data);
        }
    });
}

export function useCreateEpisode(params) {
    return useMutation({
        mutationFn: (payload) => axios.post(`http://localhost:8081/api/v1/podcasts/comments/add/${params}`, payload, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'     
            }
        }),
        onSuccess: function () {
            toast.success('Rate added successfully');
        },
        onError: function (error) {
            // console.log('there is error', error)
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["podcast-comment"] });
        },
    });
}

export function useUpdateEpisode(params) {
    return useMutation({
        mutationFn: (payload) => axios.put(`http://localhost:8081/api/v1/podcasts/comments/add/${params}`,

        { ...payload,
             content:payload.content
            }, {
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
            queryClient.invalidateQueries({ queryKey: ["podcast-comment"] });
        },
    });
}


export function useDeleteCommentById() {
    return useMutation(
      (id) =>
        axiosInstance.delete(`http://localhost:8081/api/v1/podcasts/comments/delete${id}`),
      {
        onSuccess: function (data) {
        //   showNotification({
        //     title: "Operation successful",
        //     message: "User List deleted successfully",
        //     color: "green",
        //   });
        },
        onError: function (data) {
          const response = data.response?.data;
        //   showNotification({
        //     message: response?.detail || "Unable to delete comment ",
        //     color: "red",
        //   });
        },
        onSettled: function () {
          queryClient.invalidateQueries(["podcast-comment"]);
        },
      }
    );
  }


      
