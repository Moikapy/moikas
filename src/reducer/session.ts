import {session_state_type} from '@/state/session';

export default function session_reducer(
  state: session_state_type,
  action: any
) {
  switch (action.type) {
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
