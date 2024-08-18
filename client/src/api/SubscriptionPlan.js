import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./index1";
import toast from "react-hot-toast";
import { queryClient } from "..";

// Fetch all subscriptions
export function useGetAllSubscription() {
    return useQuery({
        queryKey: ['all_Subscriptions'],
        queryFn: async () => {
            const result = await axiosInstance.get('/podcast/subscription-plans/all');
            return result.data;
        }
    });
}

// Create a new subscription
export function useCreateSubscription() {
    return useMutation({
        mutationFn: async (payload) => {
            await axiosInstance.post('/podcast/subscription-plans', payload);
        },
        onSuccess: () => {
            toast.success('Subscription added successfully');
        },
        onError: (error) => {
            console.error('Error creating subscription:', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['all_Subscriptions']);
        }
    });
}

// Update a subscription
export function useUpdateSubscription(params) {
    return useMutation({
        mutationFn: async (payload) => {
            await axiosInstance.put(`/podcast/subscription-plans?idOrCode=${params}`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        },
        onSuccess: () => {
            toast.success('Subscription updated successfully');
        },
        onError: (error) => {
            console.error('Error updating subscription:', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['all_Subscriptions']);
        }
    });
}

// Delete a subscription by ID
export function useDeleteSubscriptionById() {
    return useMutation({
        mutationFn: async (id) => {
            await axiosInstance.delete(`/podcast/subscription-plans/${id}`);
        },
        onSuccess: () => {
            toast.success('Subscription deleted successfully');
        },
        onError: (error) => {
            console.error('Error deleting subscription:', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['all_Subscriptions']);
        }
    });
}
