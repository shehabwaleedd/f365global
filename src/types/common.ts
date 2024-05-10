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
    image: ImageUrl;
    _id: string;
    images: ImageUrl[];
    createdBy: CreatedBy;
    category: string;
    mainImg: ImageFile;
    EventParticipants:  EventParticipants[];
    googleMapLink: string;
    timeOfEvent: TimeOfEvent;
    address?: string;
    locationDetails?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    seoImage?: ImageFile;
}

interface TimeOfEvent {
    from: string;
    to: string;
}


export interface CustomFieldProps {
    name: string;
    label?: string;
    fieldType: 'input' | 'textarea' | 'select' | 'checkbox' | 'file' | 'date';
    setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
    options?: Array<{ label: string; value: string }>;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // New prop
    value?: string | number;
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

interface ImageUrl {
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


export interface ImageFile {
    file: File;
    previewUrl?: string | null;
    url?: string;
}
export interface ImagesUploaderProps {
    uploadedImages: ImageFile[];
    setUploadedImages: (images: ImageFile[]) => void;
}

export interface CheckboxGroupFieldArrayProps {
    name: string;
    options: CheckboxOption[];
    setFieldValue: (field: string, value: any) => void;
    values: string[];
}


interface CheckboxOption {
    label: string;
    value: string;

}
