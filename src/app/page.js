"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  useDisclosure,
  NextUIProvider,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { completeAxios, playAxios } from "@/Axios";
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalComp from "./ModalComp";
import dynamic from "next/dynamic";
const GiftComp = dynamic(() => import("./Gift"), { ssr: false });

const notify = (message) => {
  toast(`🦄 ${message}`);
};

const listGift = [
  "1 ly nước chanh 5 ka",
  "NhanLee (Hàng Real)",
  "Nguyễn Võ Thành Đạt (Fake, bonus Phan Huỳnh Vĩnh Khương)",
  "có thể được 1 ly trà sữa (hãy phân tích 2 chữ có thể)",
  "Nguyễn Phú Quí (Tất nhiên là fake)",
];

const listQuestion = [
  {
    question:
      "Tổng ngày sinh của NhanLee + Nguyen Vo Thanh Dat sẽ ra bao nhiêu",
    answer: 17,
    type: "number",
    optional: true,
  },
  {
    question: "Năm nhuận tiếp theo là",
    answer: 2024,
    type: "number",
    optional: false,
  },
  {
    question: "Ai là người ngủ trong khi mọi người ngắm bình minh",
    answer: "Đạt",
    type: "text",
    optional: false,
  },
  {
    question: "Ngày dự kiến thi lên đai sắp tới là",
    answer: "2023-09-17",
    type: "date",
    optional: false,
  },
  {
    question: "Số người hiện có trong group Lũ quỷ ở rừng sâu",
    answer: 22,
    type: "number",
    optional: false,
  },
];

