interface ResultDataTypes {
    icon: React.ReactNode;
    title: string;
    text: string;
    textBtn: string;
    pathBtn: string;
    testData: string;
}

export interface ResTypes {
    error_login: ResultDataTypes;
    error_register: ResultDataTypes;
    success_register: ResultDataTypes;
}
