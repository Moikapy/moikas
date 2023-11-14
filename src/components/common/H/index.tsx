'use client';
import React, {useState, useEffect, useMemo, ReactNode} from 'react';
import styled from 'styled-components';
const H1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
`;
const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
`;
const H3 = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
`;
const H4 = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
`;
const H5 = styled.h5`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
`;
const H6 = styled.h6`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
`;

const H = ({
  className,
  type = '1',
  children,
}: {
  className?: string;
  type?: '1' | '2' | '3' | '4' | '5' | '6';
  children: ReactNode;
}) => {
  return (
    <>
      {type === '1' && <H1 className={className}>{children}</H1>}
      {type === '2' && <H2 className={className}>{children}</H2>}
      {type === '3' && <H3 className={className}>{children}</H3>}
      {type === '4' && <H4 className={className}>{children}</H4>}
      {type === '5' && <H5 className={className}>{children}</H5>}
      {type === '6' && <H6 className={className}>{children}</H6>}
    </>
  );
};

export default H;
