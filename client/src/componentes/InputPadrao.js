import React from "react";
import styled from "styled-components/native";

const InputArea = styled.View`
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  flex-direction: row;
  border-radius: 10px;
  margin-bottom: 15px;
  align-items: center;
  border: 1px solid #ff5a5a;
`;
export const Label = styled.Text`
  font-size: 16px;
  color: #ff5a5a;
  margin-bottom: 8px;
  margin-top: 10px;
`;

const SpanArea = styled.View``;

const Input = styled.TextInput`
  flex: 1;
  font-size: 18px;
  color: #3a527b;
  margin-left: 10px;
`;

const InputPadrao = ({
  txtLabel,
  placeholder,
  value,
  onChangeText,
  password,
}) => {
  return (
    <SpanArea>
      <Label>{txtLabel}</Label>
      <InputArea>
        <Input
          placeholder={placeholder}
          placeholderColor="#FF5A5A"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={password}
        />
      </InputArea>
    </SpanArea>
  );
};

export default InputPadrao;
