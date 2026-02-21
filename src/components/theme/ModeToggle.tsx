import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme/ThemeProvider"


export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="flex items-center">
            <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="group relative h-9 w-9 cursor-pointer rounded-full  p-0 hover:bg-accent transition-colors"
                aria-label="Toggle theme"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Sun
                        className={`h-5 w-5 transition-all duration-500 ease-in-out text-muted-foreground group-hover:text-white group-hover:rotate-45 ${theme !== 'light'
                            ? 'scale-100 rotate-0 opacity-100' // Sun is active
                            : 'scale-105 md:scale-[5] rotate-90 opacity-0'  // Sun explodes out
                            }`}
                        fill="currentColor"
                    />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Moon
                        className={`h-5 w-5 transition-all duration-500 ease-in-out text-muted-foreground group-hover:text-slate-900 group-hover:rotate-45 dark:group-hover:text-slate-100 ${theme === 'light'
                            ? 'scale-100 rotate-0 opacity-100' // Moon is active
                            : 'scale-105 md:scale-[5] rotate-90 opacity-0'  // Moon explodes out
                            }`}
                        fill="currentColor"
                    />
                </div>
            </button>
        </div>
    )
}
