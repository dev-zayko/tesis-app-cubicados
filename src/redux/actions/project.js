import ProjectService from '../../services/projects/projectService';
import {GET_PROJECTS, SET_MESSAGE} from './type';
import utilityService from '../../services/utility/utilityService';

export const getProject = token => dispatch => {
  return ProjectService.getProject(token).then(
    response => {
      if (response.status === 'empty') {
        return Promise.resolve('empty');
      } else if (response.status === 'success') {
        dispatch({
          type: GET_PROJECTS,
          payload: {projects: response.data},
        });
        return Promise.resolve(response.data);
      }
    },
    error => {
      utilityService.errorMessage(error, dispatch).then(() => {
        return Promise.reject();
      });
    },
  );
};

export const editProject = token => dispatch => {
  return ProjectService.editProject(token).then(
    response => {},
    error => {
      utilityService.errorMessage(error, dispatch).then(() => {
        return Promise.resolve();
      });
    },
  );
};

export const deleteProject = (token, idProject) => dispatch => {
  return ProjectService.deleteProject(token, idProject).then(
    () => {
      return Promise.resolve();
    },
    error => {
      utilityService.errorMessage(error, dispatch).then(() => {
        return Promise.reject();
      });
    },
  );
};
