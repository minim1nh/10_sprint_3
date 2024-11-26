'use client'
import { NotificationsData } from '@/api/swagger/Wikid.types';
import { NotificationModal } from '@/components/common/WikidDialog';

import { getNotifications } from '@/api/swagger/Notification';
import { useEffect, useState } from 'react';

export default function NotificationPage() {
  // 데이터 모킹
  // TODO: 실제 데이터는 백엔드에서 받아오는 데이터를 사용해야 합니다.
  
  const [notifies, setNotifies] = useState<NotificationsData | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await getNotifications(1);
      setNotifies(res);
    }
    fetchNotifications();
  }, []);

  const moknotifies: NotificationsData = {
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

    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      notifies && <NotificationModal notifies={notifies} />
      <NotificationModal notifies={moknotifies} />
    </div>
  );
}
