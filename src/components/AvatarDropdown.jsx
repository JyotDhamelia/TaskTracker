import React, { useState, useEffect, useRef } from 'react';
import { signOutUser, signInWithGoogle } from '../../firebaseconfig';
import { useNavigate } from 'react-router-dom';
import { PiSignInBold } from "react-icons/pi";
import { GiAstronautHelmet } from "react-icons/gi";

const AvatarDropdown = ({ user }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleSignOut = async () => {
        try {
            await signOutUser();
            navigate('/');
            setDropdownOpen(false);
        } catch (error) {
            console.error("Error during sign-out:", error);
        }
    };

    const handleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate('/dashboard');
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setDropdownOpen(false);
        console.log(user);
    }, [user]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={user ? toggleDropdown : handleSignIn}
                className="flex items-center text-white">
                {user && user.photoURL ? (
                    <img className="w-8 h-8 rounded-full" src={user.photoURL} alt="" />
                ) : (
                    <div className="flex gap-2 font-mono justify-between py-2 rounded-full text-indigo-700 border border-2 border-indigo-700 px-4 items-center transition ease-in-out delay-200 hover:text-white hover:border-indigo-500 hover:text-indigo-500">
                    <GiAstronautHelmet /> SignIn 
                  </div>
                )}
            </button>
            {user && dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="py-2">
                        <button
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvatarDropdown;
