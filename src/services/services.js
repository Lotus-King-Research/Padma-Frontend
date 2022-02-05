import API from "./apiBase";
const dictLookupUrl = "/dictionary_lookup";
const searchTextsUrl = "/search_texts";
const renderTextUrl = "/render_text";
const tokenizeUrl = "/tokenize";
const wordStatisticsUrl = "/word_statistics";
const similarWordsUrl = "/find_similar";

const apiInstance = API();

export const Services = {
  async dictionaryLookup(query, dictionaries, tokenize) {
    try {
      return await apiInstance.get(
        `${dictLookupUrl}?query=${query}&dictionaries=${dictionaries}&tokenize=${tokenize}&mode=api`
      );
    } catch (err) {
      return err;
    }
  },

  async searchTexts(query, tokenize) {
    try {
      return await apiInstance.get(
        `${searchTextsUrl}?query=${query}&tokenize=${tokenize}&mode=api`
      );
    } catch (err) {
      return err;
    }
  },

  async renderText(title, start, end) {
    try {
      if (start != null && end != null) {
        return await apiInstance.get(
          `${renderTextUrl}?title=${title}&start=${start}&end=${end}&mode=api`
        );
      } else {
        return await apiInstance.get(
          `${renderTextUrl}?title=${title}&mode=api`
        );
      }
    } catch (err) {
      return null;
    }
  },

  async tokenize(query) {
    try {
      return await apiInstance.get(`${tokenizeUrl}?query=${query}&mode=api`);
    } catch (err) {
      return err;
    }
  },

  async wordStatistics(query, tokenize) {
    try {
      return await apiInstance.get(
        `${wordStatisticsUrl}?query=${query}&tokenize=${tokenize}&mode=api`
      );
    } catch (err) {
      return err;
    }
  },

  async similarWords(query) {
    try {
      return await apiInstance.get(
        `${similarWordsUrl}?query=${query}&mode=api`
      );
    } catch (err) {
      return null;
    }
  }
};
