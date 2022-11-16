import ApiClient from '../connection/ApiClient';

const getProject = async token => {
  return ApiClient.post(
    'project/get',
    {},
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

const editProject = async token => {
  return ApiClient.post(
    '',
    {},
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

const deleteProject = async (token, idProject) => {
  return ApiClient.put(
    'project/delete',
    {
      idProject: idProject,
    },
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

export default {
  getProject,
  deleteProject,
  editProject,
};
