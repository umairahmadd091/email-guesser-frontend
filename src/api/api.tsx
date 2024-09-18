import axios from 'axios';

interface Body {
  fullName: String;
  domain: String;
}

const BASE_URL: String = 'http://localhost:8080/api';

export const getEmail = async ({ fullName, domain }: Body) => {
  const data = axios.post(`${BASE_URL}/guess-email`, { fullName, domain });
  return data;
};
