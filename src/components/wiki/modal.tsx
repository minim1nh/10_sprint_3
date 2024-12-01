{
  startModalOpen && (
    <Dialog
      open={startModalOpen}
      onClose={() => setStartModalOpen(false)}
      PaperProps={{
        style: {
          width: "400px",
          padding: "20px",
          borderRadius: "16px",
        },
      }}
    >
      <DialogTitle
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        다음 퀴즈를 맞추고 위키를 작성해 보세요.
      </DialogTitle>
      <DialogContent style={{ textAlign: "center" }}>
        <p>도라미의 가족은?</p>
        <input
          type="text"
          placeholder="정답을 입력해주세요."
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#4CBFA4",
            color: "#fff",
            borderRadius: "20px",
          }}
          onClick={() => setStartModalOpen(false)} // 닫기 또는 추가 로직
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
