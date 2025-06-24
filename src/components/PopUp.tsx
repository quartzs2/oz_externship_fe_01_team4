import Modal from '@components/Modal'
import Icon from '@components/Icon'
import { cn } from '@utils/cn'

import SuccessIcon from '@assets/icons/popup/success.svg?react'
import WarningIcon from '@assets/icons/popup/error.svg?react'
import ErrorIcon from '@assets/icons/popup/deleteConfirm.svg?react'
import { POP_UP_TYPE, type PopUpType } from '@constants/popUp'
import { PADDING_SIZE } from '@constants/modal'

type PopUpProps = {
  isOpen: boolean
  onClose: () => void
  type: PopUpType
}

const POP_UP_CONFIG = {
  [POP_UP_TYPE.SUCCESS]: {
    title: '게시글 수정이 정상적으로 완료되었습니다.',
    description: '리스트에서 변경사항이 잘 적용되었는지 확인해보세요.',
    icon: SuccessIcon,
    iconBgColor: 'rgba(124,53,217,0.1)',
  },
  [POP_UP_TYPE.ERROR]: {
    title: '게시글 수정 중 오류가 발생하였습니다.',
    description: '해당 오류가 지속적으로 발생하는 경우\n관리자에게 문의하세요.',
    icon: WarningIcon,
    iconBgColor: 'rgba(246,168,24,0.21)',
  },
  [POP_UP_TYPE.DELETE_CONFIRM]: {
    title: '해당 댓글을 정말 삭제하시겠습니까?',
    description: '댓글을 삭제하면 다시 되돌릴 수 없습니다.',
    icon: ErrorIcon,
    iconBgColor: 'rgba(204,10,10,0.12)',
  },
}

const PopUp = ({ isOpen, onClose, type }: PopUpProps) => {
  const config = POP_UP_CONFIG[type]

  if (!config) {
    return null
  }

  return (
    <Modal
      modalId={`popup-${type}`}
      isOpen={isOpen}
      onClose={onClose}
      closeButtonOffset={13}
      className="h-[267px] w-[426px] items-center"
    >
      <div
        className={cn(
          'flex h-[60px] w-[60px] items-center justify-center rounded-[50%]'
        )}
        style={{
          backgroundColor: config.iconBgColor,
          marginTop: `${37 - PADDING_SIZE.DEFAULT}px`,
        }}
      >
        <Icon icon={config.icon} size={42} />
      </div>
      <div className="pt-[14px] text-[18px] font-semibold text-grey-600">
        {config.title}
      </div>
      <div className="pt-[14px] text-center text-[14px] break-keep whitespace-pre-line text-grey-500">
        {config.description}
      </div>
      {/* TODO: Button 들어갈 위치*/}
    </Modal>
  )
}

export default PopUp
