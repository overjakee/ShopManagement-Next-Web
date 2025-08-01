import { useState } from "react";
import { authService } from "@/services/authService";
import type { ApiResponse } from "@/models/dto/base";
import { RegisterForm } from "@/models/forms/registerForm";
import {
  RegisterGeneralDTO,
  RegisterStudentDTO,
  RegisterTeacherDTO,
} from "@/models/dto/auth";

export default function Register() {
  const initialFormState: RegisterForm = {
    UserType: "1", // default เป็น General
    Username: "",
    Password: "",
    Title: "",
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    CitizenId: "",
    StudentId: "",
    SchoolName: "",
    TeachingPlace: "",
  };

  const userType = [
    { label: "General", value: "1" },
    { label: "Student", value: "2" },
    { label: "Teacher", value: "3" },
  ];

  const [form, setForm] = useState<RegisterForm>(initialFormState);

  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const clearForm = () => {
    setForm(initialFormState);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserType = e.target.value;

    setForm((prevForm) => ({
      UserType: selectedUserType,

      Username: prevForm.Username,
      Password: prevForm.Password,
      Title: prevForm.Title,
      FirstName: prevForm.FirstName,
      LastName: prevForm.LastName,
      Email: prevForm.Email,
      PhoneNumber: prevForm.PhoneNumber,

      CitizenId: "",
      StudentId: "",
      SchoolName: "",
      TeachingPlace: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResultMessage(null);
    setErrors([]);

    try {
      if (!form.UserType) {
        setErrors(["Please select a user type."]);
        setLoading(false);
        return;
      }

      if (form.UserType == "1") {
        const payload: RegisterGeneralDTO = {
          ...form,
        };

        const data: ApiResponse<object> = await authService.registerGeneral(
          payload
        );

        if (data.isSuccess) {
          setResultMessage(data.message || "Register success!");
          clearForm();
        } else {
          setResultMessage(data.message || "Register failed");
          setErrors(data.errors || []);
        }
      } else if (form.UserType == "2") {
        const payload: RegisterStudentDTO = {
          ...form,
        };

        const data: ApiResponse<object> = await authService.registerStudent(
          payload
        );

        if (data.isSuccess) {
          setResultMessage(data.message || "Register success!");
          clearForm();
        } else {
          setResultMessage(data.message || "Register failed");
          setErrors(data.errors || []);
        }
      } else if (form.UserType == "3") {
        const payload: RegisterTeacherDTO = {
          ...form,
        };

        const data: ApiResponse<object> = await authService.registerTeacher(
          payload
        );

        if (data.isSuccess) {
          setResultMessage(data.message || "Register success!");
          clearForm();
        } else {
          setResultMessage(data.message || "Register failed");
          setErrors(data.errors || []);
        }
      }
    } catch (error: any) {
      setResultMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          สมัครสมาชิก
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            ประเภทผู้สมัคร
          </label>
          <select
            name="UserType"
            value={form.UserType}
            onChange={handleUserTypeChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select User Type
            </option>
            {userType.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <label className="block mb-1 text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            name="Username"
            value={form.Username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            name="Password"
            type="password"
            value={form.Password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-2">
            <div className="w-1/4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                คำนำหน้า
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.Title}
                onChange={(e) => setForm({ ...form, Title: e.target.value })}
              />
            </div>

            <div className="w-2/4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                ชื่อ
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.FirstName}
                onChange={(e) =>
                  setForm({ ...form, FirstName: e.target.value })
                }
              />
            </div>

            <div className="w-2/4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                นามสกุล
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.LastName}
                onChange={(e) => setForm({ ...form, LastName: e.target.value })}
              />
            </div>
          </div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            อีเมล์
          </label>
          <input
            name="Email"
            type="email"
            value={form.Email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="block mb-1 text-sm font-medium text-gray-700">
            หมายเลขโทรศัพท์
          </label>
          <input
            name="PhoneNumber"
            value={form.PhoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {form.UserType === "1" && (
            <>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                เลขที่บัครประชาชน
              </label>
              <input
                name="CitizenId"
                value={form.CitizenId}
                onChange={handleChange}
                placeholder="Citizen ID"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}

          {form.UserType === "2" && (
            <>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                รหัสนักเรียนนักศึกษา
              </label>
              <input
                name="StudentId"
                value={form.StudentId}
                onChange={handleChange}
                placeholder="Student ID"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block mb-1 text-sm font-medium text-gray-700">
                ชื่อโรงเรียน
              </label>
              <input
                name="SchoolName"
                value={form.SchoolName}
                onChange={handleChange}
                placeholder="School Name"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}

          {form.UserType === "3" && (
            <>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                โรงเรียนที่สอน
              </label>
              <input
                name="TeachingPlace"
                value={form.TeachingPlace}
                onChange={handleChange}
                placeholder="TeachingPlace"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {resultMessage && (
          <p className="mt-4 text-center text-sm text-gray-700">
            {resultMessage}
          </p>
        )}
        {errors.length > 0 && (
          <ul className="mt-4 text-sm text-red-600 list-disc list-inside">
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
