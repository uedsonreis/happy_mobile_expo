export interface Orphanage {
    id?: number
    name: string
    about: string
    whatsapp: string
    instructions: string
    visitHour: string
    weekend: boolean
    latitude: number
    longitude: number
    photos: Photo[]
}

export interface Photo {
    id?: number
    path: string
}