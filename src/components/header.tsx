import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import logo from './../../public/static/images/logo-dark.png';
import tokenValidate from '@/config/token_validate';
import clientAxios from '@/config/axios';
import {Button, Dropdown} from 'flowbite-react';

const Header = () => {
    const router = useRouter();
    const [getDropDrown, setDropDown] = useState<boolean>(false);
    const [getUser, setUser] = useState<{email: string, name: string}>();
    
    useEffect(() => {
        validateToken()
    }, []);

    async function validateToken() {
        const token = localStorage.getItem('x-token');
        if (token) {
            tokenValidate(token);
        }

        try {
            const response = await clientAxios.get('/api/auth');
            if (response.data.user) {
                setUser(response.data.user);
            }
        } catch (error) {
            router.push('/login');
        }
    }

    const closeSession = () => {
        localStorage.removeItem('x-token');
        router.push('/login');
    }

    const actionDropDown = () => {
        setDropDown(!getDropDrown);
    }

    return (
        <>

            <div className="flex justify-between py-4 px-4">
                <div className="w-20">
                    <Link
                    href="/"
                    ><Image src={logo} alt='logo-app'></Image></Link>
                </div>
                <div></div>
                <div>
                    <button
                        onClick={actionDropDown}
                        className="text-black bg-transparent focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center "
                        type="button">
                        <div className="block text-right">
                        <p>{getUser?.name}</p>
                        <p>{getUser?.email}</p>
                        </div>
                        <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none"
                             stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>

                    {getDropDrown?(
                        <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-64">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                <li>
                                    <a onClick={closeSession}
                                       className="block px-4 py-2 hover:bg-gray-100 hover:cursor-pointer"
                                    >
                                        Cerrar Sesión
                                    </a>
                                </li>
                            </ul>
                        </div>
                    ):null}

                </div>
            </div>
        </>
    )
}

export default Header;