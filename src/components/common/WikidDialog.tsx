'use client'

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
  CardContent,
  Typography,
} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { NotificationList, NotificationsData } from '@/api/swagger/Wikid.types'
import { useEffect, useState } from 'react'

//알림 모달 다이얼로그
export const NotificationModal = (props: {notifies: NotificationsData | null}) => {
  const [notifies, setNotifies] = useState<NotificationsData | null>(props.notifies)
  const [open, setOpen] = useState(false)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
    id?: number,
  ) => {
    console.log('handleClose', reason)
    if (reason === 'clickaway') {
      return
    }
    if(reason === 'delete') {
      const newlist = notifies?.list?.filter((item) => item.id !== id)
      setNotifies({ totalCount: (notifies?.totalCount ?? 0) - 1, list: newlist ?? [] })
      return
    }
    setOpen(false)
  }

  useEffect(() => {
    setNotifies(props.notifies)
    setOpen(true)
  }, [props])

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
        fullWidth
        maxWidth="sm"
        >
        <DialogTitle id="dialog-title">
          <Box display="flex" alignItems="center">
            <Box flexGrow={1} >{`알림 ${notifies?.totalCount}개`}</Box>
            <Box>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='dialog-description' component={'span'}>
            {notifies?.list?.map((notify: NotificationList, index: number) => (
              <Card key={index} sx={{ marginBottom: '10px' }}>
                <CardContent>
                  <Box display="flex" alignItems="left" justifyContent="space-between">
                    <Box>
                      <IconButton>
                        <FiberManualRecordIcon />
                      </IconButton>
                    </Box>
                    <Box>
                      <IconButton onClick={(e) => handleClose(e, 'delete', notify.id)} >
                        <CloseIcon />
                      </IconButton>
                    </Box>                    
                  </Box>                  
                  <Typography variant='body2' color='text.secondary'>
                    {notify.content}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )
}

//TODO: 위키 참여 인증 모달 다이얼로그(작업중)
export const CertificationModal = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'>
        <DialogTitle id='dialog-title'>Submit the test?</DialogTitle>
        <DialogContent>
          <DialogContentText id='dialog-description' component={'span'}>
            Are you sure you want to submit the test? You will not be able to
            edit it after submitting.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)} autoFocus>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

//TODO: 접속 끊김 모달 다이얼로그 (작업중)
export const DisconnectedModal = () => {
  const [open, setOpen] = useState(false)
  
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    console.log('handleClose', reason)
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  
  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'>
        <DialogTitle id="dialog-title">
          <Box display="flex" alignItems="center">
            <Box>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box flexGrow={1} >{`5분 이상 글을 쓰지 않아 접속이 끊어졌어요.`}</Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='dialog-description' component={'span'}>
            위키 참여하기를 통해 다시 위키를 수정해 주세요.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: '#066d84',
              color: '#000000',
              borderRadius: '4px',
              padding: '10px 16px',
              fontSize: '14px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#0cc4ee',
              },
            }}
            onClick={() => setOpen(false)}
            autoFocus>
              확인
            </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
//TODO: 저장하지않고 나가기 모달 다이얼로그 (작업중)
export const ExitNotSavedModal = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'>
        <DialogTitle id='dialog-title'>{'저장하지 않고 나가시겠습니까?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='dialog-description' component={'span'}>
            {'작성하신 모든 내용이 사라집니다.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='error' autoFocus>
            페이지 나가기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

//TODO: 이미지 삽입 모달 다이얼로그 (작업중)
export const ImageInsertModal = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'>
        <DialogTitle id='dialog-title'>Submit the test?</DialogTitle>
        <DialogContent>
          <DialogContentText id='dialog-description' component={'span'}>
            Are you sure you want to submit the test? You will not be able to
            edit it after submitting.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
