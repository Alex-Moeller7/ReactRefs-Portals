import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset }, ref) {
  const dialogue = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogue.current.showModal();
      },
    };
  });

  return (
    <dialog ref={dialogue} className="result-modal" onClose={onReset}>
      {userLost && <h2>You lost</h2>}
      {!userLost && (
        <>
          <h2>You Won</h2>
          <h3>Your Score: {score}</h3>
        </>
      )}
      <p>
        The Target Time was: <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>{formattedRemainingTime} seconds left</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
