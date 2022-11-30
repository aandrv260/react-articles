import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (text === '') return;

    const tooltipElement = ref.current;

    if (tooltipElement) {
      tooltipElement.style.setProperty('--tooltip-color', color);
    }
  }, [color, text]);

  return (
    <>
      <div
        className={`${text !== '' ? `tooltip-container ${styles['tooltip']}` : ''}`.trim()}
        data-tooltip={text}
      >
        {children}
      </div>
    </>
  );
};

export default TooltipContainer;
