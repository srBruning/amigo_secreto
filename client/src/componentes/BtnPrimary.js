import React from 'react';
import styled from 'styled-components/native';

export const BtnPrimary = styled.TouchableOpacity`
    height: 60px;
    background-color: #FF5A5A;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    border: 1px solid #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
export const CustomButtonText = styled.Text`
    font-size: 24px;
    color: #FFFFFF;
`;

 

const btn = ( {txtLabel, onPress}) => {
    return (
        <BtnPrimary onPress={onPress}>
            <CustomButtonText>{txtLabel}</CustomButtonText>
        </BtnPrimary>
    );
}

export default btn;