import React, {useCallback, useState} from 'react'
import axios from 'axios'
import { UserType } from '@/types/common'

export const useGetAllUsers = () => {
    const [users, setUsers] = useState<UserType[]>([])

    const getAllUsers = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
                    headers: { token },
                });
                const filteredUsers = response.data.data.result.filter((user: UserType) => user.role !== "superAdmin");
                setUsers(filteredUsers);
                return response.data.data.result;
            } catch (err) {
                console.error(err);
            }
        }
    }, []); 

    return { users, getAllUsers }
}

export default useGetAllUsers
