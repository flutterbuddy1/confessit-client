import { GalleryVerticalEnd } from "lucide-react"

import { CONFIG } from "@/config"
import LoginForm from "@/components/login-form"

export default function Login() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start mb-20 lg:mb-0">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        {CONFIG.appName}
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="overflow-hidden relative">
                <img
                    src="/assets/images/bg.png"
                    alt="Image"
                    className="lg:absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
