export interface LoginFormProps {
    email: string;
    password: string;
    remember: boolean;
}

export interface ResultProps {
    icon: React.ReactNode;
    title: string;
    text: string;
    textBtn: string;
    pathBtn: string;
    testData: string;
}
