import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 0.6rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: '#333';
  &:hover {
    cursor: pointer;
    transform: translateY(-8px);
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
    filter: brightness(1.3);
  }
  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const DefaultCardText = styled.div`
  position: relative;
  color: #F2F3F4;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover::after {
    content: attr(data-full-text);
    position: absolute;
    left: 0;
    bottom: 100%;
    background: #333;
    color: #F2F3F4;
    padding: 0.5rem;
    border-radius: 0.4rem;
    white-space: nowrap;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
`;

const DefaultCardImg = styled.img`
  height: 100px;
  width: 100%;
  object-fit: cover;
  border-radius: 0.4rem;
`;

const FlexContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DefaultCard = ({ category }) => {
  return (
    <Card>
      <DefaultCardText data-full-text={category.name}>
        {category.name}
      </DefaultCardText>
      <FlexContainer>
        <DefaultCardImg
          src={category.coverPhoto}
          alt="podcast-image"
        />
      </FlexContainer>
    </Card>
  );
};
