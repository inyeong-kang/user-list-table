import { isBoolean } from '@/utils';
import { SyntheticEvent, useCallback, useState } from 'react';

type toggleCallback = (booleanOrEvent?: boolean | SyntheticEvent) => void;

export interface UseBooleanStateOption {
    initialState?: boolean;
    prevent?: boolean;
}

export function useBooleanState(
    option?: UseBooleanStateOption,
): [booleanState: boolean, toggle: toggleCallback] {
    const [booleanState, setBooleanState] = useState(
        option?.initialState || false,
    );

    const toggleBooleanState = useCallback<toggleCallback>(
        (booleanOrEvent) => {
            if (option?.prevent) {
                return;
            }

            setBooleanState((prevBooleanState) => {
                return isBoolean(booleanOrEvent)
                    ? booleanOrEvent
                    : !prevBooleanState;
            });
        },
        [option?.prevent],
    );

    return [booleanState, toggleBooleanState];
}
