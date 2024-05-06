export interface EventType {
    title: string;
    description: string;
    dateOfEvent: string;
    time: string;
    location: string;
    link: string;
    isDisplayed: boolean;
    country: string;
    city: string;
    status: string;
    image: ImageFile;
    _id: string;
    images: ImageFile[];
    createdBy: CreatedBy;
    category: string;
    mainImg: ImageFile;
    EventParticipants:  EventParticipants[];
    googleMapLink: string;
    timeOfEvent: TimeOfEvent;
    address?: string;
    locationDetails?: string;
}

interface TimeOfEvent {
    from: string;
    to: string;
}

export interface EventParticipants{
    _id: string;
    name: string;
    avatar: ImageFile;
}

interface CreatedBy {
    avatar: ImageFile;
    name: string;
    _id: string;
    role: string;
}

interface ImageFile {
    url: string;
}

export interface UserType {
    _id: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    company: string;
    country: string;
    region: string;
    phone: string;
    position?: string;
    avatar: ImageFile;
    gender: string;
    confirmedEmail: boolean;
    age: number;
    __v: number;
    name: string;
}


export interface EventResponseAPI {
    data: EventType[];
}

export interface EventResponseResults {
    result: EventType[]
}

export interface CardProps {
    i: number;
    title: string;
    description: string;
    mainImg: { url: string };
    city: string;
    category: string;
    _id: string;
    dateOfEvent: string;
    createdBy: { avatar: { url: string }, name: string };
}
