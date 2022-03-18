
export const setFontScale = (scale: string) => {
  var body = document.querySelector('body') as HTMLBodyElement;
  localStorage.setItem('fontScale', scale);
  body.style.setProperty('--font-scale', scale);

};

export const setBtnScale = (scale: string) => {
  var body = document.querySelector('body') as HTMLBodyElement;
  body.style.setProperty('--btn-scale', scale);
  localStorage.setItem('btnScale', scale);
};