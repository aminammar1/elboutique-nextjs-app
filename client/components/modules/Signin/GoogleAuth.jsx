"use client";

import { FaGoogle} from "react-icons/fa"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { googleAuth } from "@/actions/auth"
import Toast from "@/components/custom/Toast"
import { ClipLoader } from "react-spinners"
import { useRouter } from "next/navigation"

export function GoogleLoginButton() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [toastData, setToastData] = useState(null)

const handleGoogleLogin = () => {
    setLoading(true)
    dispatch(googleAuth()).then(result => {
        setToastData({ status: result.success ? "success" : "error", message: result.message });
        if (result.success) {
            setTimeout(() => {
                router.push('/')
              }, 2000)
        }
        setTimeout(() => setToastData(null), 3000)
    }).finally(() => {
        setLoading(false)
    })
}

  return (
    <>
      {toastData && <Toast status={toastData.status} message={toastData.message} />}
      <button 
        className="flex-1 border border-gray-300 text-gray-700 flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-gray-200"
        onClick={handleGoogleLogin} disabled={loading}
      >
        <FaGoogle className="text-xl" /> {loading ? <ClipLoader size={20} color="#000" /> : "Google"}
      </button>
    </>
  )
}