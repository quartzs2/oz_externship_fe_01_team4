import React, { useState, useEffect } from 'react'
import Modal from '@components/common/Modal'
import Button from '@components/common/Button'
import Label from '@components/common/Label'
import { ADMIN_API_BASE_URL, ADMIN_API_PATH } from '@constants/urls'
import axios from 'axios'

const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUyMjg0NjI2LCJpYXQiOjE3NTIxOTgyMjYsImp0aSI6IjY4ZDcyNWY2M2FkMzRlMWU5ZWJkOGQ3YzZmYTRmYmMyIiwidXNlcl9pZCI6MTJ9.So3vUqKY40wZXVqCc-06w8E48RNj6xpDYjmPP7vBY4s'

// 공통 API 인스턴스
const apiClient = axios.create({
  baseURL: ADMIN_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
})

type CourseDetailData = {
  id: number
  name: string
  tag: string
  description: string
  thumbnail_img_url: string
  created_at: string
  updated_at: string
}

type CourseDetailModalProps = {
  courseId: number | null
  isOpen: boolean
  onClose: () => void
}

// 실제 과정 상세 조회 모달 컴포넌트
const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  courseId,
  isOpen,
  onClose,
}) => {
  const [courseData, setCourseData] = useState<CourseDetailData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // 과정 상세 데이터 axios로 조회
  const getCourseDetail = async (id: number) => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiClient.get(`${ADMIN_API_PATH.COURSES}${id}`)
      setCourseData(response.data)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
          case 401:
            setError('인증 자격이 없습니다.')
            break
          case 403:
            setError('접근 권한이 없습니다.')
            break
          case 404:
            setError('요청하신 과정이 존재하지 않습니다.')
            break
          default:
            setError('데이터를 불러오는 중 오류가 발생했습니다.')
        }
      } else {
        setError('알 수 없는 오류가 발생했습니다.')
      }
    } finally {
      setLoading(false)
    }
  }

  // 모달이 열릴 때 데이터 조회
  useEffect(() => {
    if (isOpen && courseId !== null) {
      getCourseDetail(courseId)
    }
  }, [isOpen, courseId])

  // 모달이 닫힐 때 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setCourseData(null)
      setError(null)
    }
  }, [isOpen])

  return (
    <>
      {/* 과정 상세 조회 모달 */}
      <Modal
        modalId="course-detail-modal"
        isOpen={isOpen}
        onClose={onClose}
        className="h-[643px] w-[938px] overflow-y-auto"
      >
        <div className="pr-8">
          <h2 className="mb-6 text-xl font-semibold text-[#666666]">
            과정 상세 조회
          </h2>

          {/* 로딩 상태 */}
          {loading && (
            <div className="flex h-40 items-center justify-center">
              <div className="text-lg text-[#666666]">로딩 중...</div>
            </div>
          )}

          {/* 에러 상태 */}
          {error && (
            <div className="flex h-40 items-center justify-center">
              <div className="text-lg text-red-600">{error}</div>
            </div>
          )}

          {courseData && !loading && !error && (
            <div className="border border-[#DDDDDD]">
              {/* 첫 번째 줄: ID, 등록일시, 수정일시 */}
              <div className="flex h-[48px] w-full">
                {/* ID */}
                <div className="flex h-[48px] border-r border-[#DDDDDD]">
                  <Label
                    htmlFor=""
                    labelText="ID"
                    className="h-[48px] w-[130px]"
                  />
                  <div className="flex h-[48px] w-[78px] flex-none items-center justify-center bg-white px-[22px] py-[14px] text-center text-[14px] text-[#666666]">
                    {courseData.id}
                  </div>
                </div>
                {/* 등록일시 */}
                <div className="flex h-[48px] border-r border-[#DDDDDD]">
                  <Label
                    htmlFor=""
                    labelText="등록일시"
                    className="h-[48px] w-[130px]"
                  />
                  <div className="flex h-[48px] w-[178px] flex-none items-center justify-center bg-white px-[22px] py-[14px] text-center text-[14px] text-[#666666]">
                    {courseData.created_at}
                  </div>
                </div>
                {/* 수정일시 */}
                <div className="flex h-[48px]">
                  <Label
                    htmlFor=""
                    labelText="수정일시"
                    className="h-[48px] w-[130px]"
                  />
                  <div className="flex h-[48px] w-[178px] flex-none items-center justify-center bg-white px-[22px] py-[14px] text-center text-[14px] text-[#666666]">
                    {courseData.updated_at}
                  </div>
                </div>
              </div>

              {/* 두 번째와 세 번째 줄: 과정명/과정태그, 썸네일 로고 */}
              <div className="flex border-t border-[#DDDDDD]">
                {/* 왼쪽: 과정명과 과정태그 */}
                <div className="flex flex-col border-r border-[#DDDDDD]">
                  {/* 과정명 */}
                  <div className="flex">
                    <Label
                      htmlFor=""
                      labelText="과정명"
                      className="h-[96px] w-[130px]"
                    />
                    <div className="w-[386px] rounded-[3px] bg-white px-[22px] py-[14px] text-left text-[14px] text-[#666666]">
                      {courseData.name}
                    </div>
                  </div>
                  {/* 과정태그 */}
                  <div className="flex border-t border-[#DDDDDD]">
                    <Label
                      htmlFor=""
                      labelText="과정태그"
                      className="h-[96px] w-[130px]"
                    />
                    <div className="w-[386px] rounded-[3px] bg-white px-[22px] py-[14px] text-left text-[14px] text-[#666666]">
                      {courseData.tag}
                    </div>
                  </div>
                </div>

                {/* 오른쪽: 썸네일 로고 (두 행에 걸쳐 표시) */}
                <div className="flex">
                  <Label
                    htmlFor=""
                    labelText="썸네일 로고"
                    className="h-[191px] w-[130px]"
                  />
                  <div className="w-[176px] bg-white px-[22px] py-[14px]">
                    <div className="flex items-center space-x-3">
                      <div className="flex w-full items-center justify-center">
                        {courseData.thumbnail_img_url ? (
                          <img
                            src={courseData.thumbnail_img_url}
                            alt="과정 썸네일"
                            className="h-24 w-24 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black">
                            <span className="text-lg font-bold text-white">
                              OZ
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 네 번째 줄: 자기소개 */}
              <div className="flex border-t border-[#DDDDDD]">
                <Label
                  htmlFor=""
                  labelText="자기소개"
                  className="h-[169px] w-[130px]"
                />
                <div className="w-[689px] rounded-[3px] bg-white px-[22px] py-[14px]">
                  <div className="whitespace-pre-line text-[14px] text-[#666666]">
                    {courseData.description || '과정 설명이 없습니다.'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 버튼 */}
          <div className="mt-13 flex justify-end space-x-3 pt-6">
            <Button variant="VARIANT1" disabled={loading}>
              수정
            </Button>
            <Button variant="VARIANT4" disabled={loading}>
              삭제
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default CourseDetailModal
