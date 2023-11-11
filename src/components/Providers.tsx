'use client';

import StyledComponentsRegistry from '@/lib/registry';

const Providers = (props: React.PropsWithChildren) => {
  return <StyledComponentsRegistry>{props.children}</StyledComponentsRegistry>;
};

export default Providers;
