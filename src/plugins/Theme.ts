export const setTheme = (theme: string) => {
    localStorage.setItem('theme', theme);  
    var body = document.querySelector('body') as HTMLBodyElement;
    if (theme === 'dark') {
        localStorage.setItem('theme', theme);
        body.classList.remove(theme+'');
        body.classList.add(theme);
    } else if (theme === 'light') {
        localStorage.setItem('theme', theme);
        body.classList.remove(theme+'');
        body.classList.add(theme);
    }  
};



