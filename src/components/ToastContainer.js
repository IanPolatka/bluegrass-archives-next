"use client"

import { useToast } from "./ToastContext"

const ToastContainer = () => {
  const { toasts, removeToast } = useToast()

  return (
    <div>
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          {toast.message}
          <button onClick={() => removeToast(toast.id)}>Close</button>
        </div>
      ))}
    </div>
  )
}

export default ToastContainer