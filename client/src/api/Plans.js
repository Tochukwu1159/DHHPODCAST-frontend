import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./index1";
import toast from 'react-hot-toast';
import { queryClient } from "..";

export function useGetAllPlans() {
    return useQuery({
        queryKey: ['all_plans'],
        queryFn: () => axiosInstance.get('/subcription-group')
            .then(response => response.data)
    });
}

export function useCreatePlan() {
    return useMutation({
        mutationFn: (payload) => axiosInstance.post('/subcription-group', payload),
        onSuccess: () => {
            toast.success('Plan added successfully');
            queryClient.invalidateQueries({ queryKey: ["all_plans"] });
        },
        onError: (error) => {
            console.log('Error:', error);
        }
    });
}

export function useUpdatePlan(params) {
    return useMutation({
        mutationFn: (payload) => axiosInstance.put(`/subscription-plans?id=${params}`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
        onSuccess: () => {
            toast.success('Plan updated successfully');
            queryClient.invalidateQueries({ queryKey: ["all_plans"] });
        },
        onError: (error) => {
            console.log('Error:', error);
        }
    });
}

export function useDeletePlanById() {
    return useMutation({
        mutationFn: (id) => axiosInstance.delete(`/subscription-plans/${id}`),
        onSuccess: () => {
            toast.success('Plan deleted successfully');
            queryClient.invalidateQueries(["all_plans"]);
        },
        onError: (error) => {
            console.log('Error:', error);
        }
    });
}
