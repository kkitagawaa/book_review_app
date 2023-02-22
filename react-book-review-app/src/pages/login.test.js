import { render, screen } from '@testing-library/react';
import { LogIn } from './Login';
import { BrowserRouter } from 'react-router-dom';


describe("renders login component", () => {
  test('正しくレンダリングされるか', () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>);
  });
  test('メールアドレスの入力欄が存在しているか', () => {
    render(
      <BrowserRouter>
        <LogIn />
      </BrowserRouter>);
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument()
  })
});