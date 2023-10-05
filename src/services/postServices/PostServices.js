import axios from 'axios';

function getAllProducts() {
    return axios.get('/posts').then(response => {
       return response.data;
   }).catch(error => {
       console.log(error)
   })
    
  } 



  export default getAllProducts;