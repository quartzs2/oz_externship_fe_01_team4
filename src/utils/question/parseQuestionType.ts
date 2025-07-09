import type { QuestionType } from '@custom-types/quizzes/quizTypes'

type ParseQuestionTypeProps = {
  questionType: QuestionType
}

export const parseQuestionTypeToString = ({
  questionType,
}: ParseQuestionTypeProps): string => {
  switch (questionType) {
    case 'multiple_choice_single':
      return '다지선다형'
    case 'multiple_choice_multi':
      return '다지선다형(다중선택)'
    case 'ox':
      return '참/거짓형 (O/X)'
    case 'ordering':
      return '순서 정렬'
    case 'fill_in_blank':
      return '빈칸 채우기'
    case 'short_answer':
      return '주관식 단답형'
    default:
      return '지원하지 않는 형식'
  }
}
