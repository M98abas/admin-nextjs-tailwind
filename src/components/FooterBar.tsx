import React, { ReactNode } from 'react'
import { containerMaxW } from '../config'
import JustboilLogo from './JustboilLogo'

type Props = {
  children: ReactNode
}

export default function FooterBar({ children }: Props) {
  const year = new Date().getFullYear()

  return (
    <footer className={`py-2 px-6 ${containerMaxW} `}>
      <div className="items-center justify-between block md:flex">
        <div className="mb-6 text-center md:text-left md:mb-0">
          <b>
            &copy;{year},{` `}
            <a href="https://justboil.me/" rel="noreferrer" target="_blank">
              JustBoil.me
            </a>
            .
          </b>
          {` `}
          {children}
        </div>
        <div className="md:py-2">
          <a href="https://justboil.me" rel="noreferrer" target="_blank">
            <JustboilLogo className="w-auto h-8 mx-auto md:h-6" />
          </a>
        </div>
      </div>
    </footer>
  )
}
