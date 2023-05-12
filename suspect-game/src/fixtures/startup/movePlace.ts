
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
    x: 22.859, y: 11.152,
    direction: 'up'
},

{
    from: 'lounge',
    to: 'house',
    x: 88.005, y: 79.880,
    direction: 'right'
},
{
    from: 'office',
    to: 'lounge',
    x: 19.965, y: 86.175,
    direction: 'down'

},
{
    from: 'house',
    to: 'lounge',
    x: 8.005, y: 85.880,
    direction: 'left'
},
{
    from: 'house',
    to: 'interrogate',
    x: 90.005, y: 85.880,
    direction: 'right'
},
{
    from: 'interrogate',
    to: 'house',
    x: 8.005, y: 85.880,
    direction: 'left'
},
]