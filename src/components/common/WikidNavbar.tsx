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

export const WikidNavbar = () => {
  const [isClient, setIsClient] = useState(false);
  const [dropdownMenuElement, setDropdownMenuElement] = useState<null | HTMLElement>(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const screenwidth = useScreenWidth();
  
  useEffect(() => {
    setIsClient(true);
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

  const isDesktop = (screenwidth > ScreenType.MOBILE) ? true : false;

  //로그인 클릭 시 페이지 이동
  const onClickLogin = () => { onMenuIconClose(); router.push('/login') }

  //위키목록 클릭 시 페이지 이동
  const onClickWikiList = () => { onMenuIconClose(); router.push("/wikilist") }

  //자유게시판 클릭 시 페이지 이동
  const onClickBoards = () => { onMenuIconClose(); router.push('/boards') }

  //알림 메뉴 클릭 시 페이지 이동
  const onClickNotification = () => { onMenuIconClose(); router.push('/notification') }

  //마이페이지 메뉴 클릭 시 페이지 이동
  const onClickMyPage = () => { onMenuIconClose(); router.push('/mypage') }

  //로그아웃 메뉴 클릭 시 페이지 이동
  const onClickLogout = () => {
    if(isClient) {
      SessionStorage.clear();
    }
    onMenuIconClose();
    router.push('/')
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
        {/* 로그인 전 메뉴 */}
        {Boolean(isSignIn()) &&
          <>
            <MenuItem onClick={onClickWikiList}>위키목록</MenuItem>
            <MenuItem onClick={onClickBoards} divider={true}>자유계시판</MenuItem>
            <MenuItem onClick={onClickNotification}>알림</MenuItem>
            <MenuItem onClick={onClickMyPage} divider={true}>마이페이지</MenuItem>
            <MenuItem onClick={onClickLogout}>로그아웃</MenuItem>
          </>
        }
        {/* 로그인 전 메뉴 */}
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
          wikied
        </Typography>

        {/* 로그아웃(초기) 헤더 메뉴 */}
        {(isClient) && (isDesktop) && Boolean(!isSignIn()) &&
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
        {(isClient) && (isDesktop) && Boolean(isSignIn()) &&
          <>
          <Stack direction='row' sx={{ flexGrow: 1}} spacing={2} marginLeft={3} >
            <Button color='inherit'>위키목록</Button>
            <Button color='inherit'>자유게시판</Button>
          </Stack>
          <Stack direction='row' >
            <IconButton onClick={onClickNotification}
              size='large' edge='start' color='inherit' aria-label='AccountCircle'>
              <Image src="/images/img/img_Bell.svg" alt='' width={36} height={36} priority />
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
        {(isClient) && (!isDesktop) &&
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
