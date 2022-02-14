import axios from 'axios';
const GAME_SUGGESTIONS_API = '/api/suggestionsWCaptcha';

const postGameSuggestions = async (body) => {
  try {
    const response = await axios.post(GAME_SUGGESTIONS_API, body);
    return response;
  } catch (err) {
    console.error(err);
    return;
  }
};

export default postGameSuggestions;
