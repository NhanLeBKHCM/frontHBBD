import { completeAxios } from "@/Axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Chip,
} from "@nextui-org/react";
import Countdown from "react-countdown";

const listGift = [
  "1 ly nước chanh 5 ka",
  "NhanLee (Hàng Real)",
  "Nguyễn Võ Thành Đạt (Fake, bonus Phan Huỳnh Vĩnh Khương)",
  "có thể được 1 ly trà sữa (hãy phân tích 2 chữ có thể)",
  "Nguyễn Phú Quí (Tất nhiên là fake)",
];

import { useEffect, useRef, useState } from "react";
const ModalComp = ({
  isOpen,
  onOpen,
  onOpenChange,
  question,
  setAnswer,
  idx,
  email,
}) => {
  const [userAnswer, setUserAnswer] = useState(
    question.type == "number" ? 0 : ""
  );
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(Date.now() + 60000000);
  const Ref = useRef(1);

  useEffect(() => {
    if (isOpen) {
      if (Ref.current == 1) {
        console.log("no cook");
        setDate(Date.now() + 120000);
      }
      Ref.current += 1;
    }
  }, [isOpen]);
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      className="text-black"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Câu hỏi vô tri {idx + 1}
            </ModalHeader>
            <ModalBody>
              {step == 1 ? (
                <div className="flex flex-col items-center">
                  <div>{question.question}</div>
                  <div className="flex flex-row items-center gap-4">
                    <Input
                      type={question.type == "number" ? "number" : undefined}
                      onChange={(event) => {
                        setUserAnswer(event.target.value);
                      }}
                      placeholder={idx == 3 ? "dd-mm-yyyy" : ""}
                    ></Input>
                    {isOpen ? (
                      <Countdown
                        onComplete={() => {
                          if (idx != 0) {
                            completeAxios(listGift.slice(0, idx + 1), email);
                            console.log("step3");
                            setStep(3);
                          } else {
                            Ref.current = 1;
                            console.log(Ref.current);
                            setStep(2);
                            setDate(Date.now() + 60000000);
                          }
                        }}
                        date={date}
                        renderer={({ minutes, seconds, completed }) => {
                          if (completed) {
                            // Render a completed state
                            return (
                              <Chip color="primary" radius="sm">
                                Cook!
                              </Chip>
                            );
                          } else {
                            // Render a countdown
                            return (
                              <Chip color="primary" radius="sm">
                                {minutes < 10 ? `0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                              </Chip>
                            );
                          }
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              ) : null}
              {step == 2 ? (
                <div className="flex flex-col items-center">
                  {question.optional == true
                    ? `Cái này là nháp thoi nha, sợ khó quá trả lời không được đó. Đáp án là: ${String(
                        question.answer
                      )}.`
                    : `Ok, thật thông minh. Đáp án là: ${String(
                        question.answer
                      )}. Giờ tiếp tục thôi`}
                </div>
              ) : null}
              {step == 3 ? (
                <div className="flex flex-col items-center">
                  {`Gà quá, đáp án là ${String(
                    question.answer
                  )}, thoi cho cook!`}
                </div>
              ) : null}
            </ModalBody>
            <ModalFooter>
              {step == 1 ? (
                <Button
                  color="primary"
                  onPress={() => {
                    if (question.optional == false) {
                      if (question.type == "number") {
                        if (question.answer == userAnswer) {
                          {
                            Ref.current = 1;
                            console.log(Ref.current);
                            setStep(2);
                            setDate(Date.now() + 60000000);
                          }
                        } else {
                          completeAxios(listGift.slice(0, idx + 1), email);
                          setStep(3);
                        }
                      } else {
                        function getLatin(text) {
                          let r = text.toLowerCase();
                          r = r
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "");
                          return r;
                        }
                        let checkSubset = (parentArray, subsetArray) => {
                          return subsetArray.every((el) => {
                            return parentArray.includes(el);
                          });
                        };
                        console.log(
                          getLatin(userAnswer).replaceAll(" ", "-").split("-")
                        );
                        if (
                          checkSubset(
                            getLatin(userAnswer)
                              .replaceAll(" ", "-")
                              .split("-"),
                            getLatin(question.answer).split("-")
                          )
                        ) {
                          {
                            Ref.current = 1;
                            console.log(Ref.current);
                            setStep(2);
                            setDate(Date.now() + 60000000);
                          }
                        } else {
                          completeAxios(listGift.slice(0, idx + 1), email);
                          setStep(3);
                        }
                      }
                    } else {
                      Ref.current = 1;
                      console.log(Ref.current);
                      setStep(2);
                      setDate(Date.now() + 60000000);
                    }
                  }}
                >
                  Trả lời
                </Button>
              ) : null}
              {step == 2 ? (
                <Button
                  color="primary"
                  onPress={() => {
                    setAnswer(idx + 1);
                    setStep(1);
                    onClose();
                  }}
                >
                  {idx == 4 ? "Hoàn thành" : "Tiếp tục"}
                </Button>
              ) : null}
              {step == 3 ? (
                <Button
                  color="primary"
                  onPress={() => {
                    setAnswer(-1);
                    setStep(1);
                    onClose();
                  }}
                >
                  Cook!
                </Button>
              ) : null}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalComp;
