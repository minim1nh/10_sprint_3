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
  TextField,
} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LockIcon from '@mui/icons-material/Lock';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { NotificationList, NotificationsData, ImageUploadProps, ProfilesCodePingProps } from '@/api/swagger/Wikid.types'
import { useEffect, useState } from 'react'
import { postImagesUpload } from '@/api/swagger/Image';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { isSignIn } from '@/hooks/Token';
import { getProfilesCode, postProfilesCodePing } from '@/api/swagger/Profile';

//알림 모달 다이얼로그
export const NotificationModal = (props: {notifies: NotificationsData | null}) => {
  const [notifies, setNotifies] = useState<NotificationsData | null>(props.notifies)
  const [open, setOpen] = useState(false)
  const router = useRouter();

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
    router.back()
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

//위키 참여 인증 모달 다이얼로그
export const CertificationModal = () => {
  const [code, setCode] = useState('')
  const [question, setQuestion] = useState('') // from getProfilesCode(code)
  const [answer, setAnswer] = useState('') // to postProfilesCodePing(code, { answer })
  const [result, setResult] = useState('')

  const [open, setOpen] = useState(false)
  useEffect(() => {
    console.log('CertificationModal')
    async function initialize() {
      const signin = isSignIn()
      if (signin) {
        setCode(signin.user.profile.code)
        const profilecode = await getProfilesCode(signin.user.profile.code)
        if (profilecode) {
          setQuestion(profilecode.securityQuestion)
        }
      }
    }
    initialize()
    setOpen(true)
  }, [])

  const handleClose = async (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    console.log('handleClose', reason)
    if (reason === 'clickaway') {
      return
    }
    if(reason === 'confirm') {
      try {
        const props = {
          securityAnswer: answer
        } as ProfilesCodePingProps

        const respostanswer = await postProfilesCodePing(code, props)
        if (respostanswer) {
          // 성공적으로 인증이 완료되었습니다.
          setResult('정답이 맞습니다.')
          setTimeout(() => setOpen(false), 1000)
        } else {
          // 인증 실패 또는 오류 처리
          setResult('정답이 아닙니다. 다시 생각해 보세요.')
        }
      } catch (error) {
        //console.error('Error fetching profile:', error)
        //throw error
      }
      return
    }
  }

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
          <Box display="flex" justifyContent={'center'}>
            <IconButton>
                <LockIcon />
            </IconButton>
          </Box>
          <Box sx={{margin:'10px'}} display="flex" justifyContent={'center'}>
            <Typography sx={{fontSize:'14px'}} align='center' color='gray' component={'pre'}>
              {"다음 퀴즈를 맞추고\n위키를 작성해 보세요."}
            </Typography>
          </Box>
        </DialogTitle> 
        <DialogContent>
          <DialogContentText id='dialog-description' component={'span'}>
            <Box display="flex" justifyContent={'left'}>
              <Typography sx={{marginTop:'10px', fontSize:'18px', fontStyle:'bold'}} color='#474D66' component={'span'}>
                {question}
              </Typography>
            </Box>
            <Box display="flex" justifyContent={'center'}>
              <TextField id="standard-basic" label="답안을 입력해 주세요." variant="outlined"
                sx={{marginTop:'10px', backgroundColor:'#FBEDED', borderRadius:'10px'}} 
                fullWidth={true}
                onChange= {(e) => {
                  setResult('')
                  setAnswer(e.target.value)
                }}
              />
            </Box>
            <Box display="flex" justifyContent={'left'}>
              <Typography sx={{marginTop:'10px', fontSize:'12px'}} color='#D14343' variant='subtitle2' component={'span'}>
                {result}
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleClose(e, 'confirm')} sx={{margin:'16px', backgroundColor:'#4CBFA4'}} variant="contained" fullWidth={true}>확인</Button>
        </DialogActions>
        <DialogContent>
          <DialogContentText id='dialog-description' component={'span'}>
          <Typography sx={{fontSize:'12px'}} align='center' color='#8F95B2' component={'pre'}>
                {'위키드는 지인들과 함께하는 즐거운 공간입니다.\n지인에게 상처를 주지 않도록 작성해 주세요.'}
          </Typography>
          </DialogContentText>
        </DialogContent>
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

//이미지 삽입 모달 다이얼로그
export const ImageInsertModal = () => {

  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(true)
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
    e.preventDefault();
    console.log("event", e);
    if (e.target.files) {
      const selectedFiles = [...e.target.files];
      setFiles(selectedFiles);
      const images = selectedFiles.map((file) => URL.createObjectURL(file));
      setImages(images);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    const props: ImageUploadProps = {
      file: files[0]
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
                {/* <label htmlFor="file">이미지</label> */}
                {/* <FormLabel filled={true} htmlFor="file">이미지</FormLabel> */}
                <input
                  // hidden={true}
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
                        <Image src={image} width={302} height={268} alt="" />
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
