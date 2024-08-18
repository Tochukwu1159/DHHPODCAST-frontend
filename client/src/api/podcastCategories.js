import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./index1";
import toast from "react-hot-toast";
import { queryClient } from "..";
import { showNotification } from "@mantine/notifications";

// Fetch all podcast categories
export function useGetPodcastCategories() {
    return useQuery({
        queryKey: ["podcast-categories"],
        queryFn: async () => {
            const result = await axiosInstance.get("/podcast-categories");
            return result.data;
        }
    });
}

// Create a new podcast category
export function useCreatePodcastCategories() {
    return useMutation({
        mutationFn: async (payload) => {
            const formData = new FormData();
            for (const key in payload) {
                formData.append(key, payload[key]);
            }
            const result = await axiosInstance.post('/podcast-categories', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return result.data;
        },
        onSuccess: () => {
            showNotification({
                title: "Operation Successful",
                message: "Podcast Category created successfully!",
                color: "green"
            });
        },
        onError: (error) => {
            showNotification({
                title: "An error occurred",
                message: "Unable to create podcast category",
                color: "red"
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries(["podcast-categories"]);
        }
    });
}

// Fetch podcast category by ID
export function useGetPodcastCategoryById(id) {
    return useQuery({
        queryKey: ['podcast-categories', id],
        queryFn: async () => {
            const result = await axiosInstance.get(`/podcast-categories/single/${id}`);
            return result.data;
        }
    });
}

// Fetch podcasts by category name
export function useGetPodcastByCategoryName(name) {
    return useQuery({
        queryKey: ['podcast-category', name],
        queryFn: async () => {
            const result = await axiosInstance.get(`/podcasts/category?name=${name}`);
            return result.data;
        }
    });
}

// Update a podcast category
export function useUpdatePodcastCategory(id) {
    return useMutation({
        mutationFn: async (payload) => {
            const formData = new FormData();
            for (const key in payload) {
                formData.append(key, payload[key]);
            }
            const result = await axiosInstance.put(`/podcast-categories/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return result.data;
        },
        onSuccess: () => {
            showNotification({
                title: "Operation Successful",
                message: "Podcast Category updated successfully!",
                color: "green"
            });
        },
        onError: (error) => {
            showNotification({
                title: "An error occurred",
                message: "Unable to update podcast category",
                color: "red"
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries(["podcast-categories"]);
        }
    });
}

// Delete a podcast category by ID
export function useDeletePodcastCategoryById() {
    return useMutation({
        mutationFn: async (id) => {
            await axiosInstance.delete(`/podcast-categories/${id}`);
        },
        onSuccess: () => {
            showNotification({
                title: "Operation Successful",
                message: "Podcast Category deleted successfully!",
                color: "green"
            });
        },
        onError: (error) => {
            const response = error.response?.data;
            showNotification({
                title: "An error occurred",
                message: response?.detail || "Unable to delete podcast category",
                color: "red"
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries(["podcast-categories"]);
        }
    });
}
