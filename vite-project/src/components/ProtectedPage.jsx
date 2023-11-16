import{message} from 'antd';
import React,{useEffect,useState} from 'react';
import {useNavigate} from "react-router-dom";
import {GetCurrentUser} from "../apis/users"; 
import {useDispatch} from "react-redux";
import { SetUser } from '../redux/userSlice';
import { useSelector } from 'react-redux';
import { SetLoading} from "../redux/loaderSlice";
 function ProtectedPage({children}) {
    const dispatch = useDispatch();
    const {user} = useSelector((state)=> state.users)|| {};
    const navigate= useNavigate();
    const getCurrentUser=async()=>{
        try {
            dispatch(SetLoading(true));
            const response=await GetCurrentUser();
            dispatch(SetLoading(false));
            dispatch(SetUser(response.data));
        } catch (error) {
            dispatch(SetLoading(false));
            message.error(error.message);
        }
    };
    useEffect(()=>{
        if(! localStorage.getItem("token")){
            navigate('/login'); 
        }
        else{
        getCurrentUser();
        }
    },[]);
    return(
        <div>
        <div className='"flex justify-between items-center bg-primary text-white p-5'>
            <span className='font-semibold text-orange-500 text-2xl cursor-pointer'
            onClick={()=> navigate('/')}>
                My Movie World
            </span>
            <div className='bg-secondary rounded px-5 py-2 w-8 flex gap-2 items-center'>
            <i className="ri-user-settings-fill bg-black" ></i>
                <span className='text-primary-200 text-sm cursor-pointer underline'
                onClick={()=> navigate('/profile')}>
                    {user?.name}
                </span>
                <i className="ri-logout-box-r-line ml-8"
                onClick={()=>{
                    localStorage.removeItem('token');
                    navigate('/login');
                }}></i>
            </div>
        </div>  
        
        <div className='p-5'>
            {children}
        </div>
        </div>
    );
 }
 export default ProtectedPage;