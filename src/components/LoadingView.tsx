import { Loader } from "@toss/tds-mobile";

/** 저장소 로딩 중 표시하는 화면. */
export function LoadingView() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <Loader />
    </div>
  );
}
