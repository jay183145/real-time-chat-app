import { registerUser } from "@/lib/api/users"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Button from "@/components/ui/button"
import ErrorModal from "@/components/modal/error-modal"
import { useRouter } from "next/navigation"
import SuccessModal from "@/components/modal/success-modal"

function RegisterContent() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [isShowErrorModal, setIsShowErrorModal] = useState(false)
    const [isShowSuccessModal, setIsShowSuccessModal] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            user: "",
        },
    })

    const onSubmit = async (LoginData: { email: string; password: string; user: string }) => {
        const { data, error } = await registerUser(LoginData)
        if (error) {
            setError(error.error)
            setIsShowErrorModal(true)
        }
        if (data) {
            setIsShowSuccessModal(true)
        }
    }

    const handleLogin = () => {
        router.push("?auth=login")
    }

    const handleSuccessModal = () => {
        router.push("?auth=login")
        setIsShowSuccessModal(false)
    }

    return (
        <div className="flex h-[280px] w-full flex-col px-6 py-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
                <div>
                    <input
                        {...register("email", {
                            required: "請輸入郵箱",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "請輸入正確的郵箱",
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
                            required: "請輸入密碼",
                            minLength: { value: 6, message: "密碼至少6個字" },
                        })}
                        type="password"
                        placeholder="密碼"
                        className="w-full rounded-md border border-neutral-400 bg-neutral-600 px-3 py-1 text-neutral-50 placeholder:text-neutral-300"
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                </div>
                <div>
                    <input
                        {...register("user", { required: "請輸入使用者名稱" })}
                        type="text"
                        placeholder="使用者名稱"
                        className="w-full rounded-md border border-neutral-400 bg-neutral-600 px-3 py-1 text-neutral-50 placeholder:text-neutral-300"
                    />
                    {errors.user && <p className="mt-1 text-sm text-red-500">{errors.user.message}</p>}
                </div>
                <Button variant="primary" size="sm" className="w-full" onClick={() => handleSubmit(onSubmit)}>
                    註冊
                </Button>
                {error && <ErrorModal error={error} isShow={isShowErrorModal} setIsShow={setIsShowErrorModal} />}
            </form>
            {/* 分隔線 */}
            <div className="flex w-full items-center justify-center px-6 pb-2 pt-2">
                <div className="mr-3 w-full border-b border-neutral-50"></div>
                <div className="">或</div>
                <div className="ml-3 w-full border-b border-neutral-50"></div>
            </div>
            {/* 註冊 */}
            <div className="flex items-center justify-between">
                <div className="mx-2">已經有帳號了嗎?</div>
                <div className="flex items-center justify-end">
                    <button
                        onClick={handleLogin}
                        className="font-bold text-primary-4 underline hover:cursor-pointer hover:text-primary-3"
                    >
                        立即登入
                    </button>
                </div>
            </div>
            <SuccessModal
                successContent="註冊成功"
                successButtonContent="立即登入"
                isShow={isShowSuccessModal}
                setIsShow={setIsShowSuccessModal}
                onClick={handleSuccessModal}
            />
        </div>
    )
}

export default RegisterContent
