import axios from "axios";

const API_URL = "http://localhost:8000/";
const RESOURCE = "task";

export const fechTasks = async() => {
  try{
    const tasks = await axios.get(`${API_URL}${RESOURCE}`);
    return tasks.data;
  }catch(error){
    console.log(error);
  }
}

export const postTask = async(task) => {
  try{
    //La lógica para hacer una solicitud/petición de tipo POST
    const response = await axios({
      url: `${API_URL}${RESOURCE}`,
      method: 'post',
      headers: {
        'Content-Type': 'text/plain'
      },
      data: task
    });
    return response;
  }catch(error){
    console.log(error);
  }
}

export const completeTask = async(id, task) => {
  try{
    const data = {...task, completed: true};
    //La lógica para hacer una solicitud/petición de tipo PUT
    // const response = await axios({
    //   url: `${API_URL}${RESOURCE}/${id}`,
    //   method: 'put',
    //   data: data
    // });
    const response = await axios.put(`${API_URL}${RESOURCE}/${id}`,data);
    console.log('response -->', response.data);
    return response.data;
  }catch(error){
    console.log(error);
  }
}