import React from "react";
import styled from "styled-components/native";

export const BtnSecondary = styled.TouchableOpacity`
  height: 60px;
  background-color: #f8f8f8;
  border-radius: 7px;
  justify-content: center;
  align-items: center;
  border: 1px solid #f8f8f8;
  margin-top: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
export const CustomButtonText = styled.Text`
  font-size: 24px;
  color: #ff5a5a;
`;

const btn = ({ txtLabel, onPress }) => {
  return (
    <BtnSecondary onPress={onPress}>
      <CustomButtonText>{txtLabel}</CustomButtonText>
    </BtnSecondary>
  );
};

export default btn;
