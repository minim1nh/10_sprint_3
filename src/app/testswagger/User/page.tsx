'use client'

import { Box, Button, Typography } from '@mui/material';
import { NotificationModal, CertificationModal, DisconnectedModal, ExitNotSavedModal, ImageInsertModal } from '@/components/common/WikidDialog';
import { NotificationsData } from '@/api/swagger/Wikid.types';
import { getNotifications } from '@/api/swagger/Notification';
import { useEffect, useState } from 'react';

const UserTest = () => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isCertificationModalOpen, setIsCertificationModalOpen] = useState(false);
  const [isDisconnectedModalOpen, setIsDisconnectedModalOpen] = useState(false);
  const [isExitNotSavedModalOpen, setIsExitNotSavedModalOpen] = useState(false);
  const [isImageInsertModalOpen, setIsImageInsertModalOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [notifies, setNotifies] = useState<NotificationsData | null>(null);

  
  useEffect(() => {
    //for ImageInsertModal
    if (isImageInsertModalOpen) {
      setUrl('')
    }
  
  }, [isImageInsertModalOpen])

  //for NotificationModal
  const initNotifies = () => {
    const fetchNotifications = async () => {
      const res = await getNotifications(999)
      setNotifies(res);
    }
    
    fetchNotifications();  
  }

  const handleImageUpload = (url: string) => {
    setUrl(url)
  }

  const handleNotificationModal = () => {
    initNotifies();
    setIsNotificationModalOpen(true)
    setIsCertificationModalOpen(false)
    setIsDisconnectedModalOpen(false)
    setIsExitNotSavedModalOpen(false)
    setIsImageInsertModalOpen(false)
  }
  const handleCertificationModal = () => {
    setIsNotificationModalOpen(false)
    setIsCertificationModalOpen(true)
    setIsDisconnectedModalOpen(false)
    setIsExitNotSavedModalOpen(false)
    setIsImageInsertModalOpen(false)
  }
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
        <Button variant='outlined' onClick={() => handleCertificationModal()}>위키참여인증 모달</Button>
        <Button variant='outlined' onClick={() => handleDisconnectedModal()}>접속끊김 모달</Button>
        <Button variant='outlined' onClick={() => handleExitNotSavedModal()}>저장하지않고 나가기 모달</Button>
        <Button variant='outlined' onClick={() => handleImageInsertModal()}>이미지 삽입 모달</Button>
      </Box>
      <br />
      {isNotificationModalOpen && <NotificationModal notifies={notifies} />}
      {isCertificationModalOpen && <CertificationModal />}
      {isDisconnectedModalOpen && <DisconnectedModal />}
      {isExitNotSavedModalOpen && <ExitNotSavedModal />}
      {isImageInsertModalOpen && <ImageInsertModal callbackhandler={handleImageUpload} />}
      {url && <Typography variant='h6'>업로드한 이미지: {url}</Typography>}
    </>
  )
}

export default UserTest