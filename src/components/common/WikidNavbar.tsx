"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material";
// import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import MenuIcon from '@mui/icons-material/Menu'
import useScreenWidth, {ScreenType} from '@/hooks/useScreenWidth'
import SessionStorage from '@/api/storage/SessionStorage'
import { isSignIn } from '@/hooks/Token'
import { getUsersMe } from "@/api/swagger/User";

export const WikidNavbar = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownMenuElement, setDropdownMenuElement] = useState<null | HTMLElement>(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const screenwidth = useScreenWidth();
  
  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setIsClient(prev => prev);
      setIsLoggedIn(isSignIn() ? true : false);
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  const onMenuIconOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDropdownMenuElement(event.currentTarget);
    setIsOpenMenu(true);
  };

  const onMenuIconClose = () => {
    setDropdownMenuElement(null);
    setIsOpenMenu(false);
  };

  const router = useRouter();

  const isMobile = (screenwidth < ScreenType.MOBILE) ? true : false;

  //로그인 클릭 시 페이지 이동
  const onClickLogin = () => { onMenuIconClose(); router.push('/login') }

  //위키목록 클릭 시 페이지 이동
  const onClickWikiList = () => { onMenuIconClose(); router.push("/wikilist") }

  //자유게시판 클릭 시 페이지 이동
  const onClickBoards = () => { onMenuIconClose(); router.push('/boards') }

  //알림 메뉴 클릭 시 페이지 이동
  const onClickNotification = () => { onMenuIconClose(); router.push('/notification') }

  //계정설정 메뉴 클릭 시 페이지 이동
  const onClickAccountSettings = () => { onMenuIconClose(); router.push('/mypage') }

  //내 위키 메뉴 클릭 시 페이지 이동
  const onClickMyWiki = async () => {
    onMenuIconClose();
    try {
      const resData = await getUsersMe();
      console.log('getUsersMe() response: ', resData)
      const profile = resData?.profile
      const code = profile?.code
      if(code) {
        router.push(`/wiki?code=${code}`)
      } else {
        console.log('code is null')
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  //로그아웃 메뉴 클릭 시 페이지 이동
  const onClickLogout = () => {
    if(isClient) {
      SessionStorage.clear();
    }
    onMenuIconClose();
    router.push('/landingpage')
  }

  const resetDropdownMenu = () => {
    return (
      <Menu
        id='resources-menu'
        anchorEl={dropdownMenuElement}
        open={isOpenMenu}
        onClose={onMenuIconClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        MenuListProps={{
          'aria-labelledby': 'resources-button'
        }}>
        {/* 로그인 && 모바일 메뉴 */}
        {(isLoggedIn) && (isMobile) &&
          <>
            <MenuItem onClick={onClickWikiList}>위키목록</MenuItem>
            <MenuItem onClick={onClickBoards} divider={true}>자유계시판</MenuItem>
          </>
        }
        {/* 로그인 후속 메뉴 */}
        {(isLoggedIn) &&
          <>
            <MenuItem onClick={onClickAccountSettings}>계정설정</MenuItem>
            <MenuItem onClick={onClickMyWiki} divider={true}>내 위키</MenuItem>
            <MenuItem onClick={onClickLogout}>로그아웃</MenuItem>
          </>
        }
        {/* 초기 메뉴 */}
        {Boolean(!isSignIn()) &&
          <>
            <MenuItem onClick={onClickWikiList}>위키목록</MenuItem>
            <MenuItem onClick={onClickBoards} divider={true}>자유계시판</MenuItem>
            <MenuItem onClick={onClickLogin}>로그인</MenuItem>
          </>
        }
      </Menu>
    )
  }

  return (
    <AppBar position='static' color='transparent' >
      <Toolbar sx={{ height: '60px' }}>
        <IconButton size='large'>
          <Image onClick={()=>router.push('/landingpage')} src="/images/img/img_W.svg" alt='Wikid Logo' width={48} height={48} priority />
        </IconButton>
        <Typography sx={{ flexGrow: -1, fontWeight: 800, fontSize: '24px', lineHeight: '28px', color: 'lightgray' }} width={100}>
          WIKID
        </Typography>

        {/* 로그아웃(초기) 헤더 메뉴 */}
        {(isClient) && (!isMobile) && Boolean(!isSignIn()) &&
          // 로그아웃 상태 메뉴
          <>
            <Stack direction='row' sx={{ flexGrow: 1}} spacing={2} marginLeft={3} >
              <Button onClick={onClickWikiList} color='inherit'>위키목록</Button>
              <Button onClick={onClickBoards} color='inherit'>자유게시판</Button>
            </Stack>
            <Stack direction='row' spacing={2} marginLeft={3} >
              <Button onClick={onClickLogin} color='inherit'>로그인</Button>
            </Stack>
          </>
        }
        {/* 로그인(아이콘) 헤더 메뉴 */}
        {(isClient) && (!isMobile) && (isLoggedIn) &&
          <>
          <Stack direction='row' sx={{ flexGrow: 1}} spacing={2} marginLeft={3} >
            <Button onClick={onClickWikiList} color='inherit'>위키목록</Button>
            <Button onClick={onClickBoards} color='inherit'>자유게시판</Button>
          </Stack>
          <Stack direction='row' >
            <IconButton onClick={onClickNotification}
              size='large' edge='start' color='inherit' aria-label='AccountCircle'>
              <Image src="/images/icon/ic_alarm1.svg" alt='' width={24} height={24} priority />
              {/* <NotificationsIcon /> */}
            </IconButton>
            <IconButton onClick={onMenuIconOpen}
              size='large' edge='start' color='inherit' aria-label='AccountCircle'>
              <AccountCircleIcon />
            </IconButton>
          </Stack>
        </>
        }        
        {/* Mobile 헤더 버거 메뉴 */}
        {(isClient) && (isMobile) &&
        <>
          <Stack direction='row' sx={{ flexGrow: 999}} >
          </Stack>
          <Stack sx={{ flexGrow: 1}}>
            <IconButton sx={{ justifyContent: 'flex-end' }}
              onClick={onMenuIconOpen}
              size='large' edge='start' color='inherit' aria-label='logo'>
              <MenuIcon/>
            </IconButton>
          </Stack>
          </>
        }

        { resetDropdownMenu() }
      </Toolbar>
    </AppBar>
  )
  }
