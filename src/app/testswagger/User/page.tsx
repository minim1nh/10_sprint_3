'use client'

import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { NotificationModal, CertificationModal, DisconnectedModal, ExitNotSavedModal, ImageInsertModal } from '@/components/common/WikidDialog';
import { NotificationsData } from '@/api/swagger/Wikid.types';

const UserTest = () => {
  const [activeModal, setActiveModal] = useState<typeof NotificationModal | typeof CertificationModal | typeof DisconnectedModal | typeof ExitNotSavedModal | typeof ImageInsertModal | null>(null);

  useEffect(() => {
    setActiveModal(null);
  }, []);

  const handleNotificationModal = () => {
    setActiveModal(NotificationModal);
  };

  const handleCertificationModal = () => {
    setActiveModal(CertificationModal);
  };

  const handleDisconnectedModal = () => {
    setActiveModal(DisconnectedModal);
  };

  const handleExitNotSavedModal = () => {
    setActiveModal(ExitNotSavedModal);
  };

  const handleImageInsertModal = () => {
    setActiveModal(ImageInsertModal);
  };

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

  return (
    <>
      <Box sx={{display:'flex', direction: 'col', gap: '3px', margin:'16px'}} p={2}>
        <Button variant='outlined' onClick={handleNotificationModal}>알림 모달</Button>
        <Button variant='outlined' onClick={handleCertificationModal}>위키참여인증 모달</Button>
        <Button variant='contained' onClick={handleDisconnectedModal}>접속끊김 모달</Button>
        <Button variant='outlined' onClick={handleExitNotSavedModal}>저장하지않고 나가기 모달</Button>
        <Button variant='outlined' onClick={handleImageInsertModal}>이미지 삽입 모달</Button>
      </Box>
      {activeModal === NotificationModal && <NotificationModal notifies={notifies} />}
      {activeModal === CertificationModal && <CertificationModal />}
      {activeModal === DisconnectedModal && <DisconnectedModal />}
      {activeModal === ExitNotSavedModal && <ExitNotSavedModal />}
      {activeModal === ImageInsertModal && <ImageInsertModal />}
    </>
  )
}

export default UserTest