import Logo from '@assets/ozcoding_logo_black.svg'
import Button from '@components/common/Button'
import { cn } from '@utils/cn'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // 버튼 비활성화 여부
  const isDisabled = !email || !password

  // API 추후 수정
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // API 추후 연결

    if (!isDisabled) navigate('/main')
  }

  return (
    <div className="flex h-screen">
      <div className="flex w-1/2 items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-[24px]">
          <h1>
            <img src={Logo} alt="OZ 오즈코딩스쿨" />
          </h1>
          <p className="text-[12px] text-[#000A30]">
            <span className="text-[#522193]">admin 계정</span>을 통해 로그인을
            진행해주세요.
          </p>
          <form onSubmit={handleSubmit} className="w-[328px] space-y-[12px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="아이디 (example@gmail.com)"
              className="h-[48px] w-full rounded-[4px] border-1 border-[#DDD] px-[14px] py-[10px] text-[14px] tracking-tight text-[#222] placeholder-[#BDBDBD] outline-none"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 (6~15자의 영문 대소문자, 숫자, 특수문자 포함)"
              className="h-[48px] w-full rounded-[4px] border-1 border-[#DDD] px-[14px] py-[10px] text-[14px] tracking-tight text-[#222] placeholder-[#BDBDBD] outline-none"
            />

            <Button
              children="로그인"
              disabled={isDisabled}
              className={cn('h-[52px] w-full rounded-[4px] text-[16px]', {
                'bg-[#666]': isDisabled,
              })}
            />
          </form>
        </div>
      </div>
      <div className="w-1/2 bg-[#f2effd]"></div>
    </div>
  )
}

export default Login
