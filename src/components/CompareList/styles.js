import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 0 10px;

  display: flex;
  flex-direction: column;

  transform: scale(1);
  transition: transform 1s;

  &:hover {
    transform: scale(1.03);
    transition: transform 1s;
  }

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n - 1) {
        background: #f5f5f5;
      }
    }
  }

  button {
    height: 40px;
    border-style: none;
    color: #fff;
    font-family: sans-serif;
    font-size: 15px;
    font-weight: bold;
  }

  .update {
    background-color: #6670dd;

    &:hover {
      background-color: #0652dd;
    }
  }

  .delete {
    background-color: #ed4c90;

    &:hover {
      background-color: #ed4c67;
    }
  }
`;
