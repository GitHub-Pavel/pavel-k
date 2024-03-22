export const ovalEquasion = (x: number, a: number, b: number) => Math.sqrt( Math.abs( 1 - (x/a)**2 ) * b**2 )
export const normalizeEquasion = (x: number, a: number, b: number) => (x - a) / (b - a)
export const speedEquasion = (startSpeed: number, x: number, a: number, b: number) => startSpeed * (1 - normalizeEquasion(x, a, b))