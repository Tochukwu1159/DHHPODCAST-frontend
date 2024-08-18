import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryClient } from "..";
import { axiosInstance } from "./index1"; 

export function useGetAllComments() {
    return useQuery({
        queryKey: ['podcast-comment'],
        queryFn: function () {
            return axiosInstance.get('/comments/all')
                .then(response => response.data);
        }
    });
}

export function useGetPodcastCategories(commentId) {
    return useQuery({
        queryKey: ['podcast-categories', commentId],
        queryFn: function () {
            return axiosInstance.get(`/comments/add/${commentId}`)
                .then(response => response.data);
        }
    });
}

export function useCreateEpisode(params) {
    return useMutation({
        mutationFn: (payload) => axiosInstance.post(`/comments/add/${params}`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
        onSuccess: function () {
            toast.success('Rate added successfully');
        },
        onError: function (error) {
            // Handle error
            console.log('Error:', error);
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["podcast-comment"] });
        },
    });
}

export function useUpdateEpisode(params) {
    return useMutation({
        mutationFn: (payload) => axiosInstance.put(`/comments/add/${params}`, { ...payload, content: payload.content }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
        onSuccess: function () {
            toast.success('Rate updated successfully');
        },
        onError: function (error) {
            console.log('Error:', error);
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["podcast-comment"] });
        },
    });
}

export function useDeleteCommentById() {
    return useMutation(
        (id) => axiosInstance.delete(`/comments/delete${id}`),
        {
            onSuccess: function () {
                // Handle success
            },
            onError: function (error) {
                // Handle error
                console.log('Error:', error);
            },
            onSettled: function () {
                queryClient.invalidateQueries(["podcast-comment"]);
            },
        }
    );
}
