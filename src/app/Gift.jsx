"use client";
import { useState } from "react";

const GiftComp = ({ children, canOpen, idx }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="flex flex-row justify-center items-center h-full"
      style={
        !open && canOpen
          ? {
              animation: "cScale 0.5s",
              animationIterationCount: "infinite",
            }
          : {}
      }
    >
      <style>
        {`
@keyframes cScale {
    0% {transform: scale(1)}
    50% {transform: scale(1.2)}
    100% {transform: scale(1)}
    }
.box-${idx}::before {
  content: "";
  width: 440px;
  height: 440px;
  background-color: #89cff0;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  border-radius: 50%;
}
.box-body-${idx} {
  position: relative;
  height: 200px;
  width: 200px;
  background-color: #cc231e;
  border-bottom-left-radius: 5%;
  border-bottom-right-radius: 5%;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.3);
  background: linear-gradient(#762c2c,#ff0303);
}
.box-body-${idx} .img-${idx}{
  opacity: 0;
  transform: translateY(0%);
  transition: all 0.5s;
  margin: 0 auto;
  display: block;
}${
          open
            ? `
.box-body-${idx} {
  cursor: pointer;
  -webkit-animation: box-body 1s forwards ease-in-out;
          animation: box-body 1s forwards ease-in-out;
}
.box-body-${idx} .img-${idx}{
    position: absolute;
  opacity: 1;
  z-index: 2;
  transform: translate(-25%,-307px);
  transform: 
height: 500px;
width: 500px;

   
}
.box-body-${idx} .box-lid-${idx} {
  -webkit-animation: box-lid 1s forwards ease-in-out;
          animation: box-lid 1s forwards ease-in-out;
}
.box-body-${idx} .box-bowtie-${idx}::before {
  -webkit-animation: box-bowtie-left 1.1s forwards ease-in-out;
          animation: box-bowtie-left 1.1s forwards ease-in-out;
}
.box-body-${idx} .box-bowtie-${idx}::after {
  -webkit-animation: box-bowtie-right 1.1s forwards ease-in-out;
          animation: box-bowtie-right 1.1s forwards ease-in-out;
}`
            : ""
        }
.box-body-${idx}::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
  width: 50px;
  background: linear-gradient(#ffffff,#ffefa0)
}
.box-lid-${idx} {
  position: absolute;
  z-index: 1;
  left: 50%;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
  bottom: 90%;
  height: 40px;
  background-color: #cc231e;
  height: 40px;
  width: 220px;
  border-radius: 5%;
  box-shadow: 0 8px 4px -4px rgba(0, 0, 0, 0.3);
}
.box-lid-${idx}::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
  width: 50px;
  background: linear-gradient(#ffefa0,#fff)
}
.box-bowtie-${idx} {
  z-index: 1;
  height: 100%;
}
.box-bowtie-${idx}::before, .box-bowtie-${idx}::after {
  content: "";
  width: 83.3333333333px;
  height: 83.3333333333px;
  border: 16.6666666667px solid white;
  border-radius: 50% 50% 0 50%;
  position: absolute;
  bottom: 99%;
  z-index: -1;
}
.box-bowtie-${idx}::before {
  left: 50%;
  -webkit-transform: translateX(-100%) skew(10deg, 10deg);
          transform: translateX(-100%) skew(10deg, 10deg);
}
.box-bowtie-${idx}::after {
  left: 50%;
  -webkit-transform: translateX(0%) rotate(90deg) skew(10deg, 10deg);
          transform: translateX(0%) rotate(90deg) skew(10deg, 10deg);
}

@-webkit-keyframes box-lid {
  0%,
  42% {
    -webkit-transform: translate3d(-50%, 0%, 0) rotate(0deg);
            transform: translate3d(-50%, 0%, 0) rotate(0deg);
  }
  60% {
    -webkit-transform: translate3d(-85%, -230%, 0) rotate(-25deg);
            transform: translate3d(-85%, -230%, 0) rotate(-25deg);
  }
  90%, 100% {
    -webkit-transform: translate3d(-119%, 225%, 0) rotate(-70deg);
            transform: translate3d(-119%, 225%, 0) rotate(-70deg);
  }
}

@keyframes box-lid {
  0%,
  42% {
    -webkit-transform: translate3d(-50%, 0%, 0) rotate(0deg);
            transform: translate3d(-50%, 0%, 0) rotate(0deg);
  }
  60% {
    -webkit-transform: translate3d(-85%, -230%, 0) rotate(-25deg);
            transform: translate3d(-85%, -230%, 0) rotate(-25deg);
  }
  90%, 100% {
    -webkit-transform: translate3d(-119%, 225%, 0) rotate(-70deg);
            transform: translate3d(-119%, 225%, 0) rotate(-70deg);
  }
}
@-webkit-keyframes box-body {
  0% {
    -webkit-transform: translate3d(0%, 0%, 0) rotate(0deg);
            transform: translate3d(0%, 0%, 0) rotate(0deg);
  }
  25% {
    -webkit-transform: translate3d(0%, 25%, 0) rotate(20deg);
            transform: translate3d(0%, 25%, 0) rotate(20deg);
  }
  50% {
    -webkit-transform: translate3d(0%, -15%, 0) rotate(0deg);
            transform: translate3d(0%, -15%, 0) rotate(0deg);
  }
  70% {
    -webkit-transform: translate3d(0%, 0%, 0) rotate(0deg);
            transform: translate3d(0%, 0%, 0) rotate(0deg);
  }
}
@keyframes box-body {
  0% {
    -webkit-transform: translate3d(0%, 0%, 0) rotate(0deg);
            transform: translate3d(0%, 0%, 0) rotate(0deg);
  }
  25% {
    -webkit-transform: translate3d(0%, 25%, 0) rotate(20deg);
            transform: translate3d(0%, 25%, 0) rotate(20deg);
  }
  50% {
    -webkit-transform: translate3d(0%, -15%, 0) rotate(0deg);
            transform: translate3d(0%, -15%, 0) rotate(0deg);
  }
  70% {
    -webkit-transform: translate3d(0%, 0%, 0) rotate(0deg);
            transform: translate3d(0%, 0%, 0) rotate(0deg);
  }
}
@-webkit-keyframes box-bowtie-right {
  0%,
  50%,
  75% {
    -webkit-transform: translateX(0%) rotate(90deg) skew(10deg, 10deg);
            transform: translateX(0%) rotate(90deg) skew(10deg, 10deg);
  }
  90%,
  100% {
    -webkit-transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
            transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
    box-shadow: 0px 4px 8px -4px rgba(0, 0, 0, 0.3);
  }
}
@keyframes box-bowtie-right {
  0%,
  50%,
  75% {
    -webkit-transform: translateX(0%) rotate(90deg) skew(10deg, 10deg);
            transform: translateX(0%) rotate(90deg) skew(10deg, 10deg);
  }
  90%,
  100% {
    -webkit-transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
            transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
    box-shadow: 0px 4px 8px -4px rgba(0, 0, 0, 0.3);
  }
}
@-webkit-keyframes box-bowtie-left {
  0% {
    -webkit-transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
            transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
  }
  50%,
  75% {
    -webkit-transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
            transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
  }
  90%,
  100% {
    -webkit-transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
            transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
  }
}
@keyframes box-bowtie-left {
  0% {
    -webkit-transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
            transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
  }
  50%,
  75% {
    -webkit-transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
            transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
  }
  90%,
  100% {
    -webkit-transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
            transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
  }
}
`}
      </style>

      <div
        className="container w-fit h-fit "
        style={{ transform: `scale(${0.4 + 0.05 * idx})` }}
        onClick={() => {
          if (canOpen) setOpen(true);
        }}
      >
        <div className="row">
          <div className="col-12 mt-5 d-flex justify-content-center">
            <div className={`box-${idx}`}>
              <div className={`box-body-${idx}`}>
                <div className={`img-${idx}`}>{children}</div>
                <div className={`box-lid-${idx}`}>
                  <div className={`box-bowtie-${idx}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GiftComp;
