import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./index1";
import toast from "react-hot-toast";
import { queryClient } from "..";

// Fetch all podcast views
export function useGetAllPodcastView() {
    return useQuery({
        queryKey: ['podcast-view'],
        queryFn: async () => {
            const result = await axiosInstance.get('/podcast-views');
            return result.data;
        }
    });
}

// Create a new podcast view
export function useCreatePodcastView(podcastId) {
    return useMutation({
        mutationFn: async () => {
            await axiosInstance.post(`/podcast-views/${podcastId}`);
        },
        onSuccess: () => {
            toast.success('Podcast view added successfully');
        },
        onError: (error) => {
            console.error('Error creating podcast view:', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['podcast-view']);
        }
    });
}

// Fetch a podcast view by ID
export function useGetPodcastViewById(id) {
    return useQuery({
        queryKey: ['podcast-view', id],
        queryFn: async () => {
            const result = await axiosInstance.get(`/podcast-views/${id}`);
            return result.data;
        }
    });
}

// Update a podcast view
export function useUpdatePodcastView(id) {
    return useMutation({
        mutationFn: async (payload) => {
            await axiosInstance.put(`/podcast-views/${id}`, {
                ...payload,
                podcastId: payload.podcastId,
                views: payload.views
            });
        },
        onSuccess: () => {
            toast.success('Podcast view updated successfully');
        },
        onError: (error) => {
            console.error('Error updating podcast view:', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['podcast-view']);
        }
    });
}

// Delete a podcast view by ID
export function useDeletePodcastViewById() {
    return useMutation({
        mutationFn: async (id) => {
            await axiosInstance.delete(`/podcast-views/${id}`);
        },
        onSuccess: () => {
            toast.success('Podcast view deleted successfully');
        },
        onError: (error) => {
            console.error('Error deleting podcast view:', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['podcast-view']);
        }
    });
}
