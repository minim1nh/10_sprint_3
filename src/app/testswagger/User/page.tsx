'use client'

import { Box, Button } from '@mui/material';
import { NotificationModal, CertificationModal, DisconnectedModal, ExitNotSavedModal, ImageInsertModal } from '@/components/common/WikidDialog';
import { NotificationsData } from '@/api/swagger/Wikid.types';
import { useState } from 'react';

const UserTest = () => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isCertificationModalOpen, setIsCertificationModalOpen] = useState(false);
  const [isDisconnectedModalOpen, setIsDisconnectedModalOpen] = useState(false);
  const [isExitNotSavedModalOpen, setIsExitNotSavedModalOpen] = useState(false);
  const [isImageInsertModalOpen, setIsImageInsertModalOpen] = useState(false);

  const notifies: NotificationsData = {
    totalCount: 2,
    list: [
      {
        id: 1,
        content: '테스트 알림 내용1',
        createdAt: '2024-11-24 10:00',
      },
      {
        id: 2,
        content: '테스트 알림 내용2',
        createdAt: '2024-11-25 10:00',
      },
    ]
  }

  const handleNotificationModal = () => {
    setIsNotificationModalOpen(true)
    setIsCertificationModalOpen(false)
    setIsDisconnectedModalOpen(false)
    setIsExitNotSavedModalOpen(false)
    setIsImageInsertModalOpen(false)
  }
  // const handleCertificationModal = () => {
  //   setIsNotificationModalOpen(false)
  //   setIsCertificationModalOpen(true)
  //   setIsDisconnectedModalOpen(false)
  //   setIsExitNotSavedModalOpen(false)
  //   setIsImageInsertModalOpen(false)
  // }
  const handleDisconnectedModal = () => {
    setIsNotificationModalOpen(false)
    setIsCertificationModalOpen(false)
    setIsDisconnectedModalOpen(true)
    setIsExitNotSavedModalOpen(false)
    setIsImageInsertModalOpen(false)
  }
  const handleExitNotSavedModal = () => {
    setIsNotificationModalOpen(false)
    setIsCertificationModalOpen(false)
    setIsDisconnectedModalOpen(false)
    setIsExitNotSavedModalOpen(true)
    setIsImageInsertModalOpen(false)
  }
  const handleImageInsertModal = () => {
    setIsNotificationModalOpen(false)
    setIsCertificationModalOpen(false)
    setIsDisconnectedModalOpen(false)
    setIsExitNotSavedModalOpen(false)
    setIsImageInsertModalOpen(true)
  }

  return (
    <>
      <Box sx={{ display: 'flex', direction: 'col', gap: '3px', margin: '16px' }} p={2}>
        <Button variant='outlined' onClick={() => handleNotificationModal()}>알림 모달</Button>
        {/* <Button variant='outlined' onClick={() => handleCertificationModal()}>위키참여인증 모달</Button> */}
        <Button variant='outlined' onClick={() => handleDisconnectedModal()}>접속끊김 모달</Button>
        <Button variant='outlined' onClick={() => handleExitNotSavedModal()}>저장하지않고 나가기 모달</Button>
        <Button variant='outlined' onClick={() => handleImageInsertModal()}>이미지 삽입 모달</Button>
      </Box>
      {isNotificationModalOpen && <NotificationModal notifies={notifies} />}
      {isCertificationModalOpen && <CertificationModal />}
      {isDisconnectedModalOpen && <DisconnectedModal />}
      {isExitNotSavedModalOpen && <ExitNotSavedModal />}
      {isImageInsertModalOpen && <ImageInsertModal />}
    </>
  )
}

export default UserTest