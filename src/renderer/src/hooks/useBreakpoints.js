import { ref, onMounted, onUnmounted } from 'vue';

const sizes = {
  mobile: 600,
  tablet: 960,
  desktop: 1264,
  largeDesktop: 1904
};

export function useBreakpoints() {
  // 定义一个响应式变量 isMobile
  const isMobile = ref(window.innerWidth <= sizes.mobile);

  const updateBreakpoints = () => {
    isMobile.value = window.innerWidth <= sizes.mobile;
  };

  // 监听窗口 resize 事件
  onMounted(() => {
    window.addEventListener('resize', updateBreakpoints);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateBreakpoints);
  });

  return { isMobile };
}
