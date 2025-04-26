

export const BaseExpectList = [ 'string', 'bool', 'int', 'float' ] as const;
export type BaseExpect = typeof BaseExpectList[number];
