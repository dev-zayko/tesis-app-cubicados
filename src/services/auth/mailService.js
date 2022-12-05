import ApiClient from "../connection/ApiClient";


const sendEmailVerification = async (email, name, token) => {
  return await ApiClient
    .post('mail/verification', {
      email: email,
      name: name,
      token: token,
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

const emailVerificate = async token => {
  return await ApiClient
    .post(
      'mail/status',
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

export default {
  sendEmailVerification,
  emailVerificate,
};
