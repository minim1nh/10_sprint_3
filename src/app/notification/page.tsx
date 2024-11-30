'use client'
import { NotificationsData } from '@/api/swagger/Wikid.types';
import { NotificationModal } from '@/components/common/WikidDialog';

import { getNotifications } from '@/api/swagger/Notification';
import { useEffect, useState } from 'react';

export default function NotificationPage() {
  const [notifies, setNotifies] = useState<NotificationsData | null>(null);
  useEffect(() => {
    const fetchNotifications = async () => {
        const res = await getNotifications(999)
        setNotifies(res);
    }
    fetchNotifications();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NotificationModal notifies={notifies} />
    </div>
  );
}
