import CommunityIcon from '@assets/icons/sidebar/community.svg?react'
import CourseIcon from '@assets/icons/sidebar/course.svg?react'
import QnaIcon from '@assets/icons/sidebar/qna.svg?react'
import TestIcon from '@assets/icons/sidebar/test.svg?react'
import UserIcon from '@assets/icons/sidebar/user.svg?react'
import type { MenuItem } from '@custom-types/menu'

export const menuData: MenuItem[] = [
  {
    menuIcon: UserIcon,
    mainMenu: '회원관리',
    subMenu: [
      { name: '유지 관리', path: '' },
      { name: '수강생 관리', path: '' },
      { name: '수강생 등록 신청', path: '' },
      { name: '회원 탈퇴 관리', path: '' },
      { name: '대시보드', path: '' },
    ],
  },
  {
    menuIcon: QnaIcon,
    mainMenu: '질의응답 관리',
    subMenu: [
      { name: '질의응답 관리', path: '' },
      { name: '카테고리 관리', path: '' },
    ],
  },
  {
    menuIcon: CommunityIcon,
    mainMenu: '커뮤니티 관리',
    subMenu: [
      { name: '게시글 관리', path: '' },
      { name: '카테고리 관리', path: '' },
      { name: '공지사항 등록', path: '' },
    ],
  },
  {
    menuIcon: TestIcon,
    mainMenu: '쪽지시험 관리',
    subMenu: [
      { name: '쪽지시험 관리', path: '/quizzes' },
      { name: '배포 내역 관리', path: '/quizzes/deployments' },
      { name: '응시 내역 관리', path: '/quizzes/submissions' },
      { name: '쪽지시험 대시보드', path: '/quizzes/dashboard' },
    ],
  },
  {
    menuIcon: CourseIcon,
    mainMenu: '과정 관리',
    subMenu: [
      { name: '과정 관리', path: '/courses' },
      { name: '기수 관리', path: '/courses/generations' },
      { name: '과목 관리', path: '/courses/subjects' },
      { name: '대시보드', path: '/courses/CourseDashboard' },
    ],
  },
]
