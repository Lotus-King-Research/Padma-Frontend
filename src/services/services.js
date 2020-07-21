import API from "./apiBase";
const dictLookupUrl = "/dictionary_lookup";
const searchTextsUrl = "/search_texts";
const renderTextUrl = "/render_text";

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
  },

  async renderText(title, start, end) {
    // do something async
    try {
      return await apiInstance.get(
        `${renderTextUrl}?title=${title}&start=${start}&end=${end}&mode=api`
      );
    } catch (err) {
      return null;
    }
  }
};
