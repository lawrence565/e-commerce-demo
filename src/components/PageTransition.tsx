import { motion, AnimatePresence, Variants } from "framer-motion";
import { ReactNode } from "react";

// 頁面轉場動畫變體
const pageVariants: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.2,
            ease: "easeInOut",
        },
    },
};

interface PageTransitionProps {
    children: ReactNode;
    className?: string;
}

/**
 * 頁面轉場動畫包裝器
 * 使用方式：包裝在頁面組件外層
 */
export function PageTransition({ children, className }: PageTransitionProps) {
    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// 淡入動畫變體
const fadeVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.3 },
    },
};

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

/**
 * 淡入動畫組件
 */
export function FadeIn({ children, delay = 0, className }: FadeInProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeVariants}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// 列表項目動畫變體
const listItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.3,
            ease: "easeOut",
        },
    }),
};

interface AnimatedListItemProps {
    children: ReactNode;
    index: number;
    className?: string;
}

/**
 * 列表項目動畫組件
 * 使用 stagger 效果讓列表項目依序顯示
 */
export function AnimatedListItem({
    children,
    index,
    className,
}: AnimatedListItemProps) {
    return (
        <motion.div
            custom={index}
            initial="hidden"
            animate="visible"
            variants={listItemVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// 縮放動畫變體
const scaleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: "backOut",
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.2 },
    },
};

interface ScaleInProps {
    children: ReactNode;
    className?: string;
}

/**
 * 縮放進入動畫
 */
export function ScaleIn({ children, className }: ScaleInProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={scaleVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// 滑入動畫
interface SlideInProps {
    children: ReactNode;
    direction?: "left" | "right" | "up" | "down";
    className?: string;
}

const slideDirections = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: -50 },
    down: { x: 0, y: 50 },
};

/**
 * 滑入動畫組件
 */
export function SlideIn({
    children,
    direction = "up",
    className,
}: SlideInProps) {
    const offset = slideDirections[direction];

    return (
        <motion.div
            initial={{ opacity: 0, ...offset }}
            animate={{
                opacity: 1,
                x: 0,
                y: 0,
                transition: { duration: 0.3, ease: "easeOut" },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// 重新匯出 AnimatePresence 供頁面使用
export { AnimatePresence };
