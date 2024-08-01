import axios from "axios";
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { axiosInstance } from "./index1";
import toast from "react-hot-toast";
import { queryClient } from "..";
import { token } from "./index1";


export function useGetAllPlans() {
    return useQuery({
        queryKey: ['all_plans'],
        queryFn: function () {
            const result = axios.get('http://localhost:8081/api/v1/subcription-group', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
   
            return result.then(response => response.data);
        }
    });
}

export function useCreatePlan() {
    return useMutation({
        mutationFn: (payload) => axios.post('http://localhost:8081/api/v1/subcription-group', payload, {
            headers: {
                'Authorization': `Bearer ${token}`,
                    
            }
        }),
        onSuccess: function () {
            toast.success('Plan added successfully');
        },
        onError: function (error) {
            console.log('there is error', error)
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["all_plans"] });
        },
    });
}

//PARAM
export function useUpdatePlan(params) {
    return useMutation({
        mutationFn: (payload) => axios.put(`http://localhost:8081/api/v1/subscription-plans?id=${params}`,

        { ...payload,
             content:payload.content
            }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'     
            }
        }),
        onSuccess: function () {
            toast.success('Plan  added successfully');
        },
        onError: function (error) {
            console.log('there is error', error)
            // toast.error(errordata.)
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["all_plans"] });
        },
    });
}

export function useDeletePlanById() {
    return useMutation(
      (id) =>
        axiosInstance.delete(`http://localhost:8081/api/v1/subscription-plans/${id}`),
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
        //     message: response?.detail || "Unable to delete plan ",
        //     color: "red",
        //   });
        },
        onSettled: function () {
          queryClient.invalidateQueries(["all_plans"]);
        },
      }
    );
  }

