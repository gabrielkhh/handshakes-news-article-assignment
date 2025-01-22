import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { useAppStateContext } from '@/providers/AppStateProvider'
import { AppProps } from 'next/app'
import React from 'react'

const SharedLayout = (props: any) => {
  const { children } = props;
  const { themeIsDark } = useAppStateContext()

  return (
    <div className={`${themeIsDark ? "dark" : "light"} bg-primary`}>
      <Navbar />
      <div className="flex flex-col gap-3 p-3">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default SharedLayout