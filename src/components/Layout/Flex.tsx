import React from "react";
import styled from "styled-components";

interface FlexProps {
  direction?: "row" | "column";
  justify?: "flex-start" | "flex-end" | "center" | "space-between";
  align?: "flex-start" | "flex-end" | "center";
  wrap?: "wrap" | "nowrap";
  children: React.ReactNode;
}

const StyledFlex = styled.div<{
  direction: string;
  justify: string;
  align: string;
  wrap: string;
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "flex-start"};
  flex-wrap: ${({ wrap }) => wrap || "wrap"};
`;

const Flex: React.FC<FlexProps> = ({
  children,
  direction = "row",
  justify = "flex-start",
  align = "flex-start",
  wrap = "wrap",
}) => {
  return (
    <StyledFlex
      direction={direction}
      justify={justify}
      align={align}
      wrap={wrap}
    >
      {children}
    </StyledFlex>
  );
};

export default Flex;
