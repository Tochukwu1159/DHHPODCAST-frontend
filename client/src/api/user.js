import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { queryClient } from "..";
import { useNavigate } from 'react-router-dom';
import { axiosInstance, token } from "./index1";

// Fetch all users
export function useGetAllUsers() {
    return useQuery({
        queryKey: ['user-profile'],
        queryFn: async () => {
            const result = await axiosInstance.get('/users/getAll');
            return result.data;
        }
    });
}

// Create a new admin user
export function useCreateUser() {
    return useMutation({
        mutationFn: async (payload) => {
            await axiosInstance.post('/users/admin', payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        },
        onSuccess: () => {
            toast.success('Admin added successfully');
        },
        onError: (error) => {
            console.error('Error adding admin:', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['user-profile']);
        }
    });
}

// Create a new regular user (subscriber)
export function useCreateAdmin() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (payload) => {
            await axiosInstance.post('/users/subscriber', payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        },
        onSuccess: () => {
            toast.success('User added successfully');
            navigate('/login');
        },
        onError: (error) => {
            console.error('Error adding user:', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['user-profile']);
        }
    });
}

// User login
export function useLoginUser() {
    return useMutation({
        mutationFn: async (payload) => {
            const result = await axiosInstance.post('/users/loginUser', payload);
            return result.data;
        },
        onSuccess: (response) => {
            const { user } = response;
            localStorage.setItem('user', JSON.stringify(user));
            toast.success('User logged in successfully');
        },
        onError: (error) => {
            console.error('Error logging in:', error);
            toast.error('Failed to log in');
        },
        onSettled: () => {
            queryClient.invalidateQueries(['user-profile']);
        }
    });
}

// Update user information
export function useUpdateUser() {
    return useMutation({
        mutationFn: async (payload) => {
            await axiosInstance.put('/users/edit', payload);
        },
        onSuccess: () => {
            toast.success('User updated successfully');
        },
        onError: (error) => {
            console.error('Error updating user:', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['user-profile']);
        }
    });
}

// Delete a user by ID
export function useDeleteUser() {
    return useMutation({
        mutationFn: async (userId) => {
            await axiosInstance.delete(`/users/delete/${userId}`);
        },
        onSuccess: () => {
            toast.success('User deleted successfully');
        },
        onError: (error) => {
            console.error('Error deleting user:', error);
            toast.error('Error deleting user');
        },
        onSettled: () => {
            queryClient.invalidateQueries(['user-profile']);
        }
    });
}

// Reset user password
export function useResetPassword() {
    return useMutation({
        mutationFn: async (payload) => {
            await axiosInstance.post('/users/reset-password', payload);
        },
        onSuccess: () => {
            toast.success('Password changed successfully');
        },
        onError: (error) => {
            console.error('Error resetting password:', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['user-profile']);
        }
    });
}

// Reset password without token
export function useResetPasswordWithoutToken() {
    return useMutation({
        mutationFn: async (payload) => {
            await axiosInstance.post('/users/reset-passwords', payload);
        },
        onSuccess: () => {
            toast.success('Password changed successfully');
        },
        onError: (error) => {
            console.error('Error resetting password:', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['user-profile']);
        }
    });
}

// Forgot password
export function useForgotPassword() {
    return useMutation({
        mutationFn: async (payload) => {
            await axiosInstance.post('/users/forgot-password', payload);
        },
        onSuccess: () => {
            toast.success('Email sent successfully, please check your email');
        },
        onError: (error) => {
            console.error('Error sending email:', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['user-profile']);
        }
    });
}

// Verify user account
export function useGetVerifyAccount(verifyToken) {
    return useQuery({
        queryKey: ['verify-user'],
        queryFn: async () => {
            const result = await axiosInstance.get(`/users/verify?token=${verifyToken}`);
            return result.data;
        }
    });
}

// Resend verification email
export function useGetResentVerify(verifyToken) {
    return useQuery({
        queryKey: ['resend-verify-user'],
        queryFn: async () => {
            const result = await axiosInstance.get(`/users/resend-verify?token=${verifyToken}`);
            return result.data;
        }
    });
}
