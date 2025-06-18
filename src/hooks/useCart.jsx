import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";



const useCart = () => {
   
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
   


    // tan stackquery
    const { refetch, isLoading, data : cart =[]} = useQuery({
        enabled: !!user?.email,
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cart/${user.email}`);
            return res.data;
        }
    })
    return [cart, refetch,isLoading]
};

export default  useCart;