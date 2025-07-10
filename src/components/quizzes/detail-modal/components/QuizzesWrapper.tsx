import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import SlideItem from '@components/quizzes/detail-modal/components/SlideItem'
import type { Question, QuizData } from '@custom-types/quizzes/quizTypes'

type QuizzesWrapperProps = {
  quizData: QuizData
  questions: Question[]
}

const QuizzesWrapper = ({ quizData, questions }: QuizzesWrapperProps) => {
  const {
    title,
    subject,
    thumbnail_img_url,
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
              src={thumbnail_img_url}
              alt="thumbnail"
              className="h-[32px] w-[32px]"
              onError={() => {
                // TODO: 이미지 없을 때 처리 필요
                console.log('이미지가 없습니다.')
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
          {/* TODO: 시간 파싱 필요 */}
          <p>등록일시 : {createdAt}</p>
          <p>수정일시 : {updatedAt}</p>
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
        {questions.map((question, index) => (
          <SwiperSlide key={question.id}>
            <SlideItem question={question} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-[32px] w-full text-[16px] text-[#666666]">
        {currentSlideIndex + 1}/{totalQuestions}
      </div>
    </div>
  )
}
export default QuizzesWrapper
