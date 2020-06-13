import axios from 'axios';

import * as t from './constants';

export function getNewsHeadlines(country = "in") {

    return(dispatch) => {
        dispatch({type: t.RETRIEVING_HEADLINES});

        return new Promise((resolve,reject) => {
            const url= '${t.API_URL}country=${country}&apiKey=${t.API_KEY}&pageSize=20';

            
/*axios.interceptors.request.use(config => {
            // log a message before any HTTP request is sent
            console.log('Request was sent');
          
            return config;
          });  
         const resp= axios.interceptors.response.use((response) => {
            // Do something with response data
            console.log('Response was sent');

            return response;
          },
           (error) => {
            // Do something with response error
//console.log('error');

            console.log( Promise.reject(error));
            throw error;
          });    
          console.log(resp); */  
            axios.get(url)
                .then(res => res.data)
                .then((data) => {
                    dispatch({type: t.HEADLINES_AVAILABLE, data})
                    console.log(data);
                    resolve()
                })

                .catch(error => {
                    dispatch({type: t.HEADLINES_ERROR, error})
                    console.log('inside');
                    console.log(error);
                    reject()
                });
        })
    }

}

export function getHeadlinesBySource(source) {
    return(dispatch) => {
        dispatch({type: t.RETRIEVING_HEADLINES});
        return new Promise((resolve,reject) => {
            const url= '${t.API_URL}source=${source}&apiKey=${t.API_KEY}&pageSize=20';
            axios.get(url)
                .then(res => res.data)
                .then((data) => resolve(data))
                .catch(error => reject(error));
                })
    };
}