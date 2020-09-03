import useLazyEffect from 'hooks/use-lazy-effect';
import { renderHook } from '@testing-library/react-hooks';

describe('useLazyEffect', () => {
  it('defined', () => {
    expect(useLazyEffect).toBeDefined();
  });

  it("shouldn't call callback on initial render", () => {
    const dummy = jest.fn();
    const { rerender } = renderHook(() => useLazyEffect(dummy));

    expect(dummy).not.toBeCalled();

    rerender();

    expect(dummy).toBeCalledTimes(1);

    rerender();

    expect(dummy).toBeCalledTimes(2);
  });
});
