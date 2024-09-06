import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "./locale/en.json";
import arJSON from "./locale/ar.json";
import deJSON from "./locale/de.json";
i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    ar: { ...arJSON },
    de: { ...deJSON },
  },
  lng: "en",
});
