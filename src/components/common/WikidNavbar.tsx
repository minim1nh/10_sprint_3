'use client'

import { useState } from 'react'
import Image from 'next/image'

import { AppBar, Toolbar, IconButton, Typography, Button, Stack, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import useScreenWidth, {ScreenType} from '@/hooks/useScreenWidth'

export const WikidNavbar = () => {
  const screenwidth = useScreenWidth()
  const [isMenuOpen, setIsMenuOpen] = useState<null | HTMLElement>(null)

  const open = Boolean(isMenuOpen)
  const onMenuIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsMenuOpen(event.currentTarget)
  }
  const onMenuIconClose = () => {
    setIsMenuOpen(null)
  }

  return (
    <AppBar position='static' color='transparent'>
      <Toolbar sx={{ height: '80px' }}>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
          <Image src="/images/ic_W.svg" alt='Wikid Logo' width={48} height={48} priority />
        </IconButton>
        <Typography component='div' sx={{ flexGrow: -1, fontWeight: 800, fontSize: '24px', lineHeight: '28px', color: 'lightgray' }}>
          wikied
        </Typography>

        {/* DeskTop & Tablet View */}
        {(screenwidth > 480) &&
          <Stack direction='row' spacing={2} marginLeft={3} sx={{ flexGrow: 1}} >
            <Button color='inherit'>위키목록</Button>
            <Button color='inherit'>자유게시판</Button>
          </Stack>
        }
        <Stack direction='row' spacing={2} sx={{position: 'end'}}>
          <Button color='inherit'>로그인</Button>
        </Stack>


        {/* Mobile View  */}
        {/* <Stack>
          <IconButton
            onClick={onMenuIconClick}
            size='large'
            edge='start'
            color='inherit'
            aria-label='logo'>
            <MenuIcon />
          </IconButton>
        </Stack> */}

        <Menu
          id='resources-menu'
          anchorEl={isMenuOpen}
          open={open}
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
          <MenuItem onClick={onMenuIconClose}>위키목록</MenuItem>
          <MenuItem onClick={onMenuIconClose}>자유계시판</MenuItem>
          <MenuItem onClick={onMenuIconClose}>알림</MenuItem>
          <MenuItem onClick={onMenuIconClose}>마이페이지</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
