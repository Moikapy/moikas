'use client';

import {ReactNode, createContext} from 'react';
import {usePersistedReducer} from '@/hooks/usePersistedReducer';
import session_reducer from '../reducer/session';
import session_state, {session_state_type} from '../state/session';

export const Data_Context = createContext(null);
//
export default function Provider({children}: {children: ReactNode}) {
  
  const [state, dispatch]: any = usePersistedReducer(
    session_reducer,
    session_state as session_state_type,
    'session'
  );

  return (
    <Data_Context.Provider
      value={{
        state,
        dispatch
      }}>
      {children}
    </Data_Context.Provider>
  );
}
