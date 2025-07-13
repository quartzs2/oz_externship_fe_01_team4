import NoImageIcon from '@assets/icons/quizzes/detail-modal/noImage.svg?react'
import Icon from '@components/common/Icon'
import AddQuestionIcon from '@assets/icons/quizzes/detail-modal/addQuestion.svg?react'

type NoQuestionSlideItemProps = {
  setIsAddQuizModalOpen: (isOpen: boolean) => void
}

const NoQuestionSlideItem = ({
  setIsAddQuizModalOpen,
}: NoQuestionSlideItemProps) => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-[37px] p-[30px]">
      <button
        className="absolute top-[20px] right-[20px]"
        onClick={() => setIsAddQuizModalOpen(true)}
      >
        <Icon icon={AddQuestionIcon} size={24} />
      </button>
      <Icon icon={NoImageIcon} size={120} />
      <div className="flex flex-col items-center justify-center gap-[13px]">
        <div className="text-[18px] font-semibold text-[#222222]">
          등록된 문제가 없습니다.
        </div>
        <div className="text-[14px] text-[#666666]">
          수강생들이 학습할 수 있도록 문제를 등록해주세요!
        </div>
      </div>
    </div>
  )
}
export default NoQuestionSlideItem
