'use client'

import { Snackbar, Alert, AlertProps } from '@mui/material'
import { useState, forwardRef, useEffect } from 'react'

const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
  function SnackbarAlert(props, ref) {
    return <Alert elevation={6} ref={ref} {...props} />
  }
)

export const WikidSnackbar = (props: {severity: 'error' | 'warning' | 'info' | 'success', message: string, autoHideDuration: number}) => {
  const {severity, message, autoHideDuration} = props
  const [open, setOpen] = useState(false)
  
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  useEffect(() => {
    setOpen(true)
  }, [severity, message, autoHideDuration])

  return (
    <>
      <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
        <SnackbarAlert onClose={handleClose} severity={severity}>
          {message}
        </SnackbarAlert>
      </Snackbar>
    </>
  )
}