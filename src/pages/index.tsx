import {useEffect, useState} from "react";
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/layout/layout';
import Banner from '@/components/banner';
import clientAxios from '../config/axios';

import * as yup from 'yup';
import {useFormik} from 'formik';

export default function Home() {
    const [getMovies, setMovies] = useState([]);

    useEffect(() => {
        getAllMovies();
    }, []);
    
    const formik = useFormik({
        initialValues: {
            term: '',
        },
        validationSchema: yup.object({
            term: yup.string().required('Ingresa el termino de la busqueda...'),
        }),
        onSubmit: async (values) => await getSearchMovies(values.term)
    })

    async function getAllMovies() {
        const response = await clientAxios.get('/api/movies');
        const {movies} = response.data;
        setMovies(movies);
    }

    async function getSearchMovies(term: string) {
        const response = await clientAxios.get(`/api/search/name/${term}`);
        setMovies(response.data.results);
    }

    async function getSearchGender(term: string) {
        const response = await clientAxios.get(`/api/search/gender/${term}`);
        setMovies(response.data.results);
    }



    return (
        <>
        <Layout>
            <div className="flex justify-center">
                <div className="max-w-screen-md m-auto">
                    <form onSubmit={formik.handleSubmit} autoComplete="false">
                        <label htmlFor="default-search"
                               className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input type="search" id="default-search"
                                   className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Shazam"
                                   name="term"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.term}
                            />
                            <button type="submit"
                                    className="text-white absolute right-2.5 bottom-2.5 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2 dark:focus:ring-yellow-900">Buscar
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
                        <button type="button"
                                className="text-yellow-700 hover:text-yellow border border-yellow-600 bg-white hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:border-yellow-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-yellow-500 dark:bg-gray-900 dark:focus:ring-yellow-800"
                                onClick={getAllMovies}>
                            Todas Categorias
                        </button>
                        <button type="button"
                                className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
                                onClick={() => getSearchGender('action')}> Accion
                        </button>
                        <button type="button"
                                className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
                                onClick={() => getSearchGender('terror')}> Terror
                        </button>
                        <button type="button"
                                className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
                                onClick={() => getSearchGender('suspense')}> Suspenso
                        </button>
                        <button type="button"
                                className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
                                onClick={() => getSearchGender('fantasy')}> Fantasia
                        </button>
                        <button type="button"
                                className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center mr-3 mb-3 dark:text-white dark:focus:ring-gray-800"
                                onClick={() => getSearchGender('romantic')}> Romance
                        </button>
                    </div>
                    {getMovies.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {getMovies.map((movie: any, index: number) => {
                                return (
                                    <div key={index}>
                                        <Link href={`/details/${movie._id}`}>
                                            <img className="h-auto max-w-full rounded-lg"
                                                 src={movie.image} alt={movie.name}/>
                                            <p className="text-base text-gray-900 text-center py-3">{movie.name}</p>
                                        </Link>
                                    </div>
                                );
                            })}
                </div>
                ):null}
            </div>
        </div>
        <Banner/>
        </Layout>
</>
)
}
