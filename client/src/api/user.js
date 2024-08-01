import axios from "axios";
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { axiosInstance } from "./index1";
import toast from "react-hot-toast";
import { queryClient } from "..";
import { useNavigate } from 'react-router-dom';
import { token } from "./index1";

export function useGetAllUsers() {
    return useQuery({
        queryKey: ['user-profile'],
        queryFn: function () {
            const result = axios.get('http://localhost:8081/api/v1/users/getAll', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('result', result);
            return result.then(response => response.data);
        }
    });
}

export function useCreateUser() {
    return useMutation({
        mutationFn: (payload) => axios.post('http://localhost:8081/api/v1/users/admin', payload, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'     
            }
        }),
        onSuccess: function () {
            toast.success('Admin added successfully');
        },
        onError: function (error) {
            console.log('there is error', error)
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
        },
    });
}

export function useCreateAdmin() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (payload) => axios.post('http://localhost:8081/api/v1/users/subscriber', payload, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'     
            }
        }),
        onSuccess: function () {
            toast.success('User added successfully');
            navigate('/login');
        },
        onError: function (error) {
            console.log('there is error', error);
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
        },
    });
}

export function useLoginUser() {
    return useMutation({
        mutationFn: (payload) => axios.post('http://localhost:8081/api/v1/users/loginUser', payload),
        onSuccess: function (response) {
            const { user } = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            toast.success('User logged in successfully');
        },
        onError: function (error) {
            console.log('there is error', error);
            toast.error('Failed to log in');
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
        },
    });
}


export function useUpdateUser() {
    return useMutation({
        mutationFn: (payload) => axios.put(`http://localhost:8081/api/v1/users/edit`,

        { ...payload,
    
            firstName:payload.firstName,
            lastName:payload.lastName,
             phoneNumber:payload.phoneNumber

            }, {
            headers: {
                'Authorization': `Bearer ${token}`,   
            }
        }),
        onSuccess: function () {
            toast.success('User  updated successfully');
        },
        onError: function (error) {
            console.log('there is error', error)
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
        },
    });
}

export function useDeleteUser() {
    return useMutation({
      mutationFn: (userId) => axios.delete(`http://localhost:8081/api/v1/users/delete/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,  
        }
      }),
      onSuccess: function () {
        toast.success('User deleted successfully');
      },
      onError: function (error) {
        console.log('there is error', error);
        toast.error('Error deleting user');
      },
      onSettled: function () {
        queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      },
    });
  }

export function useResetPassword() {
    return useMutation({
        mutationFn: (payload) => axios.post('http://localhost:8081/api/v1/users/reset-password', payload, {
            headers: {
                'Authorization': `Bearer ${token}`,    
            }
        }),
        onSuccess: function () {
            toast.success('Password changed successfully');
        },
        onError: function (error) {
            console.log('there is error', error)
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
        },
    });
}

export function useResetPasswordWithoutToken() {
    return useMutation({
        mutationFn: (payload) => axios.post('http://localhost:8081/api/v1/users/reset-passwords', payload, {
            headers: {
                'Authorization': `Bearer ${token}`,    
            }
        }),
        onSuccess: function () {
            toast.success('Password changed successfully');
        },
        onError: function (error) {
            console.log('there is error', error)
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
        },
    });
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: (payload) => axios.post('http://localhost:8081/api/v1/users/forgot-password', payload, {
            headers: {
                'Authorization': `Bearer ${token}`,    
            }
        }),
        onSuccess: function () {
            toast.success('Email sent successfully, please check your email');
        },
        onError: function (error) {
            console.log('there is error', error)
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
        },
    });
}
//token as params
export function useGetVerifyAccount(token) {
    return useQuery({
        queryKey: ['verify-user'],
        queryFn: function () {
            const result = axios.get(`http://localhost:8081/api/v1/users/verify?token={token}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            console.log('result', result);
            return result.then(response => response.data);
        }
    });
}
//token as params
export function useGetResentVerify(token) {
    return useQuery({
        queryKey: ['verify-user'],
        queryFn: function () {
            const result = axios.get(`http://localhost:8081/api/v1/users/resend-verify?token={token}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            console.log('result', result);
            return result.then(response => response.data);
        }
    });
}
