import io from 'socket.io-client';
import {useEffect, useState} from "react";

const Banner = () => {


    const connectSocketServer = () => {
        const socket = io('http://localhost:8080');
        return socket;
    }

    const [socket] = useState(connectSocketServer());
    const [banner, setBanner] =  useState<string>('https://i.pinimg.com/originals/9b/1c/ca/9b1ccafa179cac1ae7a3c5114bd6f1b8.png')
    
    useEffect(()=>{
        socket.on('connect', () => {
            console.log("Connect socket server")
        })
    },[socket])

    useEffect(() => {
        socket.on('send-movie-first', (banner: string) => {
            setBanner(banner)
        })
    },[socket])
    
    return(
        <>
            <div className="fixed bottom-0 flex justify-center w-full bg-white">
                <div className="w-20 p-2 text-center">
                <p className="p-3">Pelicula de la semana</p>
                <img  src={banner}  alt="publicidad" />
                </div>
            </div>
        </>
    )
}
export default Banner;