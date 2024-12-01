import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  DialogContentText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Image from "next/image";
import { postImagesUpload } from "@/api/swagger/Image";
import { ImageUploadData } from "@/api/swagger/Wikid.types";

interface ImageInsertModalProps {
  onClose: (imageUrl: string) => void;
}

export const ImageInsertModal = ({ onClose }: ImageInsertModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = [...e.target.files];
      setFiles(selectedFiles);
      const images = selectedFiles.map((file) => URL.createObjectURL(file));
      setImages(images);
    }
  };

  const handleClose = async (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    if (files.length > 0) {
      try {
        const res = (await postImagesUpload({
          file: files[0],
        })) as ImageUploadData;
        onClose(res.url);
      } catch (error) {
        console.error("이미지 업로드 실패", error);
      }
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        <Box display="flex" justifyContent={"end"}>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText component="span">
          <form>
            <input
              type="file"
              id="file"
              onChange={handleImageChange}
              accept="image/png, image/jpg, image/jpeg"
            />
          </form>
        </DialogContentText>
        <DialogContentText component="span">
          <Box>
            {images.length > 0 ? (
              images.map((image, index) => (
                <p key={index}>
                  <Image src={image} width={302} height={268} alt="Preview" />
                </p>
              ))
            ) : (
              <IconButton
                disabled
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  borderRadius: 2,
                  p: 1,
                  minWidth: 354,
                  minHeight: 206,
                }}
              >
                <CameraAltIcon />
              </IconButton>
            )}
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(e) => handleClose(e, "upload")}
          variant="contained"
          color="secondary"
        >
          삽입하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};
