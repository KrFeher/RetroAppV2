import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URI;
const events = new EventSource(`${BASE_URL}/api/events`);
let isRealTimeUpdateRunning = false;

const api = {
  startRealTimeUpdate(callbackFunction) {
    if (!isRealTimeUpdateRunning) {
      events.onmessage = (event) => {
        try { // initial connection message isn't JSON
          const parsedData = JSON.parse(event.data);
          callbackFunction(parsedData);
        } catch (error) {
          console.log('Invalid JSON data received.')
        }
      };
      isRealTimeUpdateRunning = true;
    }
  },

  async getRetros() {
    let url = `${BASE_URL}/api/retros`;
    let retros;
    try {
      const result = await axios.get(url);
      retros = result.data;
    } catch (error) {
      // nothing needed here.
    }
    return retros;
  },

  async getRetro(id) {
    let url = `${BASE_URL}/api/retro/${id}`;
    let result;
    try {
      result = await axios.get(url);
    } catch (error) {}
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
    let response;
    try {
      response = await axios.post(url);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  },

  async deleteRetro(id) {
    let url = `${BASE_URL}/api/retro/${id}`;
    let response;
    try {
      response = await axios.delete(url);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  },
};

export default api;
