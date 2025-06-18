declare type ArtistSignUpParams = {
    name: string;
    email: string;
    password: string;
    dob: Date;
    phone: string;
    ci: string;
    work: string;
    art_type: string;
};

declare type UserSignUpParams = {
    name: string;
    email: string;
    password: string;
    dob: Date;
    phone: string;
    gender: string;
    bio?: string;
};

declare type UserLoginParams = {
    email: string;
    password: string;
};
