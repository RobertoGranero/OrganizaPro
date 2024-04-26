export interface UserLogin {
    email: string;
    password: string;

}

export interface User {
    _id?: string;
    nombre: string;
    apellidos: string
    email: string;
    biografia?: string
    password?: string;
    avatar?: string;
}

export interface UserProfileEdit {
    nombre: string;
    apellidos: string
    email: string;
    biografia?: string
}

export interface UserPasswordEdit {
    password: string;
}
