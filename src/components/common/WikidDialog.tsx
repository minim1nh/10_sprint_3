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
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { NotificationList, NotificationsData, ImageUploadProps } from '@/api/swagger/Wikid.types'
import { useEffect, useState } from 'react'
import { postImagesUpload } from '@/api/swagger/Image';


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

//접속 끊김 모달 다이얼로그
export const DisconnectedModal = () => {
  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    setOpen(true)
  }, [])

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
                  <Box display="flex" justifyContent={'end'}>
                      <IconButton onClick={() => setOpen(false)}>
                          <CloseIcon />
                      </IconButton>
                  </Box>
              </DialogTitle>                
              <DialogContent>
                  <DialogContentText id='dialog-description' sx={{fontSize: '18px', fontWeight: 'bold'}}>
                    {`5분 이상 글을 쓰지 않아 접속이 끊어졌어요.`}
                  </DialogContentText>
                  <DialogContentText id='dialog-description'>
                    {'위키 참여하기를 통해 다시 위키를 수정해 주세요.'}
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button
                      onClick={() => setOpen(false)}
                      variant='contained'
                      color='primary'
                      sx={{ backgroundColor: '#4CBFA4'}}
                      >
                          확인
                  </Button>
              </DialogActions>
          </Dialog>
    </>
  )
}

//저장하지않고 나가기 모달 다이얼로그
export const ExitNotSavedModal = () => {

  const [open, setOpen] = useState(false)

  useEffect(() => {
      console.log('ExitNotSavedModal')
      setOpen(true)
  }, [])

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
                  <Box display="flex" justifyContent={'end'}>
                      <IconButton onClick={() => setOpen(false)}>
                          <CloseIcon />
                      </IconButton>
                  </Box>
              </DialogTitle>                
              <DialogContent>
                  <DialogContentText id='dialog-description' sx={{fontSize: '18px', fontWeight: 'bold'}}>
                      {'저장하지 않고 나가시겠어요?'}
                  </DialogContentText>
                  <DialogContentText id='dialog-description'>
                      {'작성하신 모든 내용이 사라집니다.'}
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                    onClick={() => setOpen(false)}
                    variant='contained'
                    color='error'
                    >
                        페이지 나가기
                </Button>
              </DialogActions>
          </Dialog>
      </>
  )
}

//TODO: 이미지 삽입 모달 다이얼로그 (작업중)
export const ImageInsertModal = () => {

  const [images, setImages] = useState<string[]>([]);
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(true)
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
    e.preventDefault();
    console.log("event", e);
    if (e.target.files) {
      const ProductImg = [...e.target.files];
      const images = ProductImg.map((image) => URL.createObjectURL(image));
      setImages(images);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    const props: ImageUploadProps = {
      path: images[0]
    }
    console.log('handleClose', reason)
    if (reason === 'clickaway') {
      return
    }
    if(reason === 'upload') { // 이미지 전송
      console.log('image upload path: ', props)
      try {
        postImagesUpload(props)
      } catch (error) {
        console.log('error', error)
      }
    }
    setOpen(false)
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'>
        <DialogTitle id="dialog-title">
          <Box display="flex" justifyContent={'end'}>
              <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon />
              </IconButton>
          </Box>
        </DialogTitle>       
        <DialogContent>
          <DialogContentText id='dialog-description' component={'span'}>
            <form>
              <p>
                <label htmlFor="file">Upload images</label>
                <input
                  type="file"
                  id="file"
                  onChange={handleImageChange}
                  accept="image/png, image/jpg, image/jpeg"
                  // multiple
                />
              </p>
            </form>
          </DialogContentText>
          <DialogContentText id='dialog-description' component={'span'}>
            <Box>
              <div className="">
                {images.length > 0 && (
                  <div>
                    {images.map((image, index) => (
                      <p key={index}>
                        <img src={image} alt="" />
                      </p>
                    ))}
                  </div>
                )}
                {images.length == 0 && (
                    <IconButton disabled={true} sx={{
                      bgcolor: 'background.paper',
                      boxShadow: 1,
                      borderRadius: 2,
                      p: 1,
                      minWidth: 354,
                      minHeight: 206,
                    }}>
                      <CameraAltIcon />
                    </IconButton>
                )}
              </div>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button
            onClick={(e) => handleClose(e, 'upload')}
            variant='contained'
            color='secondary'
            >
                삽입하기
        </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
