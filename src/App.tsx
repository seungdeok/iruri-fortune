import { BirthInput } from "./components/BirthInput";
import { FortuneResult } from "./components/FortuneResult";
import { LoadingView } from "./components/LoadingView";
import { useFortune } from "./hooks/useFortune";
import "./App.css";

/**
 * 컴포지션 루트: 계층 조립만 담당해요.
 * - 상태/로직: useFortune (애플리케이션 계층)
 * - 화면: LoadingView / BirthInput / FortuneResult (프레젠테이션 계층)
 */
function App() {
  const { ready, user, fortune, submit, reset } = useFortune();

  if (!ready) {
    return <LoadingView />;
  }

  if (user == null || fortune == null) {
    return <BirthInput onSubmit={submit} />;
  }

  return <FortuneResult user={user} fortune={fortune} onReset={reset} />;
}

export default App;