const ConfirmModal = ({ exitFunct, isOpen, onOpen, onOpenChange }) => {
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="text-black"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Thoát</ModalHeader>
            <ModalBody>Giờ muốn thoát liền hay ở lại coi quà</ModalBody>
            <ModalFooter>
              <Button
                color="foreground"
                variant="light"
                onClick={() => {
                  onClose();
                  exitFunct();
                }}
              >
                Thoát
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onClose();
                }}
              >
                Ở lại
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [played, setPlayed] = useState(false);
  const [play, setPlay] = useState(false);
  const Ref = useRef([]);
  const [answering, setAnswering] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onOpenChange: onOpenChangeConfirm,
  } = useDisclosure();

  useEffect(() => {
    console.log(answering);
    if (Ref.current.length != 0) {
      if (answering != -1 && answering != 5) {
        console.log(Ref.current[answering]);
        if (Ref.current[answering]) Ref.current[answering].scrollIntoView();
      } else if (answering == 5) {
        if (Ref.current[4]) Ref.current[4].scrollIntoView();
        const res = completeAxios(listGift, email);
        notify("Chúc mừng chị đã vượt qua khảo nghiệm của NhanLee");
        setTimeout(() => {
          onOpenConfirm();
        }, 3000);
      } else if (answering == -1) {
        if (Ref.current[4]) Ref.current[4].scrollIntoView();
        notify("Chúc mừng được chưa!");
        setTimeout(() => {
          onOpenConfirm();
        }, 3000);
        setAnswering(6);
      } else if (answering == 6) {
        if (Ref.current[4]) Ref.current[4].scrollIntoView();
      }
    }
  }, [answering]);
  return (
    <>
      <ToastContainer />
      <ConfirmModal
        exitFunct={() => {
          setEmail("");
          setAnswering(0);
          setPlayed(false);
          setPlay(false);
          setIsLogin(true);
        }}
        onOpen={onOpenConfirm}
        isOpen={isOpenConfirm}
        onOpenChange={onOpenChangeConfirm}
      ></ConfirmModal>
      <NextUIProvider>
        <div
          className="w-screen min-h-screen flex flex-col items-center justify-center gap-[16px]"
          style={{
            background: "#C04848" /* fallback for old browsers */,
            background:
              "-webkit-linear-gradient(to right, #480048, #C04848)" /* Chrome 10-25, Safari 5.1-6 */,
            background:
              "linear-gradient(to right, #480048, #C04848)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
          }}
        >
          {isLogin ? (
            <>
              <div className="text-[24px] text-white w-[40%] text-center relative">
                Héloo chị Ngân web này là để chúc chị Ngân sinh nhật zui zẻ
              </div>
              <div>
                <Input
                  isClearable
                  isRequired
                  className="z-10 text-black"
                  type="email"
                  label="Email"
                  placeholder="Nhớ nhập đúng email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div>
                <Button
                  color="secondary"
                  className="text-[30px] font-[700] p-4"
                  onClick={async () => {
                    if (email) {
                      const res = await playAxios();
                      console.log(res);
                      if (res.result == "success") {
                        setIsLogin(false);
                        setPlay(true);
                      } else if (res.result == "fail") {
                        setIsLogin(false);
                        setPlayed(true);
                      }
                    } else notify("Nhập email vô đeeee");
                  }}
                >
                  Chơi thoi!
                </Button>
              </div>
              <div className="absolute top-[10%] left-[10%] z-0">
                <img src="nyan_cat.gif" width="30%" height="50%" />
              </div>
            </>
          ) : null}
          {played ? (
            <div className="text-[40px] font-[700]">
              <style>
                {`
@keyframes cColor {
  0% {color: red;}
  50% {color: white;}
  100% {color: red;}
  }

`}
              </style>
              <div
                style={{
                  animation: "cColor 0.2s",
                  animationIterationCount: "infinite",
                }}
              >
                Đừng gian lận, chỉ được chơi 1 lần thôi
              </div>
            </div>
          ) : null}
          {play ? (
            <>
              <div className=" gap-[32px] w-full min-h-screen flex flex-row items-center justify-around overflow-auto">
                <div className="grow min-h-screen flex flex-col items-center justify-center py-[300px] overflow-auto">
                  <div>
                    <style>
                      {`
@keyframes cColor {
  0% {background-color: rgb(234 179 8 / var(--tw-bg-opacity));}
  50% {background-color: white;}
  100% {background-color: rgb(234 179 8 / var(--tw-bg-opacity));}
  }

`}
                    </style>
                    <div
                      ref={(ref) => {
                        Ref.current[4] = ref;
                      }}
                      className="w-[100px] h-[100px] "
                    >
                      <GiftComp canOpen={answering > 4} idx={4}>
                        <div className="w-full h-[500px] text-[30px] text-white flex flex-col items-center">
                          <div className="flex flex-row justify-center">
                            <img src="ngan_gift.png" width={200} />
                            <img src="phuqui_gift.png" width={200} />
                          </div>
                          <div className=" bg-purple-500 rounded-[8px] p-4">
                            GIFT: {listGift[4]}
                          </div>
                        </div>
                      </GiftComp>
                      <div className="w-full flex flex-row justify-center">
                        <Button
                          style={
                            answering == 4
                              ? {
                                  animation: "cColor 0.2s",
                                  animationIterationCount: "infinite",
                                }
                              : {}
                          }
                          onClick={onOpen}
                          variant="faded"
                          color="secondary"
                          className="font-[700] text-[20px]"
                        >
                          Chiến!
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="w-[50px] h-[350px] bg-yellow-500"></div>
                  <div>
                    <style>
                      {`
@keyframes cColor {
  0% {background-color: rgb(234 179 8 / var(--tw-bg-opacity));}
  50% {background-color: white;}
  100% {background-color: rgb(234 179 8 / var(--tw-bg-opacity));}
  }

`}
                    </style>
                    <div
                      ref={(ref) => {
                        Ref.current[3] = ref;
                      }}
                      className="w-[100px] h-[100px] "
                    >
                      <GiftComp canOpen={answering > 3} idx={3}>
                        <div className="w-full h-[500px] text-[30px] text-white flex flex-col items-center">
                          <div className="flex flex-row justify-center">
                            <img src="tra_sua.png" width={200} />
                          </div>
                          <div className=" bg-purple-500 rounded-[8px] p-4">
                            GIFT: {listGift[3]}
                          </div>
                        </div>
                      </GiftComp>
                      <div className="w-full flex flex-row justify-center">
                        <Button
                          style={
                            answering == 3
                              ? {
                                  animation: "cColor 0.2s",
                                  animationIterationCount: "infinite",
                                }
                              : {}
                          }
                          onClick={onOpen}
                          variant="faded"
                          color="secondary"
                          className="font-[700] text-[20px]"
                        >
                          Chiến!
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="w-[50px] h-[300px] bg-yellow-500"></div>
                  <div>
                    <style>
                      {`
@keyframes cColor {
  0% {background-color: rgb(234 179 8 / var(--tw-bg-opacity));}
  50% {background-color: white;}
  100% {background-color: rgb(234 179 8 / var(--tw-bg-opacity));}
  }

`}
                    </style>
                    <div
                      ref={(ref) => {
                        Ref.current[2] = ref;
                      }}
                      className="w-[100px] h-[100px] "
                    >
                      <GiftComp canOpen={answering > 2} idx={2}>
                        <div className="w-full h-[500px] text-[30px] text-white flex flex-col items-center">
                          <div className="flex flex-row justify-center">
                            <img src="dat.png" width={200} />
                            <img src="phvkhuong_gift.png" width={200} />
                          </div>
                          <div className=" bg-purple-500 rounded-[8px] p-4">
                            GIFT: {listGift[2]}
                          </div>
                        </div>
                      </GiftComp>
                      <div className="w-full flex flex-row justify-center">
                        <Button
                          style={
                            answering == 2
                              ? {
                                  animation: "cColor 0.2s",
                                  animationIterationCount: "infinite",
                                }
                              : {}
                          }
                          onClick={onOpen}
                          variant="faded"
                          color="secondary"
                          className="font-[700] text-[20px]"
                        >
                          Chiến!
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="w-[50px] h-[250px] bg-yellow-500"></div>
                  <div>
                    <style>
                      {`
@keyframes cColor {
  0% {background-color: rgb(234 179 8 / var(--tw-bg-opacity));}
  50% {background-color: white;}
  100% {background-color: rgb(234 179 8 / var(--tw-bg-opacity));}
  }

`}
                    </style>
                    <div
                      ref={(ref) => {
                        Ref.current[1] = ref;
                      }}
                      className="w-[100px] h-[100px] "
                    >
                      <GiftComp canOpen={answering > 1} idx={1}>
                        <div className="w-full h-[500px] text-[30px] text-white flex flex-col items-center">
                          <img src="nhanlee.png" width={200} />
                          <div className=" bg-purple-500 rounded-[8px] p-4">
                            GIFT: {listGift[1]}
                          </div>
                        </div>
                      </GiftComp>
                      <div className="w-full flex flex-row justify-center">
                        <Button
                          style={
                            answering == 1
                              ? {
                                  animation: "cColor 0.2s",
                                  animationIterationCount: "infinite",
                                }
                              : {}
                          }
                          onClick={onOpen}
                          variant="faded"
                          color="secondary"
                          className="font-[700] text-[20px]"
                        >
                          Chiến!
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="w-[50px] h-[200px] bg-yellow-500"></div>
                  <div>
                    <style>
                      {`
@keyframes cColor {
  0% {background-color: rgb(234 179 8 / var(--tw-bg-opacity));}
  50% {background-color: white;}
  100% {background-color: rgb(234 179 8 / var(--tw-bg-opacity));}
  }

`}
                    </style>
                    <div
                      ref={(ref) => {
                        Ref.current[0] = ref;
                        if (Ref.current[0]) Ref.current[0].scrollIntoView();
                      }}
                      className="w-[100px] h-[100px] "
                    >
                      <GiftComp canOpen={answering > 0} idx={0}>
                        <div className="w-full h-[500px] text-[30px] text-white flex flex-col items-center">
                          <img src="lemon.png" height={300} />
                          <div className=" bg-purple-500 rounded-[8px] p-4">
                            GIFT: {listGift[0]}
                          </div>
                        </div>
                      </GiftComp>
                      <div className="w-full flex flex-row justify-center">
                        <Button
                          style={
                            answering == 0
                              ? {
                                  animation: "cColor 0.2s",
                                  animationIterationCount: "infinite",
                                }
                              : {}
                          }
                          onClick={onOpen}
                          variant="faded"
                          color="secondary"
                          className="font-[700] text-[20px]"
                        >
                          Chiến!
                        </Button>
                      </div>
                    </div>
                  </div>
                  {answering != -1 && answering < 5 ? (
                    <ModalComp
                      onOpenChange={onOpenChange}
                      onOpen={onOpen}
                      isOpen={isOpen}
                      question={listQuestion[answering]}
                      setAnswer={setAnswering}
                      idx={answering}
                      email={email}
                    ></ModalComp>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
          {answering == -1 || answering >= 5 ? (
            <div className="absolute top-[350px] left-0 z-0">
              <style>
                {`
@keyframes cSize {
  0% {width: 300px}
  100% {width: 100wv}
  }

`}
              </style>
              <img
                src="ngan_bg.png"
                width="100%"
                style={{
                  animation: "cSize 0.3s",
                  animationIterationCount: "infinite",
                }}
              />
            </div>
          ) : null}
        </div>
      </NextUIProvider>
    </>
  );
}
