import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./index1"; 
import toast from "react-hot-toast";
import { queryClient } from "..";

export function useAllGetPodcast() {
    return useQuery({
        queryKey: ['all-podcast'],
        queryFn: async () => {
            const result = await axiosInstance.get('podcasts');
            return result.data;
        }
    });
}

export function useGetPodcastByName(title) {
    return useQuery({
        queryKey: ['podcast-By-name', title],
        queryFn: async () => {
            const result = await axiosInstance.get(`podcast-categories/search/${title}`);
            return result.data;
        }
    });
}

export function useGetPodcastByTitle(title) {
    return useQuery({
        queryKey: ['podcast-By-title', title],
        queryFn: async () => {
            const result = await axiosInstance.get(`podcasts/search?title=${title}`);
            return result.data;
        }
    });
}

export function useGetPodcastById(id) {
    return useQuery({
        queryKey: ['podcast-ById', id],
        queryFn: async () => {
            const result = await axiosInstance.get(`podcast-categories/${id}`);
            return result.data;
        }
    });
}

export function useCreatePodcast() {
    return useMutation({
        mutationFn: async (payload) => {
            const formData = new FormData();
            for (const key in payload) {
                formData.append(key, payload[key]);
            }
            const result = await axiosInstance.post('podcasts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return result.data;
        },
        onSuccess: () => {
            toast.success('Podcast added successfully');
        },
        onError: (error) => {
            console.log('Error:', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['all-podcast']);
        }
    });
}

export function useUpdatePodcast(id) {
    return useMutation({
        mutationFn: async (payload) => {
            const formData = new FormData();
            for (const key in payload) {
                formData.append(key, payload[key]);
            }
            const result = await axiosInstance.put(`podcasts/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return result.data;
        },
        onSuccess: () => {
            toast.success('Podcast updated successfully');
        },
        onError: (error) => {
            console.log('Error:', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['all-podcast']);
        }
    });
}

export function useDeletePodcastById() {
    return useMutation({
        mutationFn: async (id) => {
            await axiosInstance.delete(`podcasts/${id}`);
        },
        onSuccess: () => {
            toast.success('Podcast deleted successfully');
        },
        onError: (error) => {
            console.log('Error:', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['all-podcast']);
        }
    });
}
