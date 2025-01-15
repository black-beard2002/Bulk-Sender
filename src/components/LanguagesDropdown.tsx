import React from "react";
import { useState } from "react";

const Languages = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleLanguageChange = (e) => {
    const selectedKey = e.target.value;
    const selectedValue = languages[selectedKey];

    setSelectedLanguage(selectedKey);
    props.func({ key: selectedKey, value: selectedValue });
  };
  const languages = {
    Afrikaans: "af",
    Albanian: "sq",
    Arabic: "ar",
    Azerbaijani: "az",
    Bengali: "bn",
    Bulgarian: "bg",
    Catalan: "ca",
    "Chinese (CHN)": "zh_CN",
    "Chinese (HKG)": "zh_HK",
    "Chinese (TAI)": "zh_TW",
    Croatian: "hr",
    Czech: "cs",
    Danish: "da",
    Dutch: "nl",
    English: "en",
    "English (UK)": "en_GB",
    "English (US)": "en_US",
    Estonian: "et",
    Filipino: "fil",
    Finnish: "fi",
    French: "fr",
    Georgian: "ka",
    German: "de",
    Greek: "el",
    Gujarati: "gu",
    Hausa: "ha",
    Hebrew: "he",
    Hindi: "hi",
    Hungarian: "hu",
    Indonesian: "id",
    Irish: "ga",
    Italian: "it",
    Japanese: "ja",
    Kannada: "kn",
    Kazakh: "kk",
    Kinyarwanda: "rw_RW",
    Korean: "ko",
    "Kyrgyz (Kyrgyzstan)": "ky_KG",
    Lao: "lo",
    Latvian: "lv",
    Lithuanian: "lt",
    Macedonian: "mk",
    Malay: "ms",
    Malayalam: "ml",
    Marathi: "mr",
    Norwegian: "nb",
    Persian: "fa",
    Polish: "pl",
    "Portuguese (BR)": "pt_BR",
    "Portuguese (POR)": "pt_PT",
    Punjabi: "pa",
    Romanian: "ro",
    Russian: "ru",
    Serbian: "sr",
    Slovak: "sk",
    Slovenian: "sl",
    Spanish: "es",
    "Spanish (ARG)": "es_AR",
    "Spanish (SPA)": "es_ES",
    "Spanish (MEX)": "es_MX",
    Swahili: "sw",
    Swedish: "sv",
    Tamil: "ta",
    Telugu: "te",
    Thai: "th",
    Turkish: "tr",
    Ukrainian: "uk",
    Urdu: "ur",
    Uzbek: "uz",
    Vietnamese: "vi",
    Zulu: "zu",
  };

  return (
    <select
      className="text-white bg-blue-700 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-start inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      value={selectedLanguage}
      onChange={handleLanguageChange}
    >
      <option value="">Select...</option>
      {Object.keys(languages).map((language, index) => (
        <option key={index} value={language}>
          {language}
        </option>
      ))}
    </select>
  );
};
export default Languages;
