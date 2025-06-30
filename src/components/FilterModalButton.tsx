import Button from "@components/Button"
import FilterIcon from "@assets/icons/filter.svg?react"
import Icon from "@components/Icon";
import Modal from "@components/Modal";
import Dropdown from "@components/common/Dropdown";
import Label from "@components/common/Label";
import { useModalStore } from "@store/modalStore";
import type { ReactNode } from "react";

type FilterModalButtonProps = {
  buttonText: string;
  children: ReactNode
}

const FilterModalButton = ({buttonText}: FilterModalButtonProps) => {

  return (
    <>
    <Button 
      onClick={}
      className="flex items-center w-[136px] bg-[#F3EEFF] text-[#522193] text-[14px] gap-[10px] pl-[12px] pr-[18px] py-[10px]"
    >
      <Icon icon={FilterIcon} />
      {buttonText}
    </Button>
    <Modal
      modalId=""
      isOpen={}
      onClose={}
      >
      <Label
        labelText="과정별 필터링"
        htmlFor=""
        className=""
      ></Label>
      <Dropdown 
        id=""
        name=""
        onChange={}
        options={}
        value=""

      />
    </Modal>
    </>  
  )
}

export default FilterModalButton