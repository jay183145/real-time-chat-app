import { loginUser } from "@/lib/api/users"
import { setJwtToken } from "@/lib/auth/jwt-client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Button from "@/components/ui/button"
import ErrorModal from "@/components/modal/error-modal"

function LoginContent() {
    const [error, setError] = useState<string | null>(null)
    const [isShowErrorModal, setIsShowErrorModal] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (LoginData: { email: string; password: string }) => {
        const { data, error } = await loginUser(LoginData)
        if (error) {
            setError(error.error)
            setIsShowErrorModal(true)
        }
        if (data) {
            setJwtToken(data.token)
        }
    }

    return (
        <div className="flex h-[260px] w-full flex-col p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
                <div>
                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Please enter a valid email address",
                            },
                        })}
                        type="text"
                        placeholder="郵箱"
                        className="w-full rounded-md border border-neutral-400 bg-neutral-600 px-3 py-1 text-neutral-50 placeholder:text-neutral-300"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                    <input
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" },
                        })}
                        type="password"
                        placeholder="密碼"
                        className="w-full rounded-md border border-neutral-400 bg-neutral-600 px-3 py-1 text-neutral-50 placeholder:text-neutral-300"
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                </div>
                <Button variant="primary" size="sm" className="w-full" onClick={() => handleSubmit(onSubmit)}>
                    登入
                </Button>
                {error && <ErrorModal error={error} isShow={isShowErrorModal} setIsShow={setIsShowErrorModal} />}
            </form>
            {/* 分隔線 */}
            <div className="flex w-full items-center justify-center px-6 pb-2 pt-5">
                <div className="mr-3 w-full border-b border-neutral-50"></div>
                <div className="">或</div>
                <div className="ml-3 w-full border-b border-neutral-50"></div>
            </div>
            {/* 註冊 */}
            <div className="flex items-center justify-between px-2">
                <div className="mx-2">還沒有帳號嗎?</div>
                <div className="flex items-center justify-end">
                    <button className="font-bold text-primary-4 underline hover:cursor-pointer hover:text-primary-3">
                        立即註冊
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginContent
