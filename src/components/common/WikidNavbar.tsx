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
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import MenuIcon from "@mui/icons-material/Menu";
import useScreenWidth, { ScreenType } from "@/hooks/useScreenWidth";
import { isSignUp, isSignIn } from "@/hooks/Token";
import LocalStorage from "@/api/storage/LocalStorage";

export const WikidNavbar = () => {
  const screenwidth = useScreenWidth();
  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
  const [clearStorage, setClearStorage] = useState(false);

  useEffect(() => {
    if (!clearStorage) {
      LocalStorage.clear();
      setClearStorage(true);
    }
  }, [clearStorage]);

  const open = Boolean(openMenu);

  const onMenuIconOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenMenu(event.currentTarget);
  };
  const onMenuIconClose = () => {
    setOpenMenu(null);
  };

  const router = useRouter();

  //로그인 클릭 시 페이지 이동
  const onClickLogin = () => {
    onMenuIconClose();
    router.push("/login");
  };

  //위키목록 클릭 시 페이지 이동
  const onClickWikiList = () => {
    onMenuIconClose();
    router.push("/wikilist");
  };

  //자유게시판 클릭 시 페이지 이동
  const onClickBoards = () => {
    onMenuIconClose();
    router.push("/boards");
  };

  //알림 메뉴 클릭 시 페이지 이동
  const onClickNotification = () => {
    onMenuIconClose();
    router.push("/notification");
  };

  //마이페이지 메뉴 클릭 시 페이지 이동
  const onClickMyPage = () => {
    onMenuIconClose();
    router.push("/mypage");
  };

  //로그아웃 메뉴 클릭 시 페이지 이동
  const onClickLogout = () => {
    onMenuIconClose();
    router.push("/");
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar sx={{ height: "60px" }}>
        <IconButton size="large">
          <Image
            onClick={() => router.push("/landingpage")}
            src="/images/ic_W.svg"
            alt="Wikid Logo"
            width={48}
            height={48}
            priority
          />
        </IconButton>
        <Typography
          sx={{
            flexGrow: -1,
            fontWeight: 800,
            fontSize: "24px",
            lineHeight: "28px",
            color: "lightgray",
          }}
          width={100}
        >
          wikied
        </Typography>

        {/* DeskTop & Tablet ON, Mobile View OFF*/}
        {screenwidth > ScreenType.MOBILE && (
          <>
            <Stack
              direction="row"
              sx={{ flexGrow: 1 }}
              spacing={2}
              marginLeft={3}
            >
              <Button onClick={onClickWikiList} color="inherit">
                위키목록
              </Button>
              <Button onClick={onClickBoards} color="inherit">
                자유게시판
              </Button>
            </Stack>
            <Stack direction="row" spacing={2} marginLeft={3}>
              <Button onClick={onClickLogin} color="inherit">
                로그인
              </Button>
            </Stack>
          </>
        )}
        {/* On-Line Menu View  */}
        {screenwidth < ScreenType.MOBILE && (
          <>
            <Stack direction="row" sx={{ flexGrow: 999 }}></Stack>
            <Stack sx={{ flexGrow: 1 }}>
              <IconButton
                sx={{ justifyContent: "flex-end" }}
                onClick={onMenuIconOpen}
                size="large"
                edge="start"
                color="inherit"
                aria-label="logo"
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          </>
        )}

        {isSignUp()
          ? signedUpMenu({ signup: true })
          : signedUpMenu({ signup: false })}
      </Toolbar>
    </AppBar>
  );

  function signedUpMenu(props: { signup: boolean }) {
    return props.signup === true ? ( //회원가입 정보가 있을 때
      <Menu
        id="resources-menu"
        anchorEl={openMenu}
        open={open}
        onClose={onMenuIconClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "resources-button",
        }}
      >
        <MenuItem onClick={onClickWikiList}>위키목록</MenuItem>
        <MenuItem onClick={onClickBoards} divider={true}>
          자유계시판
        </MenuItem>
        {isSignIn() ? ( //로그인 정보가 있을 때
          <>
            <MenuItem onClick={onClickNotification}>알림</MenuItem>
            <MenuItem onClick={onClickMyPage} divider={true}>
              마이페이지
            </MenuItem>
            <MenuItem onClick={onClickLogout}>로그아웃</MenuItem>
          </>
        ) : (
          //로그인 정보가 없을 때
          <>
            <MenuItem onClick={onClickLogin}>로그인</MenuItem>
          </>
        )}
      </Menu>
    ) : (
      //회원가입 정보가 없을 때
      <Menu
        id="resources-menu"
        anchorEl={openMenu}
        open={open}
        onClose={onMenuIconClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "resources-button",
        }}
      >
        <MenuItem onClick={onClickWikiList}>위키목록</MenuItem>
        <MenuItem onClick={onClickBoards} divider={true}>
          자유계시판
        </MenuItem>
        <MenuItem onClick={onClickLogin}>로그인</MenuItem>
      </Menu>
    );
  }
};
