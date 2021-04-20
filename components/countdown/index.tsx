import { useEffect, useState } from "react";
import styled from "styled-components";
import { formatDistance } from "./utils";

const Message = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`;

type CountDownProps = {
  endTime: Date;
  className?: string;
  message?: string;
};

const Countdown = ({
  className = "",
  endTime,
  message = "",
}: CountDownProps) => {
  const [countdown, setCountdown] = useState(formatDistance(endTime));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCountdown(formatDistance(endTime));
    }, 1000);

    return () => clearInterval(timeout);
  }, [countdown]);

  if (countdown === "") {
    return null;
  }

  return (
    <div className={className}>
      {message === "" ? null : <Message>{message}</Message>}
      <div className="countdown">{countdown}</div>
    </div>
  );
};

export default Countdown;
