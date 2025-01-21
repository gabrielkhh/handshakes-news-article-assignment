import { useAppStateContext } from '@/providers/AppStateProvider'
import Link from 'next/link'
import React from 'react'
import { Home, Moon, Sun, Tool } from 'tabler-icons-react'

const Navbar = () => {
    const { themeIsDark, setThemeIsDark } = useAppStateContext();

    return (
        <nav className="h-14 p-3 bg-white/50 dark:bg-black/50 backdrop-blur-xl sticky top-0 transition-colors duration-200">
            <div className="flex gap-3 items-center justify-between">
                <div className="flex gap-6">
                    <Link href={"/"} className="flex gap-1 hover: items-center font-medium text-primary">
                        <Home size={18} className="transition-none" />
                        <span className={`${true ?? ""}`}>Home</span>
                    </Link>
                    <Link href={"/manage"} className="flex gap-1 items-center font-medium text-primary">
                        <Tool size={18} className="transition-none" />
                        <span className={`${true ?? ""}`}>Manage</span>
                    </Link>
                </div>
                <div>
                    <label className="inline-flex items-center cursor-pointer gap-2">
                        <Sun size={18} className="transition-none text-primary" />
                        <input type="checkbox" checked={themeIsDark} className="sr-only peer" />
                        <div onClick={() => {setThemeIsDark(prev => !prev)}} className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-400"></div>
                        <Moon size={18} className="transition-none text-primary" />
                    </label>
                </div>
            </div>
        </nav>
    )
}

export default Navbar