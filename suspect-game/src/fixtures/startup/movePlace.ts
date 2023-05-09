
export interface MovePlaceButtonType {
    from: string;
    to: string;
    x: number;
    y: number;
    direction: 'up' | 'down' | 'left' | 'right';
}

export const startUpMoveButton : MovePlaceButtonType[] = [{
    from: 'lounge',
    to: 'office',
    x: 24.525, y: 2.337,
    direction: 'up'
},

{
    from: 'lounge',
    to: 'house',
    x: 91.377, y: 79.171,
    direction: 'right'
}
]