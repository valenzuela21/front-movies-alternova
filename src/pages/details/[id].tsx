import Layout from "@/layout/layout";
import clientAxios from '../../config/axios';
import Image from 'next/image';
import {useEffect, useState} from "react";

export async function getServerSideProps({params}: any) {

    const {id} = params;
    const result = await clientAxios.get(`/api/movies/detail/${id}`);
    return {
        props: {
            movie: result.data.movie
        }
    };
}


const Details = ({movie}: any) => {

    const [idUser, setIdUser]: any = useState('');
    const [getVote, setVote]: any = useState({});

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        if(typeof(Storage) !== "undefined"){
            let _idUser = localStorage.getItem('userID');
            setIdUser(_idUser);
            let sessionUser = await clientAxios.get(`/api/auth/user/${_idUser}`);
            const {_id, score} = sessionUser.data.user.vote;
            setVote({_id, score});
        }
    }

    const actionVoteHandler = async (idUser: string | null, idVote: string, idMovie: string, vote: number) => {
        let newVote = {
            "user": idUser,
            "score": [{
                "movie": idMovie,
                "vote": vote
            }]
        };

        await clientAxios.post(`api/vote/add/${idVote}`, newVote);
    }

    return (<>
        <Layout>
            <section className="bg-white dark:bg-gray-900">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                            {movie.name}
                        </h1>
                        <p className="py-5 text-gray-500"><strong>Genero:</strong> {movie.gender}
                            <strong>Tipo:</strong> {movie.type} </p>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">From
                            checkout to global sales tax compliance, companies around the world use Flowbite to simplify
                            their payment stack.</p>
                        <section className="bg-white dark:bg-gray-900">
                            <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                                <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-2 dark:text-white">
                                    <div className="block items-center justify-center">

                                        {!getVote?.score?.find((item: any) => item.movie == movie._id) ? (
                                            <>
                                                <h2 className="mb-2 text-2xl md:text-2xl font-extrabold">Calificar</h2>
                                                <button type="button"
                                                        onClick={()=>actionVoteHandler(idUser, getVote._id, movie._id, 1)}
                                                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">1
                                                </button>
                                                <button type="button"
                                                        onClick={()=>actionVoteHandler(idUser, getVote._id, movie._id, 2)}
                                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">2
                                                </button>
                                                <button type="button"
                                                        onClick={()=>actionVoteHandler(idUser, getVote._id, movie._id, 3)}
                                                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">3
                                                </button>
                                                <button type="button"
                                                        onClick={()=>actionVoteHandler(idUser, getVote._id, movie._id, 4)}
                                                        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">4
                                                </button>
                                                <button type="button"
                                                        onClick={()=>actionVoteHandler(idUser, getVote._id, movie._id, 5)}
                                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">5
                                                </button>
                                            </>
                                        ) : (
                                            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">YA VOTASTE</dt>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <dt className="mb-2 text-3xl md:text-4xl font-extrabold">4M+</dt>
                                        <dd className="font-light text-gray-500 dark:text-gray-400">Puntaje</dd>
                                    </div>
                                </dl>
                            </div>
                        </section>
                    </div>
                    <div className="lg:mt-0 lg:col-span-5 lg:flex">
                        <img src={movie.image} alt={movie.name}/>
                    </div>
                </div>
            </section>
        </Layout>
    </>)
}

export default Details;