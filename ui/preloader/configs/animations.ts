import gsap from "gsap"

export const preloaderDisappear = (onComplete: () => void) => () => {
    gsap.timeline({onComplete})
        .to('.caret-left', {height: '100%', duration: 0.3})
        .to('.caret-right', {height: '100%', duration: 0.3}, '-=0.3')
        .to('.gate-left', {width: '50vw', duration: 0.2})
        .to('.gate-right', {width: '50vw', duration: 0.2}, '-=0.2')
        .to('.background-left', {right: '100%', width: '0px', duration: 0.2}, '-=0.2')
        .to('.background-right', {left: '100%', width: '0px', duration: 0.2}, '-=0.2')
        .to('.caret-left', {width: '50vw', opacity: 0.5, duration: 0.2})
        .to('.caret-right', {width: '50vw', opacity: 0.5, duration: 0.2}, '-=0.2')
        .to('.gate-left', {right: '100%', width: '0px', duration: 0.2}, '-=0.2')
        .to('.gate-right', {left: '100%', width: '0px', duration: 0.2}, '-=0.2')
        .to('.caret-left', {right: '100%', width: '0px', duration: 0.2})
        .to('.caret-right', {left: '100%', width: '0px', duration: 0.2}, '-=0.2')
} 