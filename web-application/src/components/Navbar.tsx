import { useAppStateContext } from '@/providers/AppStateProvider'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Home, Moon, Sun, Tool } from 'tabler-icons-react'

const Navbar = () => {
    const { themeIsDark, setThemeIsDark } = useAppStateContext();
    const pathName = usePathname();

    return (
        <nav className="h-16 flex w-full items-center p-3 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-xl sticky top-0">
            <div className="flex w-full gap-3 items-center justify-between">
                <div className="flex gap-6">
                    <Link href={"/"} className={`flex gap-1 hover: items-center font-medium text-primary p-2 rounded-lg ${pathName === "/" ? "bg-orange-400 text-white" : "hover:bg-gray-200 hover:dark:bg-gray-800"}`}>
                        <Home size={18} className="transition-none" />
                        <span>Home</span>
                    </Link>
                    <Link href={"/manage"} className={`flex gap-1 items-center font-medium text-primary p-2 rounded-lg ${pathName.includes("manage") ? "bg-orange-400 text-white" : "hover:bg-gray-200 hover:dark:bg-gray-800"}`}>
                        <Tool size={18} className="transition-none" />
                        <span>Manage</span>
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