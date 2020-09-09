export default function functionSanityCheck(fn: any) {
  it('defined', () => {
    expect(fn).toBeDefined();
  });
}
