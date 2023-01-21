
export function usePhoneNumberPatternMatch(phoneNumberString) {
    try {
      var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
      var match = cleaned.match(/^(1|)?(\d{0,2})?(\d{0,3})?(\d{0,2})?(\d{0,2})?$/);
      var intlCode = match[1] ? "+1 " : "";
      return [
        intlCode,
        match[2] ? "" : "",
        match[2],
        match[3] ? " " : "",
        match[3],
        match[4] ? "-" : "",
        match[4],
        match[5] ? '-' : "",
        match[5]
      ].join("");
    } catch (err) {
      return "";
    }
  }