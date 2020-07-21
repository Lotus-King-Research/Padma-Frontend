import API from "./apiBase";
const dictLookupUrl = "/dictionary_lookup";
const searchTextsUrl = "/search_texts";

const apiInstance = API();

export const Services = {
  async dictionaryLookup(query) {
    // do something async
    try {
      return await apiInstance.get(`${dictLookupUrl}?query=${query}&mode=api`);
    } catch (err) {
      return null;
    }
  },

  async searchTexts(query) {
    // do something async
    try {
      return await apiInstance.get(`${searchTextsUrl}?query=${query}&mode=api`);
    } catch (err) {
      return null;
    }
  }
};
