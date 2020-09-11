export const functionSanityCheck = (fn: any) => {
  it('defined', () => {
    expect(fn).toBeDefined();
  });
};
