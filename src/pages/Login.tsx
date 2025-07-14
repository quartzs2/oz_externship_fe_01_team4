import Logo from '@assets/ozcoding_logo_black.svg'
import Button from '@components/common/Button'
import { useAuth } from '@hooks/useAuth'
import { cn } from '@utils/cn'
import PopUp from '@components/common/PopUp'
import { POP_UP_TYPE } from '@constants/popup/popUp'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { ADMIN_API_PATH } from '@constants/urls'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // 버튼 비활성화 여부
  const isDisabled = !email || !password

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('') // 이전 에러 메시지 초기화
    setIsPopupOpen(false) // 이전 팝업 닫기

    if (isDisabled) return

    try {
      const isLoggedIn = await login({ email, password })

      if (isLoggedIn) {
        navigate(ADMIN_API_PATH.MAIN)
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'LOGIN_LOCKED_OUT') {
          setIsPopupOpen(true)
        } else if (err.message === 'INVALID_CREDENTIALS') {
          setError(
            '로그인 입력정보가 일치하지 않습니다. 확인 후 다시 시도해주세요.'
          )
        } else {
          setError('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
        }
      } else {
        setError('로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      }
    }
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

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              disabled={isDisabled}
              className={cn('h-[52px] w-full rounded-[4px] text-[16px]', {
                'bg-[#666]': isDisabled,
              })}
            >
              로그인
            </Button>
          </form>
        </div>
      </div>
      <div className="w-1/2 bg-[#f2effd]"></div>

      <PopUp
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        type={POP_UP_TYPE.ERROR}
      >
        <PopUp.Title>로그인 차단</PopUp.Title>
        <PopUp.Description>10분간 로그인이 불가능 합니다.</PopUp.Description>
        <PopUp.Buttons>
          <Button variant="VARIANT9" onClick={() => setIsPopupOpen(false)}>
            확인
          </Button>
        </PopUp.Buttons>
      </PopUp>
    </div>
  )
}

export default Login
