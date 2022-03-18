
export const setFontsize = (fontSizeMode: string) => {
    localStorage.setItem('fontSizeMode', fontSizeMode);
    var body = document.querySelector('body') as HTMLBodyElement;
    var header2 = document.getElementsByTagName('h2') as HTMLCollectionOf<HTMLElement>;
    var nav = document.getElementsByClassName("nav-title") as HTMLCollectionOf<HTMLElement>;
    var project = document.getElementsByClassName("project-title") as HTMLCollectionOf<HTMLElement>;
    var activity = document.getElementsByClassName("activity-detail") as HTMLCollectionOf<HTMLElement>;
    var input = document.getElementsByClassName("input") as HTMLCollectionOf<HTMLElement>;
    var hiddenFileInput = document.getElementsByClassName("hiddenFileInput") as HTMLCollectionOf<HTMLElement>;

    body.style.setProperty('--up-body', fontSizeMode);

    if (header2[0] !== undefined) {
        for(let i=0;i<header2.length;i++){
            header2[i].style.setProperty('--upfont-header2', fontSizeMode);
        }
    }

    if (nav[0] !== undefined) {
        for(let i=0;i<nav.length;i++){
            nav[i].style.setProperty('--upfont-nav', fontSizeMode);
        }
    }

    if (project[0] !== undefined) {
        for(let i=0;i<project.length;i++){
            project[i].style.setProperty('--upfont-project', fontSizeMode);
        }
    }

    if (activity[0] !== undefined) {
        for(let i=0;i<activity.length;i++){
            activity[i].style.setProperty('--upfont-activity', fontSizeMode);
        }
    }

    if (input[0] !== undefined) {
        for(let i=0;i<input.length;i++){
            input[i].style.setProperty('--upfont-input', fontSizeMode);
        }
    }

    if (hiddenFileInput[0] !== undefined) {
        hiddenFileInput[0].style.setProperty('--upfont-hiddenFileInput', fontSizeMode);
    }
};