import { useLayoutEffect, useRef } from 'react';
import styles from './TooltipContainer.module.scss';

interface TooltipContainerProps {
  children: React.ReactNode;
  color: string;
  text: string;
}

/**
 * - This components is used to wrap any element on which you want to put a tooltip because the tooltip is positioned absolutely and it will otherwise not work on `HTMLInputElement`
 */
const TooltipContainer = ({ children, color, text }: TooltipContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (text === '') return;

    const tooltipElement = ref.current;

    tooltipElement && tooltipElement.style.setProperty('--tooltip-color', color);
  }, [color, text]);

  return (
    <>
      <div
        className={`${`tooltip-container ${styles['tooltip']} ${
          text === '' ? styles['tooltip--hidden'] : ''
        }`}`.trim()}
        data-tooltip={text}
        ref={ref}
      >
        {children}
      </div>
    </>
  );
};

export default TooltipContainer;
