import Profile from '@assets/Profile.svg'

type User = {
  name?: string
  profileUrl?: string
}

type HeaderProfile = {
  user?: User
}

export default function Header({ user }: HeaderProfile) {
  const defaultUser: Required<User> = {
    name: 'Admin',
    profileUrl: Profile,
  };

  const loginUser = {
    name: user?.name ?? defaultUser.name,
    profileUrl: user?.profileUrl ?? defaultUser.profileUrl,
  };

  return (
    <div className="w-full h-[80px] bg-[#F3EEFF] flex justify-end items-center pr-12">
      <img
        src={loginUser.profileUrl}
        alt="profile icon"
        className="w-[26px]"
      />
      <div className="text-[#522193] text-[18px] ml-2">
        {loginUser.name} 님
      </div>
    </div>
  )
}
