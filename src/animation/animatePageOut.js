import gsap from "gsap"

export const animatePageIn = () => {
    const bannerOne = document.getElementById("banner")

    if (bannerOne) {
        const tl = gsap.timeline()

        tl.set([bannerOne], {
            yPercent: 0,
            ease: "power3.out",
        }).to([bannerOne], {
            yPercent: 100,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
        })
    }
}

export const animatePageOut = (href, router) => {
    const bannerOne = document.getElementById("banner")

    if (bannerOne) {
        const tl = gsap.timeline()

        tl.set([bannerOne], {
            yPercent: -100,
        }).to([bannerOne], {
            yPercent: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
            onComplete: () => {
                router.push(href)
            },
        })
    }
}