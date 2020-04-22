import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URI;

const api = {
  async getRetros() {
    let url = `${BASE_URL}/api/retros`;

    const result = await axios.get(url);
    return result.data;
  },

  async getRetro(id) {
    let url = `${BASE_URL}/api/retro/${id}`;

    const result = await axios.get(url);
    return result.data;
  },

  async submitRetroOpinions(id, opinions) {
    let url = `${BASE_URL}/api/retro/opinions/${id}`;

    const response = await axios.post(url, { opinions });
    return response.status === 200;
  },

  async submitVotesOnOpinion(id, votedOpinions) {
    let url = `${BASE_URL}/api/retro/opinions/votes/${id}`;

    const response = await axios.post(url, { votedOpinions });
    return response.status === 200;
  },

  async addRetro(id) {
    let url = `${BASE_URL}/api/retro/${id}`;

    const response = await axios.post(url);
    return response.status === 200;
  },

  async deleteRetro(id) {
    let url = `${BASE_URL}/api/retro/${id}`;

    const response = await axios.delete(url);
    return response.status === 200;
  },
};

export default api;
