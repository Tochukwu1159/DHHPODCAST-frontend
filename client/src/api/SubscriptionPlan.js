import axios from "axios";
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { axiosInstance } from "./index1";
import toast from "react-hot-toast";
import { queryClient } from "..";
import { token } from "./index1";


export function useGetAllSubscription() {
    return useQuery({
        queryKey: ['all_Subscriptions'],
        queryFn: function () {
            const result = axios.get('http://localhost:8081/api/v1/podcast/subscription-plans/all', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('result', result);
            return result.then(response => response.data);
        }
    });
}

export function useCreateSubscription() {
    return useMutation({
        mutationFn: (payload) => axios.post('http://localhost:8081//api/v1/podcast/subscription-plans', payload, {
            headers: {
                'Authorization': `Bearer ${token}`,
                    
            }
        }),
        onSuccess: function () {
            toast.success('Subscription added successfully');
        },
        onError: function (error) {
            console.log('there is error', error)
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["all_Subscriptions"] });
        },
    });
}

//PARAM
export function useUpdateSubscription(params) {
    return useMutation({
        mutationFn: (payload) => axios.put(`http://localhost:8081/api/v1/podcast/subscription-plans?idOrCode=${params}`,

        { ...payload,
             content:payload.content
            }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'     
            }
        }),
        onSuccess: function () {
            toast.success('Subscription  added successfully');
        },
        onError: function (error) {
            console.log('there is error', error)
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["all_Subscriptions"] });
        },
    });
}

export function useDeleteSubscriptionById() {
    return useMutation(
      (id) =>
        axiosInstance.delete(`http://localhost:8081/api/v1/subscription-Subscriptions/${id}`),
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
        //     message: response?.detail || "Unable to delete Subscription ",
        //     color: "red",
        //   });
        },
        onSettled: function () {
          queryClient.invalidateQueries(["all_Subscriptions"]);
        },
      }
    );
  }

