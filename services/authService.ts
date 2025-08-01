import api from "./api";
import { LoginRequestDTO, LoginResponseDTO, RegisterGeneralDTO ,RegisterStudentDTO,RegisterTeacherDTO} from "@/models/dto/auth";
import { ApiResponse } from "@/models/dto/base";

const login = async (request : LoginRequestDTO) => {
  const res = await api.post<ApiResponse<LoginResponseDTO>>("/auth/login", request);
  if(!res.data.isSuccess){
    alert(res.data.errors);
  }
  return res.data;
};


const registerGeneral = async (request: RegisterGeneralDTO): Promise<ApiResponse<object>> => {
  const res = await api.post<ApiResponse<object>>("/auth/register-general", request);
  if(!res.data.isSuccess){
    alert(res.data.errors);
  }
  return res.data;
};

const registerStudent = async (request: RegisterStudentDTO): Promise<ApiResponse<object>> => {
  const res = await api.post<ApiResponse<object>>("/auth/register-student", request);
  if(!res.data.isSuccess){
    alert(res.data.errors);
  }
  return res.data;
};

const registerTeacher = async (request: RegisterTeacherDTO): Promise<ApiResponse<object>> => {
  const res = await api.post<ApiResponse<object>>("/auth/register-teacher", request);
  if(!res.data.isSuccess){
    alert(res.data.errors);
  }
  return res.data;
};

export const authService = {
  registerGeneral,
  registerStudent,
  registerTeacher,
  login
};