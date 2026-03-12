import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import type { UserLogInFormData } from '../types/user'
import type { ApiErrorResponse } from "../types/ApiErrorResponse"
import { handleResponse } from "../utils/responseMessage"
import { apiUserLogin } from "../apis/user"

const setLoginSession = (token: string, uid: string, expired: number) => {
  const expiresDate = new Date(expired).toUTCString()
  document.cookie = `ReactToken=${token}; expires=${expiresDate}; path=/`
  document.cookie = `ReactUid=${uid}; expires=${expiresDate}; path=/`
  axios.defaults.headers.common["Authorization"] = token
};

export const Login = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<UserLogInFormData>()

  const onSubmit = async (data: UserLogInFormData) => {
    try {
      const response = await apiUserLogin(data)
      const { token, expired, uid } = response.data
      setLoginSession(token, uid, expired)
      navigate('/admin')
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        handleResponse(
          error.response?.data.message ?? '登入失敗，請稍後再試',
          'warning'
        )
      } else {
        handleResponse('未知錯誤', 'error')
      }
    }
  }

  return (<>
    <div className="container my-5">
      <div className="row">
        <div className="col-6">
          <img className="img-fluid w-100 rounded" src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fE5lb24lMjBzaWdufGVufDB8fDB8fHww" alt="sweet home" />
        </div>
        <div className="col-6">
          <div className="text-center my-3">
            <p className="text-primary fs-5 fw-bold mb-3">Backstage</p>
            <p className="fw-bold text-dark fs-3 mb-5">後台登入</p>
          </div>
          <form
            id="form"
            className="form-signin"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="username"
                placeholder="name@example.com"
                autoFocus
                {...register("username", {
                  required: "Email 是必填項目",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "請輸入有效的 Email 格式",
                  },
                })}
              />
              <label htmlFor="username">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: "密碼是必填項目",
                  minLength: {
                    value: 6,
                    message: "密碼長度至少需為 6 個字元",
                  },
                  maxLength: {
                    value: 12,
                    message: "密碼長度不得超過 12 個字元",
                  },
                })}
              />
              <label htmlFor="password">Password</label>
            </div>
            <button
              className="btn btn-lg btn-primary w-100 mt-3"
              type="submit"
            >
              登入
            </button>
          </form>
        </div>
      </div>
    </div>
  </>)
}