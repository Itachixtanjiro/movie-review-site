import apiRequest from ".";
export const RegisterUser= async(payload)=>{
    return await apiRequest({
        method: "POST",
        endpoint:'http://localhost:5000/api/users/register',
        payload,
    });
};
export const LoginUser= async(payload)=>{
    return await apiRequest({
        method: "POST",
        endpoint:'http://localhost:5000/api/users/login',
        payload,
    });
};
export const GetCurrentUser = async()=>{
    return await apiRequest({
        method:"GET",
        endpoint:'http://localhost:5000/api/users/get-current-user',
    });
} 
