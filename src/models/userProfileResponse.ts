
export interface UserProfileResponse {
    coins: number;
    workingTime: string;
    workingDay: number;
    image: string;
    nickName: string;
    latestThreeFiles: Array<[string]>;
}

export interface Profile {
    profile : UserProfileResponse
    setUpdateProfile: (isUpdate: boolean) => void;
}