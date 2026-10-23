const toEnglishDigits = (value: string | number) =>
  String(value).replace(/[۰-۹]/g, (digit) =>
    String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
  );

export { toEnglishDigits };
