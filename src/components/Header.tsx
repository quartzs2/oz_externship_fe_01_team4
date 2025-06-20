import Profile from '@assets/Profile.svg'
import type { User } from '@customType/user'

type HeaderProfile = {
  user?: User
}

export default function Header({ user }: HeaderProfile) {
  const defaultUser: Required<User> = {
    name: 'Admin',
    profileUrl: Profile,
  }

  const loginUser = {
    name: user?.name ?? defaultUser.name,
    profileUrl: user?.profileUrl ?? defaultUser.profileUrl,
  }

  return (
    <header>
      <div className="w-full h-[80px] bg-[#F3EEFF] flex justify-end items-center pr-12">
        <img
          src={loginUser.profileUrl}
          alt="profile icon"
          className="w-[26px]"
        />
        <div className="text-primary-600 text-[18px] ml-2">
          {loginUser.name} 님
        </div>
      </div>
    </header>
  )
}
