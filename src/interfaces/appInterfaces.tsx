export interface LoginData {
    correo: string;
    password: string;
}

export interface RegisterData {
    correo: string;
    password: string;
    nombre: string;
}


export interface LoginResponse {
    usuario: Usuario;
    token: string;
}

export interface Usuario {
    rol: string;
    estado: boolean;
    google: boolean;
    nombre: string;
    correo: string;
    uid: string;
    img?: string
}
//RateStar
export interface StarRatingProps {
    maxStars: number;
    rating: number;
    onRate: (rating: number) => void;
}

// Canchas
export interface CanchasResponse {
    total: number;
    canchas: Cancha[];
}

export interface Cancha {
    deporte: Deporte;
    _id: string;
    nombre: string
    establecimiento: Establecimiento;
    usuario: Establecimiento;
    capacidad: number;
    img?: string;
}

//Establecimientos
export interface EstablecimientosResponse {
    total: number;
    establecimientos: Establecimiento[]
}

export interface Establecimiento {
    _id: string;
    nombre: string;
    direccion: string;
    telefono: number;
    usuario?: CreadoPor; 
}

//Deportes
export interface DeporteResponse {
    total: number;
    deportes: Deporte[]
}

export interface Deporte{
    _id: string;
    deporte: string
}
export interface CreadoPor {
    _id: string;
    nombre: string;
}

