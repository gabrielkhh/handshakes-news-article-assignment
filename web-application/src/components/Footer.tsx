import React from 'react'
import { BrandGithub } from 'tabler-icons-react'

const Footer = () => {
    return (
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center bg-gray-100 dark:bg-gray-900 py-5 transition-colors duration-200">
            <a target="_blank" className="flex flex-row gap-1 items-center" href="https://github.com/gabrielkhh">
                <BrandGithub size={20} className="text-primary transition-none" />
                <span className="font-medium text-primary">Github</span>
            </a>
        </footer>
    )
}

export default Footer