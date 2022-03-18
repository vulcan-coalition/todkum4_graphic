export interface User {
    username: string;
    password: string;
}

export interface UpdateStateSttModeRequest {
    state: boolean;
    projectType: string;
}