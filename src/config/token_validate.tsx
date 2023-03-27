import clientAxios from './axios';
const tokenValidate = (token: string) => {
    if(token){
        clientAxios.defaults.headers.common['x-token'] = token;
    }else{
        delete clientAxios.defaults.headers.common['x-token']
    }
}
export default tokenValidate;