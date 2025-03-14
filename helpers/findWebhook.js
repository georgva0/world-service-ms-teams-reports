const findWebhook = (languageId) => {
  switch (languageId) {
    case "om":
      return process.env["CERT_OM"];
    case "am":
      return process.env["CERT_AM"];
    case "fr":
      return process.env["CERT_FR"];
    case "ha":
      return process.env["CERT_HA"];
    case "ig":
      return process.env["CERT_IG"];
    case "rw":
      return process.env["CERT_RW"];
    case "pcm":
      return process.env["CERT_PCM"];
    case "so":
      return process.env["CERT_SO"];
    case "sw":
      return process.env["CERT_SW"];
    case "ti":
      return process.env["CERT_TI"];
    case "yo":
      return process.env["CERT_YO"];
    case "ky":
      return process.env["CERT_KY"];
    case "my":
      return process.env["CERT_MY"];
    case "id":
      return process.env["CERT_ID"];
    case "ja":
      return process.env["CERT_JA"];
    case "ko":
      return process.env["CERT_KO"];
    case "th":
      return process.env["CERT_TH"];
    case "vi":
      return process.env["CERT_VI"];
    case "bn":
      return process.env["CERT_BN"];
    case "gu":
      return process.env["CERT_GU"];
    case "hi":
      return process.env["CERT_HI"];
    case "mr":
      return process.env["CERT_MR"];
    case "ne":
      return process.env["CERT_NE"];
    case "ps":
      return process.env["CERT_PS"];
    case "pa":
      return process.env["CERT_PA"];
    case "si":
      return process.env["CERT_SI"];
    case "ta":
      return process.env["CERT_TA"];
    case "te":
      return process.env["CERT_TE"];
    case "ur":
      return process.env["CERT_UR"];
    case "az":
      return process.env["CERT_AZ"];
    case "ru":
      return process.env["CERT_RU"];
    case "tr":
      return process.env["CERT_TR"];
    case "uk":
      return process.env["CERT_UK"];
    case "es":
      return process.env["CERT_ES"];
    case "pt-br":
      return process.env["CERT_PT_BR"];
    case "fa":
      return process.env["CERT_FA"];
    case "ar":
      return process.env["CERT_AR"];
    case "sr-latn":
      return process.env["CERT_SR-LATN"];
    case "uz-cyrl":
      return process.env["CERT_UZ-CYRL"];
    case "zh-hant":
      return process.env["CERT_ZH-HANT"];
      break;
  }
};

module.exports = { findWebhook };
