import React, {useState, useEffect, useMemo, ReactNode} from 'react';
import styled from 'styled-components';

const Container = ({
  className,
  type='1',
  children,
}: {
  className?: string;
  type?: '1' | '2' | '3' | '4' | '5' | '6';
  children: ReactNode;
}) => {
  const _Container = styled.div`
    display: flex;
  `;

  return (
    <>
      {type === '1' && <_Container className={className}>{children}</_Container>}
    </>
  );
};

export default Container;
