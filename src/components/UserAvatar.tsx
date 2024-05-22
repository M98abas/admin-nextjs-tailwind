/* eslint-disable @next/next/no-img-element */
// Why disabled:
// avatars.dicebear.com provides svg avatars
// next/image needs dangerouslyAllowSVG option for that

import React, { ReactNode } from 'react'

type Props = {
  username: string
  avatar?: string | null
  api?: string
  className?: string
  children?: ReactNode
}

export default function UserAvatar({
  username,
  avatar = null,
  api = 'avataaars',
  className = '',
  children,
}: Props) {
  const avatarImage =
    avatar ?? `https://api.dicebear.com/8.x/initials/svg?seed=${username.replace(/[^a-z0-9]+/i, '-')}`

  return (
    <div className={className}>
      <img
        src={avatarImage}
        alt={username}
        className="block w-full h-auto max-w-full bg-gray-100 rounded-full dark:bg-slate-800"
      />
      {children}
    </div>
  )
}
