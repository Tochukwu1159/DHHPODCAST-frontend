import { useMutation, useQuery } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import { queryClient } from "..";
import { axiosInstance } from "./index1"; // Import your axiosInstance

export function useGetAllEpisodes() {
    return useQuery({
        queryKey: ['podcast-episodes'],
        queryFn: function () {
            return axiosInstance.get('/episodes/all')
                .then(response => response.data);
        }
    });
}

export function useCreateEpisode() {
    return useMutation({
        mutationFn: (payload) => axiosInstance.post('/episodes', payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
        onSuccess: function () {
            toast.success('Episode added successfully');
        },
        onError: function (error) {
            console.log('Error:', error);
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["podcast-episodes"] });
        },
    });
}

export function useUpdateEpisode(episodeId) {
    return useMutation({
        mutationFn: (payload) => axiosInstance.put(`/episodes?episodeId=${episodeId}`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
        onSuccess: function () {
            toast.success('Episode updated successfully');
        },
        onError: function (error) {
            console.log('Error:', error);
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["podcast-episodes"] });
        },
    });
}

export function useGetEpisodesByPodcastId(podcastId) {
    return useQuery({
        queryKey: ['podcast-episodes', podcastId],
        queryFn: function () {
            return axiosInstance.get(`/episodes?podcastId=${podcastId}`)
                .then(response => response.data);
        }
    });
}

export function useDeleteEpisodeById() {
    return useMutation(
        (episodeId) => axiosInstance.delete(`/episodes/${episodeId}/delete`),
        {
            onSuccess: function () {
                toast.success('Episode deleted successfully');
            },
            onError: function (error) {
                console.log('Error:', error);
            },
            onSettled: function () {
                queryClient.invalidateQueries(["podcast-episodes"]);
            },
        }
    );
}
