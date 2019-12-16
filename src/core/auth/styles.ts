import styled from '@emotion/styled';
import theme from 'core/theme';
import headerImage from 'images/header.png';

export const Logo = styled.div`
  background: transparent url(${headerImage}) no-repeat center;
  min-height: 9rem;
  background-size: 100% auto;
  margin: 0 1rem;
  ${theme.breakpoints.up('sm')} {
    background-size: auto;
  }
`;
