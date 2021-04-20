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
  const countdown = formatDistance(endTime);

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
