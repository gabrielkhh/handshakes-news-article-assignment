import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { useAppStateContext } from '@/providers/AppStateProvider'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const SharedLayout = (props: any) => {
  const { children } = props;
  const { themeIsDark } = useAppStateContext()

  return (
    <div className={`${themeIsDark ? "dark" : "light"} bg-primary`}>
      <Toaster/>
      <Navbar />
      <div className="flex flex-col gap-3 p-3">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default SharedLayout