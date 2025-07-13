import { useState, type Dispatch, type SetStateAction } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import SlideItem from '@components/quizzes/detail-modal/components/SlideItem'
import type { Question, QuizData } from '@custom-types/quizzes/quizTypes'
import ozRoundLogoUrl from '@assets/oz_round_logo.svg'
import Button from '@components/common/Button'
import NoQuestionSlideItem from '@components/quizzes/detail-modal/components/NoQuestionSlideItem'
import { formatIsoToDotDateTime } from '@utils/formatDate'

type QuizzesWrapperProps = {
  quizData: QuizData
  questions: Question[]
  setIsAddQuizModalOpen: (isOpen: boolean) => void
  setQuestions: Dispatch<SetStateAction<Question[]>>
  handleSubmit: () => void
}

const QuizzesWrapper = ({
  quizData,
  questions,
  setIsAddQuizModalOpen,
  setQuestions,
  handleSubmit,
}: QuizzesWrapperProps) => {
  const {
    title,
    subject,
    thumbnail_img_url: thumbnailImgUrl,
    created_at: createdAt,
    updated_at: updatedAt,
  } = quizData

  const totalQuestions = questions.length
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-[30px]">
      <div className="flex w-full items-center justify-between border-gray-200 p-6">
        <div className="flex items-center gap-[25px]">
          <div className="flex items-center gap-[11px]">
            <img
              src={thumbnailImgUrl}
              alt="thumbnail"
              className="h-[32px] w-[32px]"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                // 무한 루프 방지
                target.onerror = null
                // OZ SVG 로고로 변경
                target.src = ozRoundLogoUrl
              }}
            />
            <div className="text-[20px] font-semibold text-[#666666]">
              {title}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-sm/[24px] text-[#666666]">
              과목 : {subject.name} 문제 수 : {totalQuestions}
            </p>
          </div>
        </div>

        <div className="text-sm text-[#666666]">
          <p>등록일시 : {formatIsoToDotDateTime(createdAt, true)}</p>
          <p>수정일시 : {formatIsoToDotDateTime(updatedAt, true)}</p>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="h-[600px] w-[1060px] rounded-[12px] border border-[#D9D9D9] bg-white"
        onSlideChange={(swiper) => setCurrentSlideIndex(swiper.activeIndex)}
      >
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <SwiperSlide key={question.id}>
              <SlideItem
                question={question}
                index={index}
                setIsAddQuizModalOpen={setIsAddQuizModalOpen}
                setQuestions={setQuestions}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide key={'no-question'}>
            <NoQuestionSlideItem
              setIsAddQuizModalOpen={setIsAddQuizModalOpen}
            />
          </SwiperSlide>
        )}
      </Swiper>

      <div className="mt-[32px] flex w-full items-center justify-between gap-[10px] text-[16px] text-[#666666]">
        <div>
          {questions.length > 0
            ? `${currentSlideIndex + 1}/${totalQuestions}`
            : '0/0'}
        </div>
        <Button onClick={handleSubmit}>저장</Button>
      </div>
    </div>
  )
}

export default QuizzesWrapper
