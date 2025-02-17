import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

// Arrange - 테스트를 위한 환경 만들기
// Act - 테스트 할 동작 발생
// Assert - 올바른 동작이 실행되었는지 검증

describe('TextField', () => {
  it('className Props로 설정한 css class가 적용된다.', async () => {
    await render(<TextField className="my-class" />);
    // 특정 플레이스폴더를 지닌 요소를 조회한다.
    // 이렇게 특정 컴포넌트만을 조회하여 테스트한다면 내부 돔 구조와는 무관하게 원하는 테스트 요소만 테스트할 수 있다.
    expect(screen.getByPlaceholderText('텍스트를 입력해 주세요.')).toHaveClass(
      'my-class',
    );
  });

  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다', async () => {
    await render(<TextField />);
    const textField = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    // jest-dom lib를 사용하여 매처를 확장
    expect(textField).toBeInTheDocument();
  });

  it('placeholder prop에 따라 placeholder가 변경된다.', async () => {
    await render(<TextField placeholder={'플레이스홀더 테스트'} />);
    const textField = screen.getByPlaceholderText('플레이스홀더 테스트');
    expect(textField).toBeInTheDocument();
  });

  it('텍스트를 입력하면 onChange props로 등록한 함수가 실행된다', async () => {
    // 스파이 함수 - 테스트 코드에서 특정 함수가 호출되었는지, 함수의 인자로 어떤 것이 넘어왔는지, 어떤 값을 반환하는지에 대한 정보를 저장한다.
    const spy = vi.fn(); // 스파이 함수
    const { user } = await render(<TextField onChange={spy} />);
    const textField = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    await user.type(textField, 'test');
    // 스파이가 올바르게 호출되었는지 확인하기 위하여 expect, toHaveBeenCalledWith 실행
    // 내가 원하는 테스트라는 문자열과 함께 올바르게 실행되었는지 알 수 있다.
    expect(spy).toHaveBeenCalledWith('test');
  });

  it('엔터키를 입력하면 onEnter prop으로 등록한 함수가 호출된다', async () => {
    const spy = vi.fn();
    const { user } = await render(<TextField onEnter={spy} />);
    const textField = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    await user.type(textField, 'test{Enter}');
    expect(spy).toHaveBeenCalledWith('test');
  });
});
