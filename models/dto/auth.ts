export interface RegisterGeneralDTO {
  Username: string;
  Password: string;
  Title: string;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  CitizenId: string;
}

export interface RegisterStudentDTO {
  Username: string;
  Password: string;
  Title: string;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  CitizenId: string;
}

export interface RegisterTeacherDTO {
  Username: string;
  Password: string;
  Title: string;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  CitizenId: string;
}

export interface LoginRequestDTO{
  Username : string;
  Password: String;
}

export interface LoginResponseDTO{
  token : string;
}


