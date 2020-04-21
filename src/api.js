import axios from "axios";

const api = {
  async getRetros() {
    let url = "http://localhost:5000/api/retros";

    const result = await axios.get(url);
    return result.data;
  },

  async getRetro(id) {
    let url = `http://localhost:5000/api/retro/${id}`;

    const result = await axios.get(url);
    return result.data;
  },

  async submitRetroOpinions(id, opinions) {
    let url = `http://localhost:5000/api/retro/opinions/${id}`;

    const response = await axios.post(url, { opinions });
    return response.status === 200;
  },

  async submitVotesOnOpinion(id, votedOpinions) {
    let url = `http://localhost:5000/api/retro/opinions/votes/${id}`;

    const response = await axios.post(url, { votedOpinions });
    return response.status === 200;
  },

  async addRetro(id) {
    let url = `http://localhost:5000/api/retro/${id}`;

    const response = await axios.post(url);
    return response.status === 200;
  },

  async deleteRetro(id) {
    let url = `http://localhost:5000/api/retro/${id}`;

    const response = await axios.delete(url);
    return response.status === 200;
  },

};

export default api;
