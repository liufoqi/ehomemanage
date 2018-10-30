import axios from 'axios';
const env =process.env.NODE_ENV;
let baseURL = env ==='development'?'/api':'/';
const instance = axios.create({
  baseURL,
  timeout:3600000
});
const xhr={
  fetch(url,data,config,method){
    return new Promise((resolve,reject)=>{
      instance[method](url,data,config).then(res=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })

    })
  },
  post(url,data,config){
    return this.fetch(url,data,config,'post')
  },
  patch(url,data,config){
    return this.fetch(url,data,config,'patch')
  },
   delete(url,data,config){
    return this.fetch(url,data,config,'delete')
  },
  get(url,data,config){
    return new Promise((resolve,reject)=>{
      instance.get(url,{params:data},config).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  }
};
export default xhr
