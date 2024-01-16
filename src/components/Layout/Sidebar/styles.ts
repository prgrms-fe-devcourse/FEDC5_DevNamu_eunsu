// 사이드바 테마에 따른 별도의 색상, 추후 사이드바 테마 결정 시 primary 등으로 변수화할 수 있음.
const textCSS = "text-[rgb(124,40,82)] dark:text-white/80";

const iconHoverBgCSS = "hover:bg-[rgba(124,40,82,0.25)] dark:hover:bg-white/10";

export const ButtonWrappingCSS = "flex flex-col items-center gap-1 py-2 text-xl hover:text-2xl";

export const IconWrappingCSS = `flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${iconHoverBgCSS}`;

export const IconCSS = `h-[1em] w-[1em] ${textCSS} transition-[width,height]`;

export const IconDescriptionCSS = `text-xs font-bold tracking-tighter ${textCSS}`;
